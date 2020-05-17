package models

// This file serves as the abstraction layer
// between the JSON response and PostgreSQL
// for stations.

// Author: 1155053722 Chao Yu
// Version 1: written 4/4/2020

import (
	"database/sql"
	"encoding/json"
)

type stationGetAPI struct {
	StationName string  `json:"stationName"`
	Latitude    float64 `json:"latitude"`
	Longitude   float64 `json:"longitude"`
	RouteIDs    []int   `json:"routeIDs"`
}

type stationPostAPI struct {
	tokenAPI
	StationName string  `json:"stationName"`
	Latitude    float64 `json:"latitude"`
	Longitude   float64 `json:"longitude"`
}

type stationPostRespAPI struct {
	StationID int `json:"stationID"`
}

// GetAllStations return all the stations in JSON formatted string.
func GetAllStations(db *sql.DB) (string, error) {
	type stationAPI struct {
		stationGetAPI
		StationID int `json:"stationID"`
	}

	target := struct {
		Stations []stationAPI `json:"stations"`
	}{}

	// Select all the stations.
	stmt := `SELECT stationID, stationName, latitude, longitude FROM station ORDER BY stationID ASC`
	sRows, err := db.Query(stmt)
	if err != nil {
		return "", err
	}

	for sRows.Next() {
		sa := stationAPI{}
		err = sRows.Scan(&sa.StationID, &sa.StationName, &sa.Latitude, &sa.Longitude)
		if err != nil {
			return "", err
		}

		// Select all the routes related to the station.
		stmt = `SELECT routeID FROM stationInRoute WHERE stationID = $1`
		rRows, err := db.Query(stmt, sa.StationID)
		if err != nil {
			return "", err
		}
		for rRows.Next() {
			var rid int
			err = rRows.Scan(&rid)
			if err != nil {
				return "", err
			}
			sa.RouteIDs = append(sa.RouteIDs, rid)
		}

		target.Stations = append(target.Stations, sa)
	}

	res, err := json.Marshal(target)

	return string(res), nil
}

// GetStation returns the station with id in JSON formatted string.
func GetStation(db *sql.DB, id int) (string, error) {
	stmt := `SELECT stationName, latitude, longitude FROM station WHERE stationID = $1`
	row := db.QueryRow(stmt, id)
	sa := stationGetAPI{}
	err := row.Scan(&sa.StationName, &sa.Latitude, &sa.Longitude)
	if err != nil {
		return "", err
	}

	// Select all the routes related to the station.
	stmt = `SELECT routeID FROM stationInRoute WHERE stationID = $1`
	rRows, err := db.Query(stmt, id)
	if err != nil {
		return "", err
	}
	for rRows.Next() {
		var rid int
		err = rRows.Scan(&rid)
		if err != nil {
			return "", err
		}
		sa.RouteIDs = append(sa.RouteIDs, rid)
	}

	res, err := json.Marshal(sa)
	return string(res), err
}

// PostStation creates a new station into the database.
func PostStation(db *sql.DB, tokenMap map[string]struct{}, jsonBody []byte) (string, error) {
	sa := stationPostAPI{}
	err := json.Unmarshal(jsonBody, &sa)
	if err != nil {
		return ErrorToJSON(err)
	}

	if _, ok := tokenMap[sa.APIToken]; !ok {
		return ErrorToJSON(ErrTokenInvalid)
	}

	s := `INSERT INTO station (stationName, latitude, longitude) VALUES ($1, $2, $3) RETURNING stationID`
	stmt, err := db.Prepare(s)
	if err != nil {
		return ErrorToJSON(err)
	}
	defer stmt.Close()

	r := stationPostRespAPI{}
	err = stmt.QueryRow(sa.StationName, sa.Latitude, sa.Longitude).Scan(&r.StationID)
	if err != nil {
		return ErrorToJSON(err)
	}

	resp, err := json.Marshal(r)
	if err != nil {
		return ErrorToJSON(err)
	}

	return string(resp), nil
}

// PutStation updates an existing station with the station id.
func PutStation(db *sql.DB, tokenMap map[string]struct{}, id int, jsonBody []byte) (string, error) {
	sa := stationPostAPI{}
	err := json.Unmarshal(jsonBody, &sa)
	if err != nil {
		return ErrorToJSON(err)
	}

	if _, ok := tokenMap[sa.APIToken]; !ok {
		return ErrorToJSON(ErrTokenInvalid)
	}

	stmt := `UPDATE station SET stationName = $1, latitude = $2, longitude = $3 WHERE stationID = $4`
	_, err = db.Exec(stmt, sa.StationName, sa.Latitude, sa.Longitude, id)
	if err != nil {
		return ErrorToJSON(err)
	}

	return "", nil
}

// DeleteStation deletes an existing station with the station id.
func DeleteStation(db *sql.DB, tokenMap map[string]struct{}, id int, jsonBody []byte) (string, error) {
	ta := tokenAPI{}
	err := json.Unmarshal(jsonBody, &ta)
	if err != nil {
		return ErrorToJSON(err)
	}

	if _, ok := tokenMap[ta.APIToken]; !ok {
		return ErrorToJSON(ErrTokenInvalid)
	}

	stmt := `DELETE FROM station WHERE stationID = $1`
	_, err = db.Exec(stmt, id)
	if err != nil {
		return ErrorToJSON(err)
	}

	return "", nil
}
