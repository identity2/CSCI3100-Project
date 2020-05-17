// Package handlers manages all the handlers of the routes.
package handlers

// This file handles all the requests related to server status.

// Author: 1155053722 Chao Yu
// Version 1: written 4/4/2020

import (
	"fmt"
	"net/http"
)

// Home redirects to the readme page on GitHub.
// routed from: GET /
func Home(w http.ResponseWriter, r *http.Request) {
	http.Redirect(w, r, "https://github.com/RitoGamingPLZ/CSCI3100/blob/master/Backend", http.StatusSeeOther)
}

// Ping responses with "ok".
// routed from: GET /ping
func Ping(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "ok")
}
