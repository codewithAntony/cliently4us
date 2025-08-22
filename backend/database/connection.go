package database

import (
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

func Connect() {
	_, err := gorm.Open(mysql.Open("antony:Murithi@97@/clientlydb"), &gorm.Config{})

	if err != nil {
		panic("Could not connect to the database")
	}
}
