package routes

import (
	"github.com/codewithAntony/cliently4us/controllers"
	"github.com/codewithAntony/cliently4us/middleware"
	"github.com/gofiber/fiber/v2"
)

func Setup(app *fiber.App) {
	app.Post("/api/register", controllers.Register)
	app.Post("/api/login", controllers.Login)
	app.Get("/api/user", middleware.AuthMiddleware, controllers.User)
	app.Post("/api/logout", middleware.AuthMiddleware, controllers.Logout)
	app.Get("/api/dashboard", middleware.AuthMiddleware, controllers.GetDashboardSummary)
}
