provider "aws" {
  profile = "nookwill"
  version = "~> 2.0"
  region  = "us-west-2"
}

terraform {
  backend "s3" {
    profile = "nookwill"
    bucket = "nookwill-tf-backend"
    key    = "key"
    region = "us-west-2"
    # dynamodb_table = "nookwill-tf-backend" ## todo: remote locking not working
  }
}

resource "aws_s3_bucket" "website-bucket" {
    bucket = "nookwill-website"
    acl    = "public-read"

    website {
        index_document = "index.html"
        error_document = "error.html"
    }

    cors_rule {
        allowed_headers = ["*"]
        allowed_methods = ["GET", "PUT", "POST"]
        allowed_origins = ["*"]
        expose_headers  = ["ETag"]
        max_age_seconds = 3000
    }
}

resource "aws_s3_bucket" "nookwill-images" {
    bucket = "nookwill-files"
    acl    = "public-read"

    cors_rule {
        allowed_headers = ["*"]
        allowed_methods = ["GET", "POST"]
        allowed_origins = ["http://nookwill-website.s3-website-us-west-2.amazonaws.com"]
        expose_headers  = ["ETag"]
        max_age_seconds = 3000
    }
}

resource "aws_dynamodb_table" "nookwill-user-patterns" {
    name = "nookwill-user-patterns"
    read_capacity = 5
    write_capacity = 5
    hash_key = "patternId"
    range_key = "creatorId"

    attribute {
        name = "patternId"
        type = "S"
    }
    
    attribute {
        name = "creatorId"
        type = "S"
    }
}

resource "aws_api_gateway_rest_api" "nookwill-api" {
  name        = "nookwill-api"
  description = "All the API endpoints for our website woo!"
}