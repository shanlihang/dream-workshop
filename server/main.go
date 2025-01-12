package main

import (
	"fmt"
	"net/http"

	"github.com/duke-git/lancet/v2/strutil"
	"github.com/gin-gonic/gin"
)

func main() {
	// 创建一个默认的 Gin 引擎
	r := gin.Default()

	// 定义一个路由处理函数，用于处理根路径的请求
	r.GET("/", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "欢迎来到 Gin 框架的世界！",
		})
	})

	// 定义一个路由处理函数，用于处理根路径的请求
	r.GET("/util", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": strutil.Reverse("hello world"),
		})
	})

	// 在端口 8080 上启动服务器
	err := r.Run(":8080")
	if err != nil {
		fmt.Println("启动服务器失败:", err)
	}
}
