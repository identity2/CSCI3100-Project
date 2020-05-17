package models

// This file serves as the abstraction layer
// between the JSON response and PostgreSQL
// for bus routes.

// Author: 1155053722 Chao Yu
// Version 1: written 4/4/2020

import (
	"database/sql"
	"encoding/json"
)

type busInRouteAPI struct {
	BusID     int     `json:"busID"`
	Latitude  float64 `json:"latitude"`
	Longitude float64 `json:"longitude"`
}

type stationInRouteAPI struct {
	OrderInRoute int     `json:"orderInRoute"`
	StationID    int     `json:"stationID"`
	StationName  string  `json:"stationName"`
	Latitude     float64 `json:"latitude"`
	Longitude    float64 `json:"longitude"`
}

type routeGetAPI struct {
	RouteName string              `json:"routeName"`
	Buses     []busInRouteAPI     `json:"buses"`
	Stations  []stationInRouteAPI `json:"stations"`
}

type routePostAPI struct {
	tokenAPI
	RouteName  string `json:"routeName"`
	StationIDs []int  `json:"stationIDs"`
}

type routePostRespAPI struct {
	RouteID int `json:"routeID"`
}

// GetAllRoute returns all the bus routes in JSON formatted string.
func GetAllRoute(db *sql.DB) (string, error) {
	type routeAPI struct {
		routeGetAPI
		RouteID int `json:"routeID"`
	}

	target := struct {
		Routes []routeAPI `json:"routes"`
	}{}

	stmt := `SELECT routeID, routeName FROM busRoute ORDER BY routeID ASC`
	rRows, err := db.Query(stmt)
	if err != nil {
		return "", err
	}
	for rRows.Next() {
		ra := routeAPI{}
		err = rRows.Scan(&ra.RouteID, &ra.RouteName)
		if err != nil {
			return "", err
		}

		// Select all the buses in the route.
		stmt = `SELECT busID, latitude, longitude FROM bus WHERE routeID = $1 ORDER BY busID ASC`
		bRows, err := db.Query(stmt, ra.RouteID)
		if err != nil {
			return "", err
		}
		for bRows.Next() {
			ba := busInRouteAPI{}
			err = bRows.Scan(&ba.BusID, &ba.Latitude, &ba.Longitude)
			if err != nil {
				return "", err
			}
			ra.Buses = append(ra.Buses, ba)
		}

		// Select all the stations in the route.
		stmt = `SELECT stationID, orderInRoute FROM stationInRoute WHERE routeID = $1 ORDER BY orderInRoute ASC`
		sRows, err := db.Query(stmt, ra.RouteID)
		if err != nil {
			return "", err
		}
		for sRows.Next() {
			sa := stationInRouteAPI{}
			err = sRows.Scan(&sa.StationID, &sa.OrderInRoute)
			if err != nil {
				return "", err
			}

			stmt = `SELECT stationName, latitude, longitude FROM station WHERE stationID = $1`
			row := db.QueryRow(stmt, sa.StationID)
			err = row.Scan(&sa.StationName, &sa.Latitude, &sa.Longitude)
			ra.Stations = append(ra.Stations, sa)
		}

		target.Routes = append(target.Routes, ra)
	}

	res, err := json.Marshal(target)

	return string(res), err
}

// GetRoute returns the route with id in JSON formatted string.
func GetRoute(db *sql.DB, id int) (string, error) {
	stmt := `SELECT routeName FROM busRoute WHERE routeID = $1`
	row := db.QueryRow(stmt, id)
	ra := routeGetAPI{}
	err := row.Scan(&ra.RouteName)
	if err != nil {
		return "", err
	}

	// Select all the buses in the route.
	stmt = `SELECT busID, latitude, longitude FROM bus WHERE routeID = $1 ORDER BY busID ASC`
	bRows, err := db.Query(stmt, id)
	if err != nil {
		return "", err
	}
	for bRows.Next() {
		ba := busInRouteAPI{}
		err = bRows.Scan(&ba.BusID, &ba.Latitude, &ba.Longitude)
		if err != nil {
			return "", err
		}
		ra.Buses = append(ra.Buses, ba)
	}

	// Select all the stations in the route.
	stmt = `SELECT stationID, orderInRoute FROM stationInRoute WHERE routeID = $1 ORDER BY orderInRoute ASC`
	sRows, err := db.Query(stmt, id)
	if err != nil {
		return "", err
	}
	for sRows.Next() {
		sa := stationInRouteAPI{}
		err = sRows.Scan(&sa.StationID, &sa.OrderInRoute)
		if err != nil {
			return "", err
		}

		stmt = `SELECT stationName, latitude, longitude FROM station WHERE stationID = $1`
		row := db.QueryRow(stmt, sa.StationID)
		err = row.Scan(&sa.StationName, &sa.Latitude, &sa.Longitude)
		ra.Stations = append(ra.Stations, sa)
	}

	res, err := json.Marshal(ra)

	return string(res), err
}

// PostRoute creates a new route into the database.
func PostRoute(db *sql.DB, tokenMap map[string]struct{}, jsonBody []byte) (string, error) {
	ra := routePostAPI{}
	err := json.Unmarshal(jsonBody, &ra)
	if err != nil {
		return ErrorToJSON(err)
	}

	if _, ok := tokenMap[ra.APIToken]; !ok {
		return ErrorToJSON(ErrTokenInvalid)
	}

	tx, err := db.Begin()
	if err != nil {
		return ErrorToJSON(err)
	}
	s := `INSERT INTO busRoute (routeName) VALUES ($1) RETURNING routeID`
	stmt, err := tx.Prepare(s)
	if err != nil {
		return ErrorToJSON(err)
	}
	defer stmt.Close()

	r := routePostRespAPI{}
	err = stmt.QueryRow(ra.RouteName).Scan(&r.RouteID)
	if err != nil {
		tx.Rollback()
		return ErrorToJSON(err)
	}

	for i, val := range ra.StationIDs {
		ss := `INSERT INTO stationInRoute (stationID, routeID, orderInRoute) VALUES ($1, $2, $3)`
		_, err := tx.Exec(ss, val, r.RouteID, i+1)
		if err != nil {
			tx.Rollback()
			return ErrorToJSON(err)
		}
	}

	err = tx.Commit()
	if err != nil {
		return ErrorToJSON(err)
	}

	resp, err := json.Marshal(r)
	if err != nil {
		return ErrorToJSON(err)
	}

	return string(resp), nil
}

// PutRoute updates an existing route in the database with id.
func PutRoute(db *sql.DB, tokenMap map[string]struct{}, id int, jsonBody []byte) (string, error) {
	ra := routePostAPI{}
	err := json.Unmarshal(jsonBody, &ra)
	if err != nil {
		return ErrorToJSON(err)
	}

	if _, ok := tokenMap[ra.APIToken]; !ok {
		return ErrorToJSON(ErrTokenInvalid)
	}

	tx, err := db.Begin()
	if err != nil {
		return ErrorToJSON(err)
	}

	stmt := `UPDATE busRoute SET routeName = $1 WHERE routeID = $2`
	_, err = tx.Exec(stmt, ra.RouteName, id)
	if err != nil {
		tx.Rollback()
		return ErrorToJSON(err)
	}

	stmt = `DELETE FROM stationInRoute WHERE routeID = $1`
	_, err = tx.Exec(stmt, id)
	if err != nil {
		tx.Rollback()
		return ErrorToJSON(err)
	}

	for i, val := range ra.StationIDs {
		ss := `INSERT INTO stationInRoute (stationID, routeID, orderInRoute) VALUES ($1, $2, $3)`
		_, err := tx.Exec(ss, val, id, i+1)
		if err != nil {
			tx.Rollback()
			return ErrorToJSON(err)
		}
	}

	err = tx.Commit()
	if err != nil {
		return ErrorToJSON(err)
	}

	return "", nil
}

// DeleteRoute deletes an existing route in the database with id.
func DeleteRoute(db *sql.DB, tokenMap map[string]struct{}, id int, jsonBody []byte) (string, error) {
	ta := tokenAPI{}
	err := json.Unmarshal(jsonBody, &ta)
	if err != nil {
		return ErrorToJSON(err)
	}

	if _, ok := tokenMap[ta.APIToken]; !ok {
		return ErrorToJSON(ErrTokenInvalid)
	}

	stmt := `DELETE FROM stationInRoute WHERE routeID = $1`
	_, err = db.Exec(stmt, id)
	if err != nil {
		return ErrorToJSON(err)
	}

	stmt = `DELETE FROM busRoute WHERE routeID = $1`
	_, err = db.Exec(stmt, id)
	if err != nil {
		return ErrorToJSON(err)
	}

	return "", nil
}
