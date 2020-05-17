package handlers

// This file handles all the requests related to
// stations which are dispatched by the router.

// Author: 1155053722 Chao Yu
// Version 1: written 4/4/2020

import (
	"net/http"

	"github.com/RitoGamingPLZ/CSCI3100/models"
)

// GetAllStation responses with all the stations.
// routed from: GET /station
func (h *Handler) GetAllStation(w http.ResponseWriter, r *http.Request) {
	h.handleGetAll(w, r, models.GetAllStations)
}

// GetStation responses with the station with {id}.
// routed from: GET /station/{id}
func (h *Handler) GetStation(w http.ResponseWriter, r *http.Request) {
	h.handleGet(w, r, models.GetStation)
}

// CreateStation creates a new station.
// routed from: POST /station
func (h *Handler) CreateStation(w http.ResponseWriter, r *http.Request) {
	h.handlePost(w, r, models.PostStation)
}

// UpdateStation updates the station with {id}.
// routed from: PUT /station/{id}
func (h *Handler) UpdateStation(w http.ResponseWriter, r *http.Request) {
	h.handlePut(w, r, models.PutStation)
}

// DeleteStation deletes the station with {id}.
// routed from: DELETE /station/{id}
func (h *Handler) DeleteStation(w http.ResponseWriter, r *http.Request) {
	h.handleDelete(w, r, models.DeleteStation)
}
