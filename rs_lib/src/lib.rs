use std::time::Duration;

use rusty_s3::{Bucket, Credentials, S3Action};
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub struct Client {
  bucket: Bucket,
  credentials: Credentials,
  host_rewrite: Option<String>,
}

#[wasm_bindgen]
impl Client {
  pub fn new(
    url: String,
    bucket_name: String,
    region: String,
    public_key: String,
    private_key: String,
    host_rewrite: Option<String>,
  ) -> Self {
    let bucket = Bucket::new(
      url.parse().unwrap(),
      rusty_s3::UrlStyle::VirtualHost,
      bucket_name,
      region,
    )
    .unwrap();
    let credentials = Credentials::new(public_key, private_key);
    Self {
      bucket,
      credentials,
      host_rewrite,
    }
  }

  pub fn sign_upload(&self, object: String) -> String {
    let op = self.bucket.put_object(Some(&self.credentials), &object);
    let mut u = op.sign(Duration::from_secs(60));
    if let Some(host) = &self.host_rewrite {
      u.set_host(Some(host)).unwrap();
    }
    u.to_string()
  }

  pub fn sign_read(&self, object: String) -> String {
    let op = self.bucket.get_object(Some(&self.credentials), &object);
    let mut u = op.sign(Duration::from_secs(60));
    if let Some(host) = &self.host_rewrite {
      u.set_host(Some(host)).unwrap();
    }
    u.to_string()
  }
}
