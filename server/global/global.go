package global

import (
	"github.com/shanlihang/dream-workshop/utils"
	"go.mongodb.org/mongo-driver/mongo"
	"gorm.io/gorm"
)

var (
	Config  *utils.Config
	MySQL   *gorm.DB
	MongoDB *mongo.Database
)
