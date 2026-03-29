provider "aws" {
  region = "eu-west-2"
}


resource "aws_s3_bucket" "my-insecure-bucket-demolab-8877" {
  bucket = "my-insecure-bucket-demolab-8877"
}