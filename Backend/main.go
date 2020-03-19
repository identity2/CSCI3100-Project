package main

import (
	"database/sql"
	"flag"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/RitoGamingPLZ/CSCI3100/handlers"
	"github.com/RitoGamingPLZ/CSCI3100/models/postgres"
	_ "github.com/lib/pq"
)

const (
	dbHost     = "localhost"
	dbPort     = 5432
	dbUser     = "postgres"
	dbPassword = "csci3100"
	dbName     = "busApp"
	serverPort = ":3100"
)

type application struct {
	infoLog  *log.Logger
	errorLog *log.Logger
	handler  *handlers.Handler
}

func main() {
	dontCreateMockData := flag.Bool("nomock", false, "When the flag is set, no mock data will be created.")
	flag.Parse()

	// Command line loggers.
	infoLog := log.New(os.Stdout, "INFO\t", log.Ldate|log.Ltime)
	errorLog := log.New(os.Stderr, "ERROR\t", log.Ldate|log.Ltime|log.Lshortfile)

	// PostgreSQL connection.
	psqlInfo := fmt.Sprintf("host=%s port=%d user=%s password=%s dbname=%s sslmode=disable", dbHost, dbPort, dbUser, dbPassword, dbName)
	db, err := sql.Open("postgres", psqlInfo)
	if err != nil {
		errorLog.Fatal(err)
	}
	defer db.Close()

	// Creating the initial database tables.
	err = postgres.SetUpDB(db)
	if err != nil {
		errorLog.Fatal(err)
	}

	// Inserting mock data into the database.
	if !*dontCreateMockData {
		infoLog.Println("Creating mock data...")
		err = postgres.CreateMockData(db)
		if err != nil {
			errorLog.Fatal(err)
		}
	}

	validAPIKeys := make(map[string]struct{})

	// The application structure.
	app := &application{
		infoLog:  infoLog,
		errorLog: errorLog,
		handler:  &handlers.Handler{DB: db, InfoLog: infoLog, ErrorLog: errorLog, ValidAPIKeys: validAPIKeys},
	}

	// The web server.
	srv := &http.Server{
		Addr:     serverPort,
		ErrorLog: errorLog,
		Handler:  app.routes(),
	}

	// Starting the server.
	infoLog.Printf("Starting server on %s", serverPort)
	err = srv.ListenAndServe()
	errorLog.Fatal(err)
}
