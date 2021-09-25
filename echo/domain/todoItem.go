package domain

type TodoItem struct {
	Id         int    `db:"id" json:"Id"`
	Name       string `db:"name" json:"Name"`
	Created_at string `db:"created_at" json:"Created_at"`
	Updated_at string `db:"updated_at" json:"Updated_at"`
}
