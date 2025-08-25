package controllers

import (
	"github.com/codewithAntony/cliently4us/database"
	"github.com/codewithAntony/cliently4us/models"
	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v5"
)

func GetDashboardSummary(c *fiber.Ctx) error {
	cookie := c.Cookies("jwt")

	token, err := jwt.ParseWithClaims(cookie, &jwt.RegisteredClaims{}, func(token *jwt.Token) (interface{}, error) {
		return []byte(SecretKey), nil
	})

	if err != nil {
		c.Status(fiber.StatusUnauthorized)
		return c.JSON(fiber.Map{
			"message": "unauthenticated",
		})
	}

	claims := token.Claims.(*jwt.RegisteredClaims)
	userID := claims.Issuer

	var clientsCount int64
	var unpaidInvoicesCount int64
	var openTasksCount int64

	database.DB.Model(&models.Client{}).Where("user_id = ?", userID).Count(&clientsCount)
	database.DB.Model(&models.Invoice{}).Where("user_id = ? AND status = ?", userID, "unpaid").Count(&unpaidInvoicesCount)
	database.DB.Model(&models.Task{}).Where("user_id = ? AND status != ?", userID, "done").Count(&openTasksCount)

	var recentClients []models.Client
	database.DB.Where("user_id = ?", userID).Order("id desc").Limit(3).Find(&recentClients)

	var urgentTasks []models.Task
	database.DB.Where("user_id = ? AND priority = ? AND status != ?", userID, "high", "done").Order("due_date asc").Limit(3).Find(&urgentTasks)

	var unpaidInvoices []models.Invoice
	database.DB.Where("user_id = ? AND status = ?", userID, "unpaid").Order("due_date asc").Limit(5).Find(&unpaidInvoices)

	return c.JSON(fiber.Map{
		"summary": fiber.Map{
			"activeClients":  clientsCount,
			"unpaidInvoices": unpaidInvoicesCount,
			"openTasks":      openTasksCount,
		},
		"recentClients":  recentClients,
		"urgentTasks":    urgentTasks,
		"unpaidInvoices": unpaidInvoices,
	})
}
