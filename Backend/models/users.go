package models

// This file serves as the abstraction layer
// between the JSON response and PostgreSQL
// for users.

// Author: 1155053722 Chao Yu
// Version 1: written 4/4/2020

import (
	"database/sql"
	"encoding/json"
	"errors"
	"regexp"
	"strings"
	"time"

	"github.com/lib/pq"
	"golang.org/x/crypto/bcrypt"
)

const (
	userNameMinLen = 6
	userNameMaxLen = 20
	passMinLen     = 6
	passMaxLen     = 20
)

type errorAPI struct {
	ErrorMsg string `json:"error"`
}

type loginAPI struct {
	UserName string `json:"username"`
	Password string `json:"password"`
}

type registerAPI struct {
	loginAPI
	IsAdmin int    `json:"isAdmin"`
	Email   string `json:"email"`
}

type tokenAPI struct {
	APIToken string `json:"apiToken"`
}

// ErrUserNameTooLong is a custom error indicating that the username is too long.
var ErrUserNameTooLong = errors.New("the username is too long")

// ErrUserNameTooShort is a custom error indicating that the username is too short.
var ErrUserNameTooShort = errors.New("the username is too short")

// ErrPassTooLong is a custom error indicating that the password is too long.
var ErrPassTooLong = errors.New("the password is too long")

// ErrPassTooShort is a custom error indicating that the password is too short.
var ErrPassTooShort = errors.New("the password is too short")

// EmailRX is a regexp for email format validation.
var EmailRX = regexp.MustCompile("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$")

// ErrEmailFormat is a custom error indicating that the email format is incorrect.
var ErrEmailFormat = errors.New("the email format is incorrect")

// ErrUsernameUsed is a custom error indicating that the username is already registered.
var ErrUsernameUsed = errors.New("the username is already registered, pick another one")

// ErrEmailUsed is a custom error indicating that the email is already registered.
var ErrEmailUsed = errors.New("the email is already registered, try another one")

// ErrLoginInfo is a custom error indicating that the log in information is incorrect.
var ErrLoginInfo = errors.New("the login information provided is incorrect")

// ErrAPIToken is a custom error indicating that an error occurred when generating the api token.
var ErrAPIToken = errors.New("error generating token")

// ErrTokenInvalid is a custom error indicating that the token provided is invalid.
var ErrTokenInvalid = errors.New("token is invalid")

// ErrorToJSON marshals an error into a JSON formatted string.
func ErrorToJSON(targetErr error) (string, error) {
	ea := errorAPI{ErrorMsg: targetErr.Error()}
	res, err := json.Marshal(ea)
	if err != nil {
		return "", targetErr
	}
	return string(res), targetErr
}

// RegisterUser registers the new user to the database while check for errors.
func RegisterUser(db *sql.DB, jsonBody []byte) (string, error) {
	ra := registerAPI{}
	err := json.Unmarshal(jsonBody, &ra)
	if err != nil {
		return ErrorToJSON(err)
	}

	// Validate username.
	userNameLen := len(ra.UserName)
	if userNameLen > userNameMaxLen {
		return ErrorToJSON(ErrUserNameTooLong)
	} else if userNameLen < userNameMinLen {
		return ErrorToJSON(ErrUserNameTooShort)
	}

	// Validate password.
	passwordLen := len(ra.Password)
	if passwordLen > passMaxLen {
		return ErrorToJSON(ErrPassTooLong)
	} else if passwordLen < passMinLen {
		return ErrorToJSON(ErrPassTooShort)
	}

	// Validate email.
	if !EmailRX.MatchString(ra.Email) {
		return ErrorToJSON(ErrEmailFormat)
	}

	// Hash password.
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(ra.Password), 12)
	if err != nil {
		return ErrorToJSON(err)
	}

	// Store the registered user in the database.
	stmt := `INSERT INTO appUser (isAdmin, username, hashedPassword, email) VALUES($1, $2, $3, $4)`

	_, err = db.Exec(stmt, ra.IsAdmin, ra.UserName, string(hashedPassword), ra.Email)
	if err != nil {
		if err, ok := err.(*pq.Error); ok {
			if strings.Contains(err.Error(), "username_unique") {
				return ErrorToJSON(ErrUsernameUsed)
			} else if strings.Contains(err.Error(), "email_unique") {
				return ErrorToJSON(ErrEmailUsed)
			}
		}
		return ErrorToJSON(err)
	}

	return "", nil
}

// LoginUser logs in the user and returns a JSON api key.
func LoginUser(db *sql.DB, tokenMap map[string]struct{}, jsonBody []byte) (string, error) {
	la := loginAPI{}
	err := json.Unmarshal(jsonBody, &la)
	if err != nil {
		return ErrorToJSON(err)
	}

	var isAdmin int

	stmt := `SELECT hashedPassword, isAdmin FROM appUser WHERE username = $1`
	row := db.QueryRow(stmt, la.UserName)

	var hashedPassword []byte
	err = row.Scan(&hashedPassword, &isAdmin)
	if err != nil {
		return ErrorToJSON(ErrLoginInfo)
	}
	err = bcrypt.CompareHashAndPassword(hashedPassword, []byte(la.Password))
	if err != nil {
		return ErrorToJSON(ErrLoginInfo)
	}

	// Provide an api key hashed from current time if the user is an admin.
	ta := tokenAPI{}
	if isAdmin == 1 {
		apiToken, err := bcrypt.GenerateFromPassword([]byte(time.Now().String()), 12)
		if err != nil {
			return ErrorToJSON(ErrAPIToken)
		}
		token := string(apiToken)
		tokenMap[token] = struct{}{}

		ta.APIToken = token
	} else {
		ta.APIToken = "Only an administrator can obtain an API token."
	}

	res, err := json.Marshal(ta)
	if err != nil {
		return ErrorToJSON(ErrAPIToken)
	}

	return string(res), nil
}

// LogoutUser clears the apitoken of a user.
func LogoutUser(tokenMap map[string]struct{}, jsonBody []byte) (string, error) {
	ta := tokenAPI{}
	err := json.Unmarshal(jsonBody, &ta)
	if err != nil {
		return ErrorToJSON(err)
	}

	if _, ok := tokenMap[ta.APIToken]; ok {
		delete(tokenMap, ta.APIToken)
	}
	return "", nil
}
