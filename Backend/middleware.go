package main

// This file contains some middleware
// to modify the HTTP response.

// Author: 1155053722 Chao Yu
// Version 1: written 4/4/2020

import "net/http"

func (app *application) logRequest(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		app.infoLog.Printf("%s - %s %s %s", r.RemoteAddr, r.Proto, r.Method, r.URL.RequestURI())

		next.ServeHTTP(w, r)
	})
}

func allowCrossOrigin(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Add("access-control-allow-origin", "*")
		w.Header().Add("access-control-allow-methods", "POST, GET, OPTIONS, PUT, DELETE")
		w.Header().Add("access-control-allow-headers", "*")
		w.Header().Add("access-control-expose-headers", "*")
		next.ServeHTTP(w, r)
	})
}
