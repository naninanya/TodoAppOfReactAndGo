package handler

import (
	"database/sql"
	"encoding/json"
	"log"
	"net/http"
	"os"

	_ "github.com/lib/pq"

	"github.com/labstack/echo/v4"
	"github.com/pkg/errors"
)

type dbConfig struct {
	DbDriver string `json:"dbDriver"`
	Dsn      string `json:"dsn"`
}

func loadConfig() (*dbConfig, error) {
	f, err := os.Open("./private/DBConfig.json")
	if err != nil {
		log.Fatal("loadConfig os.Open err", err)
		return nil, err
	}
	defer f.Close()

	var cfg dbConfig
	err = json.NewDecoder(f).Decode(&cfg)
	return &cfg, err
}

var (
	Client *sql.DB
)

func init() {
	config, err := loadConfig()
	if err != nil {
		log.Fatal("Cannot exectute loadConfig.", err)
	}

	Client, err = sql.Open(config.DbDriver, config.Dsn)
	if err != nil {
		panic(err)
	}

	if err = Client.Ping(); err != nil {
		panic(err)
	}
	// defer db.Close()
}

type TodoItem struct {
	Id         int    `db:"id" json:"Id"`
	Name       string `db:"name" json:"Name"`
	Created_at string `db:"created_at" json:"Created_at"`
	Updated_at string `db:"updated_at" json:"Updated_at"`
}

func GetAllTodoItems() echo.HandlerFunc {
	return func(c echo.Context) error {

		item := TodoItem{}
		items := []*TodoItem{}

		rows, err := Client.Query("SELECT id, name, created_at, updated_at FROM todoitem")

		if err != nil {
			return errors.Wrapf(err, "Cannot execute sql.")
		}
		defer rows.Close()

		for rows.Next() {
			if err := rows.Scan(
				&item.Id,
				&item.Name,
				&item.Created_at,
				&item.Updated_at); err != nil {
				return errors.Wrapf(err, "Cannot scan to item.")
			}

			items = append(items, &TodoItem{
				Id:         item.Id,
				Name:       item.Name,
				Created_at: item.Created_at,
				Updated_at: item.Created_at,
			})
		}

		return c.JSON(http.StatusOK, items)
	}
}
