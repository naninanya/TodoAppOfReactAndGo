package main

import (
	"net/http"
	"todoApp/echo/handler"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func main() {
	// Echo instance
	e := echo.New()

	// Middleware
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())
	e.Use(middleware.CORS())

	// Routes
	e.GET("/", hello)
	e.GET("/api/todo", handler.GetAllTodoItems())
	e.POST("/api/save/:name", handler.Insert())
	e.DELETE("/api/delete", handler.Delete())

	// Start server
	// If you want to check from iphone or on Docker, you change to :1323.
	e.Logger.Fatal(e.Start(":1323"))
}

// Handler
func hello(c echo.Context) error {
	return c.String(http.StatusOK, "Hello, World!")
}
