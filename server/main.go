package main

import (
	"fmt"
	"net/http"

	"github.com/duke-git/lancet/v2/strutil"
	"github.com/gin-gonic/gin"
	"github.com/shanlihang/dream-workshop/global"
	"github.com/shanlihang/dream-workshop/utils"
)

func main() {
	// 读取配置信息
	utils.InitConfig()
	global.Config = &utils.AppConfig

	// 初始化数据库连接
	global.MySQL = utils.InitMysql(global.Config.MySQL.Port, global.Config.MySQL.User, global.Config.MySQL.Password, global.Config.MySQL.Host, global.Config.MySQL.DBName)
	global.MongoDB = utils.InitMongoDB(global.Config.MongoDB.Port, global.Config.MongoDB.Host, global.Config.MongoDB.DBName)

	// 创建一个默认的 Gin 引擎
	r := gin.Default()

	// 定义一个路由处理函数，用于处理根路径的请求
	r.GET("/", func(c *gin.Context) {
		fmt.Println(&utils.AppConfig.MongoDB)
		c.JSON(http.StatusOK, gin.H{
			"config": global.Config,
		})
	})

	// 定义一个路由处理函数，用于处理根路径的请求
	r.GET("/util", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": strutil.Reverse("hello world"),
		})
	})

	err := r.Run(fmt.Sprintf(":%s", global.Config.Server.Port))
	if err != nil {
		fmt.Println("启动服务器失败L:", err)
	}
}
