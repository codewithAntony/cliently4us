package main

import (
	"github.com/codewithAntony/cliently4us/database"
	"github.com/codewithAntony/cliently4us/routes"
	"github.com/gofiber/fiber/v2"
)

func main() {
	database.Connect()

	app := fiber.New()

	routes.Setup(app)

	app.Listen(":8000")
}
