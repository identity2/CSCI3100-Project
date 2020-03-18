package models

type errorAPI struct {
	ErrorMsg string `json:"error"`
}

type loginAPI struct {
	UserName string `json:"username"`
	Password string `json:"password"`
}

type registerAPI struct {
	loginAPI
	IsAdmin int    `json:"isAdmin"`
	Email   string `json:"email"`
}

type tokenAPI struct {
	APIToken string `json:"apiToken"`
}