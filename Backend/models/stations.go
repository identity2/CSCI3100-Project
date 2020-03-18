package models

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
	stationGetAPI
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
