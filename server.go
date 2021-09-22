package main

import (
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

type TodoItem struct {
	Id   int    `json:"Id,string"`
	Name string `json:"Name"`
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
	items := []TodoItem{}
	items = append(items, TodoItem{Id: 1, Name: "test1"})
	items = append(items, TodoItem{Id: 2, Name: "test2"})

	return c.JSON(http.StatusOK, items)
}
