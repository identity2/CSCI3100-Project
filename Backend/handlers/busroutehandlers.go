package handlers

// This file handles all the requests related to
// bus routes which are dispatched by the router.

// Author: 1155053722 Chao Yu
// Version 1: written 4/4/2020

import (
	"net/http"

	"github.com/RitoGamingPLZ/CSCI3100/models"
)

// GetAllRoute responses with all the bus routes.
// routed from: Get /route
func (h *Handler) GetAllRoute(w http.ResponseWriter, r *http.Request) {
	h.handleGetAll(w, r, models.GetAllRoute)
}

// GetRoute responses with the bus route with {id}.
// routed from: Get /route/{id}
func (h *Handler) GetRoute(w http.ResponseWriter, r *http.Request) {
	h.handleGet(w, r, models.GetRoute)
}

// CreateRoute creates a new route.
// routed from: POST /route
func (h *Handler) CreateRoute(w http.ResponseWriter, r *http.Request) {
	h.handlePost(w, r, models.PostRoute)
}

// UpdateRoute updates the route with {id}.
// routed from: PUT /route/{id}
func (h *Handler) UpdateRoute(w http.ResponseWriter, r *http.Request) {
	h.handlePut(w, r, models.PutRoute)
}

// DeleteRoute deletes the route with {id}.
// routed from: DELETE /route/{id}
func (h *Handler) DeleteRoute(w http.ResponseWriter, r *http.Request) {
	h.handleDelete(w, r, models.DeleteRoute)
}
