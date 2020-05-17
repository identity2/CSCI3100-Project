package handlers

// This file provides a generic procedure of
// how each HTTP methods are handled.

// Author: 1155053722 Chao Yu
// Version 1: written 4/4/2020

import (
	"database/sql"
	"errors"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"strconv"

	"github.com/RitoGamingPLZ/CSCI3100/models"
)

// Handler handles all the APIs.
type Handler struct {
	DB           *sql.DB
	InfoLog      *log.Logger
	ErrorLog     *log.Logger
	ValidAPIKeys map[string]struct{}
}

func (h *Handler) handleGetAll(w http.ResponseWriter, r *http.Request, method models.GetAllMethod) {
	body, err := method(h.DB)
	if err != nil {
		http.NotFound(w, r)
		return
	}

	w.Header().Set("content-Type", "application/json")
	fmt.Fprintf(w, body)
}

func (h *Handler) handleGet(w http.ResponseWriter, r *http.Request, method models.GetMethod) {
	id, err := strconv.Atoi(r.URL.Query().Get(":id"))
	if err != nil {
		http.NotFound(w, r)
		return
	}

	body, err := method(h.DB, id)
	if err != nil {
		http.NotFound(w, r)
		return
	}

	w.Header().Set("content-Type", "application/json")
	fmt.Fprintf(w, body)
}

func (h *Handler) handlePost(w http.ResponseWriter, r *http.Request, method models.PostMethod) {
	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		h.ErrorLog.Println(err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	resp, err := method(h.DB, h.ValidAPIKeys, body)
	if err != nil {
		if errors.Is(err, models.ErrTokenInvalid) {
			w.WriteHeader(http.StatusUnauthorized)
		} else {
			w.WriteHeader(http.StatusBadRequest)
		}
		fmt.Fprintf(w, resp)
		return
	}

	w.WriteHeader(http.StatusCreated)
	fmt.Fprintf(w, resp)
}

func (h *Handler) handlePut(w http.ResponseWriter, r *http.Request, method models.PutMethod) {
	id, err := strconv.Atoi(r.URL.Query().Get(":id"))
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		h.ErrorLog.Println(err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	resp, err := method(h.DB, h.ValidAPIKeys, id, body)
	if err != nil {
		if errors.Is(err, models.ErrTokenInvalid) {
			w.WriteHeader(http.StatusUnauthorized)
		} else {
			w.WriteHeader(http.StatusBadRequest)
		}

		fmt.Fprintf(w, resp)
		return
	}

	w.WriteHeader(http.StatusOK)
}

func (h *Handler) handleDelete(w http.ResponseWriter, r *http.Request, method models.DeleteMethod) {
	id, err := strconv.Atoi(r.URL.Query().Get(":id"))
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		h.ErrorLog.Println(err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	resp, err := method(h.DB, h.ValidAPIKeys, id, body)
	if err != nil {
		if errors.Is(err, models.ErrTokenInvalid) {
			w.WriteHeader(http.StatusUnauthorized)
		} else {
			w.WriteHeader(http.StatusBadRequest)
		}

		fmt.Fprintf(w, resp)
		return
	}

	w.WriteHeader(http.StatusOK)
}
