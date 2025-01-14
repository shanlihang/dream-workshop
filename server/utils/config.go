package utils

import (
	"log"

	"github.com/spf13/viper"
)

type Config struct {
	Server  ServerConfig `mapstructure:"server"`
	MySQL   MySQLConfig  `mapstructure:"mysql"`
	MongoDB MongoConfig  `mapstructure:"mongodb"`
	Redis   RedisConfig  `mapstructure:"redis"`
}

type ServerConfig struct {
	Port string `mapstructure:"port"`
}

type MySQLConfig struct {
	Host     string `mapstructure:"host"`
	User     string `mapstructure:"user"`
	Password string `mapstructure:"password"`
	DBName   string `mapstructure:"name"`
	Port     int    `mapstructure:"port"`
}

type MongoConfig struct {
	URI    string `mapstructure:"uri"`
	DBName string `mapstructure:"name"`
}

type RedisConfig struct {
	Host     string `mapstructure:"host"`
	Port     int    `mapstructure:"port"`
	Password string `mapstructure:"password"`
	DB       int    `mapstructure:"db"`
}

var AppConfig Config

func InitConfig() {
	viper.AddConfigPath(".")
	viper.SetConfigName("config") // config.yaml
	viper.SetConfigType("yaml")
	if err := viper.ReadInConfig(); err != nil {
		log.Fatalf("Error reading config file, %s", err)
	}

	err := viper.Unmarshal(&AppConfig)
	if err != nil {
		log.Fatalf("Unable to decode into struct, %v", err)
	}
}
