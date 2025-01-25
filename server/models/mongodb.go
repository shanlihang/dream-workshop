package models

type MongoBase struct {
	ID        int    `json:"id" bson:"_id"`
	CreatedAt string `json:"created_at" bson:"created_at"`
	UpdatedAt string `json:"updated_at" bson:"updated_at"`
	DeletedAt string `json:"deleted_at" bson:"deleted_at"`
}

type Feedback struct {
	MongoBase
	Content string `json:"content" bson:"content"`
	UserID  int    `json:"user_id" bson:"user_id"`
	Status  int    `json:"status" bson:"status"`
}

type Article struct {
	MongoBase
	Title   string `json:"title" bson:"title"`
	Content string `json:"content" bson:"content"`
}

type Project struct {
	MongoBase
	Title   string `json:"title" bson:"title"`
	Content string `json:"content" bson:"content"`
}
