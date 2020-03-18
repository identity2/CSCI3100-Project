package handlers

import (
	"database/sql"
	"fmt"
	"log"
	"net/http"
	"strconv"

	"github.com/RitoGamingPLZ/CSCI3100/models"
)

// BusHandler handles all bus APIs.
type BusHandler struct {
	DB       *sql.DB
	InfoLog  *log.Logger
	ErrorLog *log.Logger
}

// GetAllBus reponses with all the buses in {routeID}.
// routed from: GET /bus/{routeID}
func (bh *BusHandler) GetAllBus(w http.ResponseWriter, r *http.Request) {
	routeID, err := strconv.Atoi(r.URL.Query().Get(":routeID"))
	if err != nil {
		http.NotFound(w, r)
		return
	}

	body, err := models.GetAllBus(bh.DB, routeID)
	if err != nil {
		bh.ErrorLog.Println(err)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	fmt.Fprintf(w, body)
}

// GetBus responses with the bus {id} in the route {route}.
// routed from: GET /bus/{routeID}/{id}
func (bh *BusHandler) GetBus(w http.ResponseWriter, r *http.Request) {
	routeID, err := strconv.Atoi(r.URL.Query().Get(":routeID"))
	if err != nil {
		http.NotFound(w, r)
		return
	}

	id, err := strconv.Atoi(r.URL.Query().Get(":id"))
	if err != nil {
		http.NotFound(w, r)
		return
	}

	body, err := models.GetBus(bh.DB, routeID, id)
	if err != nil {
		bh.ErrorLog.Println(err)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	fmt.Fprintf(w, body)
}

// CreateBus creates a new bus.
// routed from: POST /bus
func (bh *BusHandler) CreateBus(w http.ResponseWriter, r *http.Request) {

}

// UpdateBus updates the bus in {route} with {id}.
// routed from: PUT /bus/{routeID}/{id}
func (bh *BusHandler) UpdateBus(w http.ResponseWriter, r *http.Request) {
}

// DeleteBus deletes the bus in {route} with {id}.
// routed from: DELETE /bus/{routeID}/{id}
func (bh *BusHandler) DeleteBus(w http.ResponseWriter, r *http.Request) {
}
