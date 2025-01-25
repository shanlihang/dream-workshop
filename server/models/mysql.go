package models

import "gorm.io/gorm"

type User struct {
	gorm.Model
	Username string `json:"username" gorm:"column:username"`
	Password string `json:"password" gorm:"column:password"`
	Email    string `json:"email" gorm:"column:email"`
	Phone    string `json:"phone" gorm:"column:phone"`
}

type Role struct {
	gorm.Model
	Name string `json:"name" gorm:"column:name"`
}

type Permission struct {
	gorm.Model
	Name     string       `json:"name" gorm:"column:name"`
	Children []Permission `json:"children" gorm:"column:children"`
}

type Logger struct {
	gorm.Model
	Type    string `json:"type" gorm:"column:type"`
	Content string `json:"content" gorm:"column:content"`
}
