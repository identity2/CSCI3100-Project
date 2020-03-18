package main

import (
	"net/http"

	"github.com/RitoGamingPLZ/CSCI3100/handlers"

	"github.com/bmizerany/pat"  // 3rd Party Router Package.
	"github.com/justinas/alice" // 3rd Party Middleware Chainer.
)

func (app *application) routes() http.Handler {
	middleware := alice.New(app.logRequest)

	mux := pat.New()
	mux.Get("/", middleware.ThenFunc(handlers.Home))
	mux.Get("/ping", middleware.ThenFunc(handlers.Ping))

	// Authentication
	mux.Post("/register", middleware.ThenFunc(app.uh.Register))
	mux.Post("/login", middleware.ThenFunc(app.uh.Login))

	// Bus Route
	mux.Get("/route", middleware.ThenFunc(app.rh.GetAllRoute))
	mux.Get("/route/:id", middleware.ThenFunc(app.rh.GetRoute))
	mux.Post("/route", middleware.Append(app.loginRequired).ThenFunc(app.rh.CreateRoute))
	mux.Put("/route/:id", middleware.Append(app.loginRequired).ThenFunc(app.rh.UpdateRoute))
	mux.Del("/route/:id", middleware.Append(app.loginRequired).ThenFunc(app.rh.DeleteRoute))

	// Bus
	mux.Get("/bus/:routeID", middleware.ThenFunc(app.bh.GetAllBus))
	mux.Get("/bus/:routeID/:id", middleware.ThenFunc(app.bh.GetBus))
	mux.Post("/bus", middleware.Append(app.loginRequired).ThenFunc(app.bh.CreateBus))
	mux.Put("/bus/:routeID/:id", middleware.Append(app.loginRequired).ThenFunc(app.bh.UpdateBus))
	mux.Del("/bus/:routeID/:id", middleware.Append(app.loginRequired).ThenFunc(app.bh.DeleteBus))

	// Station
	mux.Get("/station", middleware.ThenFunc(app.sh.GetAllStation))
	mux.Get("/station/:id", middleware.ThenFunc(app.sh.GetStation))
	mux.Post("/station", middleware.Append(app.loginRequired).ThenFunc(app.sh.CreateStation))
	mux.Put("/station/:id", middleware.Append(app.loginRequired).ThenFunc(app.sh.UpdateStation))
	mux.Del("/station/:id", middleware.Append(app.loginRequired).ThenFunc(app.sh.DeleteStation))

	return mux
}
