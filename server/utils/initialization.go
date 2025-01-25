package utils

import (
	"context"
	"fmt"

	"github.com/minio/minio-go/v7"
	"github.com/minio/minio-go/v7/pkg/credentials"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

func InitMysql(port int, username, password, host, name string) *gorm.DB {
	dsn := fmt.Sprintf("%s:%s@tcp(%s:%d)/%s?charset=utf8mb4&parseTime=True&loc=Local", username, password, host, port, name)
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		fmt.Println("mysql数据库连接失败，失败原因: ", err)
		return nil
	}
	return db
}

func InitMongoDB(port int, host, database string) *mongo.Database {
	uri := fmt.Sprintf("mongodb://%s:%d", host, port)
	client, err := mongo.Connect(context.Background(), options.Client().ApplyURI(uri))
	if err != nil {
		fmt.Println("mongodb数据库连接失败，失败原因: ", err)
		return nil
	}
	err = client.Ping(context.Background(), nil)
	if err != nil {
		fmt.Println("mongodb数据库无法ping通，失败原因: ", err)
		return nil
	}
	return client.Database(database)
}

func InitMinio(useSSL bool, port int, host, accessKey, secretKey string) *minio.Client {
	endpoint := fmt.Sprintf("%s:%d", host, port)
	client, err := minio.New(endpoint, &minio.Options{
		Creds:  credentials.NewStaticV4(accessKey, secretKey, ""),
		Secure: useSSL,
	})
	if err != nil {
		fmt.Println("minio创建失败，失败原因: ", err)
		return nil
	}
	return client
}
