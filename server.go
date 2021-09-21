package main

import (
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

type Todo struct {
	Id   int    `json:"id,string"`
	Name string `json:"name"`
}

func main() {
	// Echo instance
	e := echo.New()

	// Middleware
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())
	e.Use(middleware.CORS())

	// Routes
	e.GET("/", hello)
	e.GET("/test", test)

	// Start server
	e.Logger.Fatal(e.Start(":1323"))
}

// Handler
func hello(c echo.Context) error {
	return c.String(http.StatusOK, "Hello, World!")
}

func test(c echo.Context) error {
	t := Todo{
		Id:   1,
		Name: "testTodo",
	}

	return c.JSON(http.StatusOK, t)
}
