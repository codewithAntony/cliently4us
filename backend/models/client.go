package models

type Client struct {
	Id     uint   `json:"id" gorm:"primaryKey"`
	Name   string `json:"name"`
	Email  string `json:"email"`
	UserId uint   `json:"user_id"`
}
