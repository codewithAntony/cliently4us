package models

type Invoice struct {
	ID     uint    `json:"id" gorm:"primaryKey"`
	Amount float64 `json:"amount"`
	Status string  `json:"status"`
	UserId uint    `json:"user_id"`
}
