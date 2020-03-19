package main

import (
	"net/http"

	"github.com/RitoGamingPLZ/CSCI3100/handlers"

	"github.com/bmizerany/pat" // 3rd Party Router Package.
)

func (app *application) routes() http.Handler {

	mux := pat.New()
	mux.Get("/", http.HandlerFunc(handlers.Home))
	mux.Get("/ping", http.HandlerFunc(handlers.Ping))

	// Authentication
	mux.Post("/register", http.HandlerFunc(app.handler.Register))
	mux.Post("/login", http.HandlerFunc(app.handler.Login))

	// Bus Route
	mux.Get("/route", http.HandlerFunc(app.handler.GetAllRoute))
	mux.Get("/route/:id", http.HandlerFunc(app.handler.GetRoute))
	mux.Post("/route", http.HandlerFunc(app.handler.CreateRoute))
	mux.Put("/route/:id", http.HandlerFunc(app.handler.UpdateRoute))
	mux.Del("/route/:id", http.HandlerFunc(app.handler.DeleteRoute))

	// Bus
	mux.Get("/bus", http.HandlerFunc(app.handler.GetAllBus))
	mux.Get("/bus/:id", http.HandlerFunc(app.handler.GetBus))
	mux.Post("/bus", http.HandlerFunc(app.handler.CreateBus))
	mux.Put("/bus/:id", http.HandlerFunc(app.handler.UpdateBus))
	mux.Del("/bus/:id", http.HandlerFunc(app.handler.DeleteBus))

	// Station
	mux.Get("/station", http.HandlerFunc(app.handler.GetAllStation))
	mux.Get("/station/:id", http.HandlerFunc(app.handler.GetStation))
	mux.Post("/station", http.HandlerFunc(app.handler.CreateStation))
	mux.Put("/station/:id", http.HandlerFunc(app.handler.UpdateStation))
	mux.Del("/station/:id", http.HandlerFunc(app.handler.DeleteStation))

	return app.logRequest(mux)
}
