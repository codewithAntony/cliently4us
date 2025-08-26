package middleware

import (
	"strings"

	"github.com/codewithAntony/cliently4us/utils"
	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v5"
)

const SecretKey = "secret"

func AuthMiddleware(c *fiber.Ctx) error {
	cookie := c.Cookies("jwt")

	if cookie == "" {
		authHeader := c.Get("Authorization")
		if authHeader == "" {
			return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
				"message": "unauthorized",
			})
		}

		parts := strings.Split(authHeader, " ")
		if len(parts) != 2 || parts[0] != "Bearer" {
			return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
				"message": "Invalid unauthorization header",
			})
		}
		cookie = parts[1]
	}
	if utils.IsTokenBlacklisted(cookie) {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"message": "Token revoked",
		})
	}

	token, err := jwt.ParseWithClaims(cookie, &jwt.RegisteredClaims{}, func(token *jwt.Token) (interface{}, error) {
		return []byte(SecretKey), nil
	})

	if err != nil || !token.Valid {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"message": "Unauthorized",
		})
	}
	return c.Next()
}
