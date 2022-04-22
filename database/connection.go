package database

import (
	"github.com/arnab333/golang-react-jwt/models"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var DB *gorm.DB

func Connect() {
	conn, err := gorm.Open(mysql.Open("root:mysql@/golang_react_jwt"), &gorm.Config{})

	if err != nil {
		panic("could not connect to the database")
	}

	DB = conn

	conn.AutoMigrate(&models.User{})
}
