package handlers

import (
	"fmt"
	"io/ioutil"
	"net/http"

	"github.com/RitoGamingPLZ/CSCI3100/models"
)

// Register registers a user.
// routed from: POST /register
func (h *Handler) Register(w http.ResponseWriter, r *http.Request) {
	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		h.ErrorLog.Println(err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	resp, err := models.RegisterUser(h.DB, body)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		fmt.Fprintf(w, resp)
		return
	}

	// Success
	w.WriteHeader(http.StatusCreated)
}

// Login logs in a user.
// routed from: POST /login
func (h *Handler) Login(w http.ResponseWriter, r *http.Request) {
	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		h.ErrorLog.Println(err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	resp, err := models.LoginUser(h.DB, h.ValidAPIKeys, body)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		fmt.Fprintf(w, resp)
		return
	}

	fmt.Fprintf(w, resp)
}

// Logout logs out a user.
// routed from: POST /logout
func (h *Handler) Logout(w http.ResponseWriter, r *http.Request) {
	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		h.ErrorLog.Println(err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	resp, err := models.LogoutUser(h.ValidAPIKeys, body)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		fmt.Fprintf(w, resp)
		return
	}
}
