package main

import (
	"net/http"
	"todoApp/handler"

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
	e.GET("/api", handler.GetAllTodoItems())

	// Start server
	// If you want to check from iphone, you change to :1323.
	e.Logger.Fatal(e.Start("localhost:1323"))
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
