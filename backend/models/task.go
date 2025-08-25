package models

type Task struct {
	ID     uint   `json:"id" gorm:"primaryKey"`
	Title  string `json:"title"`
	Status string `json:"status"`
	UserId uint   `json:"user_id"`
}
