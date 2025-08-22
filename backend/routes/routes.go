package routes

import (
	"github.com/codewithAntony/cliently4us/controllers"
	"github.com/gofiber/fiber/v2"
)

func Setup(app *fiber.App) {
	app.Post("/api/register", controllers.Register)
}
