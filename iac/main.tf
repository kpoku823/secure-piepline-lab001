provider "aws" {
  region = "eu-west-2"
}

resource "aws_s3_bucket" "my-insecure-bucket-demolab-8877" {
  bucket = "my-insecure-bucket-demolab-8877"
}

resource "aws_s3_bucket_public_access_block" "my-insecure-bucket-demolab-8877" {
  bucket = "my-insecure-bucket-demolab-8877"
  block_public_acls = true
}