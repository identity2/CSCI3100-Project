package handlers

import (
	"database/sql"
	"fmt"
	"log"
	"net/http"
	"strconv"

	"github.com/RitoGamingPLZ/CSCI3100/models"
)

// RouteHandler handles all route APIs.
type RouteHandler struct {
	DB       *sql.DB
	InfoLog  *log.Logger
	ErrorLog *log.Logger
}

// GetAllRoute responses with all the bus routes.
// routed from: Get /route
func (rh *RouteHandler) GetAllRoute(w http.ResponseWriter, r *http.Request) {
	body, err := models.GetAllRoute(rh.DB)
	if err != nil {
		rh.ErrorLog.Println(err)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	fmt.Fprintf(w, body)
}

// GetRoute responses with the bus route with {id}.
// routed from: Get /route/{id}
func (rh *RouteHandler) GetRoute(w http.ResponseWriter, r *http.Request) {
	id, err := strconv.Atoi(r.URL.Query().Get(":id"))
	if err != nil {
		http.NotFound(w, r)
		return
	}

	body, err := models.GetRoute(rh.DB, id)
	if err != nil {
		rh.ErrorLog.Println(err)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	fmt.Fprintf(w, body)
}

// CreateRoute creates a new route.
// routed from: POST /route
func (rh *RouteHandler) CreateRoute(w http.ResponseWriter, r *http.Request) {

}

// UpdateRoute updates the route with {id}.
// routed from: PUT /route/{id}
func (rh *RouteHandler) UpdateRoute(w http.ResponseWriter, r *http.Request) {

}

// DeleteRoute deletes the route with {id}.
// routed from: DELETE /route/{id}
func (rh *RouteHandler) DeleteRoute(w http.ResponseWriter, r *http.Request) {

}
