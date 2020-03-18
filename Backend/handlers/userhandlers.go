package handlers

import (
	"database/sql"
	"log"
	"net/http"
)

// UserHandler handles all the authentication APIs.
type UserHandler struct {
	DB       *sql.DB
	InfoLog  *log.Logger
	ErrorLog *log.Logger
}

// Register registers a user.
// routed from: POST /register
func (uh *UserHandler) Register(w http.ResponseWriter, r *http.Request) {

}

// Login logs in a user.
// routed from: POST /login
func (uh *UserHandler) Login(w http.ResponseWriter, r *http.Request) {

}
