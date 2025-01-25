package global

import (
	"github.com/minio/minio-go/v7"
	"github.com/shanlihang/dream-workshop/utils"
	"go.mongodb.org/mongo-driver/mongo"
	"gorm.io/gorm"
)

var (
	Config  *utils.Config
	MySQL   *gorm.DB
	MongoDB *mongo.Database
	Minio   *minio.Client
)
