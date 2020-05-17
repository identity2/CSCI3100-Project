package handlers

// This file handles all the requests related to
// bus which are dispatched by the router.

// Author: 1155053722 Chao Yu
// Version 1: written 4/4/2020

import (
	"net/http"

	"github.com/RitoGamingPLZ/CSCI3100/models"
)

// GetAllBus reponses with all the buses.
// routed from: GET /bus
func (h *Handler) GetAllBus(w http.ResponseWriter, r *http.Request) {
	h.handleGetAll(w, r, models.GetAllBus)
}

// GetBus responses with the bus {id} in the route {route}.
// routed from: GET /bus/{id}
func (h *Handler) GetBus(w http.ResponseWriter, r *http.Request) {
	h.handleGet(w, r, models.GetBus)
}

// CreateBus creates a new bus.
// routed from: POST /bus
func (h *Handler) CreateBus(w http.ResponseWriter, r *http.Request) {
	h.handlePost(w, r, models.PostBus)
}

// UpdateBus updates the bus with {id}.
// routed from: PUT /bus/{id}
func (h *Handler) UpdateBus(w http.ResponseWriter, r *http.Request) {
	h.handlePut(w, r, models.PutBus)
}

// DeleteBus deletes the bus in {route} with {id}.
// routed from: DELETE /bus/{routeID}/{id}
func (h *Handler) DeleteBus(w http.ResponseWriter, r *http.Request) {
	h.handleDelete(w, r, models.DeleteBus)
}
