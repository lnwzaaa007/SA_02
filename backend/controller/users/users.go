package users

import (
	"fmt"
	"net/http"
	"time"
	"log"
	"example.com/sa-example/config"
	"example.com/sa-example/entity"
	"github.com/gin-gonic/gin"
)

func GetAll(c *gin.Context) {
	var users []entity.Users
	db := config.DB()
	fmt.Println()
	
	results := db.Preload("Gender").Find(&users)
	if results.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
		return
	}
	c.JSON(http.StatusOK, users)
}

func GetLatest(c *gin.Context) {
	var users []entity.Users
	db := config.DB()

	// เวลาช่วงเริ่มต้นและสิ้นสุดของ "วันนี้"
	now := time.Now()
	start := time.Date(now.Year(), now.Month(), now.Day(), 0, 0, 0, 0, now.Location())
	end := start.Add(24 * time.Hour)

	log.Println("Start:", start)
	log.Println("End:", end)

	result := db.
		Preload("Gender").
		Where("last_login BETWEEN ? AND ?", start, end).
		Find(&users)

	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
		return
	}

	c.JSON(http.StatusOK, users)
}

func GetCountUser(c *gin.Context) {
	var users []entity.Users
	db := config.DB()

	result := db.
	Preload("Gender").Find(&users)

	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
		return
	}
	count:= len(users)
	log.Println("count",count)
	c.JSON(http.StatusOK, count)
}


func Get(c *gin.Context) {
	ID := c.Param("id")
	var user entity.Users

	db := config.DB()

	results := db.Preload("Gender").First(&user, ID)

	if results.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
		return
	}

	if user.ID == 0 {
		c.JSON(http.StatusNoContent, gin.H{})
		return
	}
	c.JSON(http.StatusOK, user)
}

func Update(c *gin.Context) {
	var user entity.Users
	UserID := c.Param("id")

	db := config.DB()

	result := db.First(&user, UserID)

	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "id not found"})
		return
	}

	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request, unable to map payload"})
		return
	}

	result = db.Save(&user)

	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Updated successful"})
}

func Delete(c *gin.Context) {
	id := c.Param("id")

	db := config.DB()

	if tx := db.Exec("DELETE FROM users WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "id not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Deleted successful"})

}
