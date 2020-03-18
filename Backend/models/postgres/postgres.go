// Package postgres manages the CRUD actions through the PostgreSQL database.
package postgres

import (
	"database/sql"
	"io/ioutil"
)

const (
	createSQLFilePath   = "./models/postgres/createtables.sql"
	mockDataSQLFilePath = "./models/postgres/mockdata.sql"
)

// SetUpDB sets up the tables needed for the project.
func SetUpDB(db *sql.DB) error {
	// Read the SQL statements from the file.
	content, err := ioutil.ReadFile(createSQLFilePath)
	if err != nil {
		return err
	}

	// Execute the statements.
	stmt := string(content)
	_, err = db.Exec(stmt)
	if err != nil {
		return err
	}

	return nil
}

// CreateMockData creates mock data from the mockdata.sql file.
func CreateMockData(db *sql.DB) error {
	// Read the SQL statements from the file.
	content, err := ioutil.ReadFile(mockDataSQLFilePath)
	if err != nil {
		return err
	}

	// Execute the statements.
	stmt := string(content)
	_, err = db.Exec(stmt)
	if err != nil {
		return err
	}

	return nil
}
