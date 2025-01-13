package main

import (
	"fmt"
	"net/http"

	"github.com/duke-git/lancet/v2/strutil"
	"github.com/gin-gonic/gin"
	"github.com/shanlihang/dream-workshop/utils"
)

func main() {
	// 读取配置信息
	utils.InitConfig()

	// 创建一个默认的 Gin 引擎
	r := gin.Default()

	// 定义一个路由处理函数，用于处理根路径的请求
	r.GET("/", func(c *gin.Context) {
		fmt.Println(&utils.AppConfig.MongoDB)
		c.JSON(http.StatusOK, gin.H{
			"config": utils.AppConfig,
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
