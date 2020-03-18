package models

import (
	"database/sql"
	"encoding/json"
)

type busGetAPI struct {
	Latitude  float64 `json:"latitude"`
	Longitude float64 `json:"longitude"`
}

type busPostAPI struct {
	busGetAPI
	tokenAPI
	RouteID string `json:"routeID"`
}

type busPostRespAPI struct {
	BusID int `json:"busID"`
}

type busPutAPI struct {
	busGetAPI
	tokenAPI
}

// GetAllBus return all the buses in routeID JSON formatted string.
func GetAllBus(db *sql.DB, routeID int) (string, error) {
	type busAPI struct {
		busGetAPI
		BusID int `json:"busID"`
	}

	target := struct {
		Buses []busAPI `json:"buses"`
	}{}

	stmt := `SELECT busID, latitude, longitude FROM bus WHERE routeID = $1 ORDER BY busID ASC`
	rows, err := db.Query(stmt, routeID)
	if err != nil {
		return "", err
	}
	for rows.Next() {
		ba := busAPI{}
		err = rows.Scan(&ba.BusID, &ba.Latitude, &ba.Longitude)
		if err != nil {
			return "", err
		}

		target.Buses = append(target.Buses, ba)
	}

	res, err := json.Marshal(target)

	return string(res), err
}

// GetBus return the bus in routeID with id in JSON formatted string.
func GetBus(db *sql.DB, routeID int, id int) (string, error) {
	stmt := `SELECT latitude, longitude FROM bus WHERE routeID = $1 AND busID = $2`
	row := db.QueryRow(stmt, routeID, id)
	ba := busGetAPI{}
	err := row.Scan(&ba.Latitude, &ba.Longitude)
	if err != nil {
		return "", err
	}
	res, err := json.Marshal(ba)
	return string(res), err
}
