// Package handlers manages all the handlers of the routes.
package handlers

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
