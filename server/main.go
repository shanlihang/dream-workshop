package main

import (
	"log"

	"github.com/gin-gonic/gin"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

// User 定义用户模型
type User struct {
	gorm.Model
	Name  string
	Email string
}

func main() {
	// 连接数据库
	dsn := "root:67490009@tcp(127.0.0.1:3306)/dream_workshop?charset=utf8mb4&parseTime=True&loc=Local"
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatalf("failed to connect database: %v", err)
	}

	// 自动迁移用户模型
	db.AutoMigrate(&User{})

	// 创建Gin引擎
	r := gin.Default()

	// 定义路由
	r.GET("/users", func(c *gin.Context) {
		var users []User
		db.Find(&users)
		c.JSON(200, users)
	})

	// 启动服务器
	r.Run(":8080")
}
