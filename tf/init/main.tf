provider "aws" {
  profile    = "nookwill" ## update to your own aws cred profile before running
  region     = "us-west-2"
}

resource "aws_s3_bucket" "backend-bucket" {
    bucket = "nookwill-tf-backend"
    acl    = "private"
}

resource "aws_dynamodb_table" "backend-table" {
    name = "nookwill-tf-backend"
    read_capacity = 5
    write_capacity = 5
    hash_key = "key"

    attribute {
    name = "key"
    type = "S"
  }
}