package models

// This file serves as the abstraction layer
// between the JSON response and PostgreSQL
// for bus.

// Author: 1155053722 Chao Yu
// Version 1: written 4/4/2020

import (
	"database/sql"
	"encoding/json"
)

type busGetAPI struct {
	RouteID   int     `json:"routeID"`
	Latitude  float64 `json:"latitude"`
	Longitude float64 `json:"longitude"`
}

type busPostAPI struct {
	busGetAPI
	tokenAPI
}

type busPostRespAPI struct {
	BusID int `json:"busID"`
}

// GetAllBus return all the buses in JSON formatted string.
func GetAllBus(db *sql.DB) (string, error) {
	type busAPI struct {
		busGetAPI
		BusID int `json:"busID"`
	}

	target := struct {
		Buses []busAPI `json:"buses"`
	}{}

	stmt := `SELECT busID, routeID, latitude, longitude FROM bus ORDER BY busID ASC`
	rows, err := db.Query(stmt)
	if err != nil {
		return "", err
	}
	for rows.Next() {
		ba := busAPI{}
		err = rows.Scan(&ba.BusID, &ba.RouteID, &ba.Latitude, &ba.Longitude)
		if err != nil {
			return "", err
		}

		target.Buses = append(target.Buses, ba)
	}

	res, err := json.Marshal(target)

	return string(res), err
}

// GetBus return the bus with id in JSON formatted string.
func GetBus(db *sql.DB, id int) (string, error) {
	stmt := `SELECT routeID, latitude, longitude FROM bus WHERE busID = $1`
	row := db.QueryRow(stmt, id)
	ba := busGetAPI{}
	err := row.Scan(&ba.RouteID, &ba.Latitude, &ba.Longitude)
	if err != nil {
		return "", err
	}
	res, err := json.Marshal(ba)
	return string(res), err
}

// PostBus creates a new bus into the database.
func PostBus(db *sql.DB, tokenMap map[string]struct{}, jsonBody []byte) (string, error) {
	ba := busPostAPI{}
	err := json.Unmarshal(jsonBody, &ba)
	if err != nil {
		return ErrorToJSON(err)
	}

	if _, ok := tokenMap[ba.APIToken]; !ok {
		return ErrorToJSON(ErrTokenInvalid)
	}

	s := `INSERT INTO bus (routeID, latitude, longitude) VALUES ($1, $2, $3) RETURNING busID`
	stmt, err := db.Prepare(s)
	if err != nil {
		return ErrorToJSON(err)
	}
	defer stmt.Close()

	r := busPostRespAPI{}
	err = stmt.QueryRow(ba.RouteID, ba.Latitude, ba.Longitude).Scan(&r.BusID)
	if err != nil {
		return ErrorToJSON(err)
	}

	resp, err := json.Marshal(r)
	if err != nil {
		return ErrorToJSON(err)
	}

	return string(resp), nil
}

// PutBus updates a single record with the bus id.
func PutBus(db *sql.DB, tokenMap map[string]struct{}, id int, jsonBody []byte) (string, error) {
	ba := busPostAPI{}
	err := json.Unmarshal(jsonBody, &ba)
	if err != nil {
		return ErrorToJSON(err)
	}

	if _, ok := tokenMap[ba.APIToken]; !ok {
		return ErrorToJSON(ErrTokenInvalid)
	}

	stmt := `UPDATE bus SET routeID = $1, latitude = $2, longitude = $3 WHERE busID = $4`
	_, err = db.Exec(stmt, ba.RouteID, ba.Latitude, ba.Longitude, id)
	if err != nil {
		return ErrorToJSON(err)
	}

	return "", nil
}

// DeleteBus deletes a record in the database with bus id.
func DeleteBus(db *sql.DB, tokenMap map[string]struct{}, id int, jsonBody []byte) (string, error) {
	ta := tokenAPI{}
	err := json.Unmarshal(jsonBody, &ta)
	if err != nil {
		return ErrorToJSON(err)
	}

	if _, ok := tokenMap[ta.APIToken]; !ok {
		return ErrorToJSON(ErrTokenInvalid)
	}

	stmt := `DELETE FROM bus WHERE busID = $1`
	_, err = db.Exec(stmt, id)
	if err != nil {
		return ErrorToJSON(err)
	}

	return "", nil
}
