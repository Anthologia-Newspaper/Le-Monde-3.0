package core

import (
	utils "github.com/Le-Monde-3-0/utils/sources"
	"github.com/gin-gonic/gin"
	"go.uber.org/zap"
	"net/http"
)

type RegisterInput struct {
	Email    string `json:"email" binding:"required"`
	Username string `json:"username" binding:"required"`
	Password string `json:"password" binding:"required"`
}

type LoginInput struct {
	Email    string `json:"email" binding:"required"`
	Password string `json:"password" binding:"required"`
}

// @BasePath /api/v1

// Register godoc
// @Schemes
// @Description Create a user
// @Tags authentication
// @Accept json
// @Produce json
// @Param RegisterInput body RegisterInput true "Params to create an account"
// @Success 200 {object} RegisterResponse
// @Failure      400  {object}  req.HTTPError
// @Failure      500  {object}  req.HTTPError
// @Router /register [post]
func Register(c *gin.Context, logger *zap.Logger) {

	var registerParams RegisterInput

	if err := c.ShouldBindJSON(&registerParams); err != nil {
		logger.Error(err.Error())
		utils.NewError(c, http.StatusBadRequest, err)
		return
	}
	responseBody, statusCode, err := utils.MakeHTTPRequest(c, http.MethodPost, "http://admin-lemonde3-0:8081/register", registerParams)
	if err != nil {
		logger.Error(err.Error())
		utils.NewError(c, statusCode, err)
		return
	}
	c.Data(statusCode, "application/json", responseBody)
}

// Login godoc
// @Schemes
// @Description Get an authentication token
// @Tags authentication
// @Accept json
// @Produce json
// @Param LoginInput body LoginInput true "Params to login to account"
// @Success 200 {object} LoginResponse
// @Failure      400  {object}  req.HTTPError
// @Failure      500  {object}  req.HTTPError
// @Router /login [post]
func Login(c *gin.Context, logger *zap.Logger) {
	var loginParams LoginInput

	if err := c.ShouldBindJSON(&loginParams); err != nil {
		logger.Error("Invalid request body")
		c.String(http.StatusBadRequest, "Invalid request body")
		return
	}
	responseBody, statusCode, err := utils.MakeHTTPRequest(c, http.MethodPost, "http://admin-lemonde3-0:8081/login", loginParams)
	if err != nil {
		logger.Error(err.Error())
		c.String(statusCode, "Error making the request")
		return
	}
	c.Data(statusCode, "application/json", responseBody)
}

type LoginResponse struct {
	Token string `json:"token" example:"XXXXXXXXXXXXXXXXXXXX"`
}

type RegisterResponse struct {
	Created string `json:"created" example:"User created successfully"`
}
