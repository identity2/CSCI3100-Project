package handlers

import (
	"database/sql"
	"fmt"
	"log"
	"net/http"
	"strconv"

	"github.com/RitoGamingPLZ/CSCI3100/models"
)

// StationHandler handles all station APIs.
type StationHandler struct {
	DB       *sql.DB
	InfoLog  *log.Logger
	ErrorLog *log.Logger
}

// GetAllStation responses with all the stations.
// routed from: GET /station
func (sh *StationHandler) GetAllStation(w http.ResponseWriter, r *http.Request) {
	body, err := models.GetAllStations(sh.DB)
	if err != nil {
		sh.ErrorLog.Println(err)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	fmt.Fprintf(w, body)
}

// GetStation responses with the station with {id}.
// routed from: GET /station/{id}
func (sh *StationHandler) GetStation(w http.ResponseWriter, r *http.Request) {
	id, err := strconv.Atoi(r.URL.Query().Get(":id"))
	if err != nil {
		http.NotFound(w, r)
		return
	}

	body, err := models.GetStation(sh.DB, id)
	if err != nil {
		sh.ErrorLog.Println(err)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	fmt.Fprintf(w, body)
}

// CreateStation creates a new station.
// routed from: POST /station
func (sh *StationHandler) CreateStation(w http.ResponseWriter, r *http.Request) {

}

// UpdateStation updates the station with {id}.
// routed from: PUT /station/{id}
func (sh *StationHandler) UpdateStation(w http.ResponseWriter, r *http.Request) {

}

// DeleteStation deletes the station with {id}.
// routed from: DELETE /station/{id}
func (sh *StationHandler) DeleteStation(w http.ResponseWriter, r *http.Request) {

}
