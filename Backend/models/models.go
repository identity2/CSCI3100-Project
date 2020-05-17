package models

// This file defines the protocols of the
// functions for HTTP request methods.

// Author: 1155053722 Chao Yu
// Version 1: written 4/4/2020

import "database/sql"

// GetAllMethod is the function signature for get all.
type GetAllMethod func(*sql.DB) (string, error)

// GetMethod is the function signature for get.
type GetMethod func(*sql.DB, int) (string, error)

// PostMethod is the function signature for post.
type PostMethod func(*sql.DB, map[string]struct{}, []byte) (string, error)

// PutMethod is the function signature for put.
type PutMethod func(*sql.DB, map[string]struct{}, int, []byte) (string, error)

// DeleteMethod is the function signature for delet.
type DeleteMethod func(*sql.DB, map[string]struct{}, int, []byte) (string, error)
