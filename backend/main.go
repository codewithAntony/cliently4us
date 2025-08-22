package main

import (
	"github.com/codewithAntony/cliently4us/database"
	"github.com/codewithAntony/cliently4us/routes"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

func main() {
	database.Connect()

	app := fiber.New()

	app.Use(cors.New(cors.Config{
		AllowOrigins:     "http://localhost:5173",
		AllowCredentials: true,
	}))

	routes.Setup(app)

	app.Listen(":8000")
}
