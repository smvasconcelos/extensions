// Global test setup
process.env.FIREBASE_type = 'service_account';
process.env.FIREBASE_project_id = 'test-project';
process.env.FIREBASE_private_key_id = 'test-key-id';
process.env.FIREBASE_private_key = '-----BEGIN PRIVATE KEY-----\ntest\n-----END PRIVATE KEY-----\n';
process.env.FIREBASE_client_id = 'test-client-id';
process.env.FIREBASE_auth_uri = 'https://accounts.google.com/o/oauth2/auth';
process.env.FIREBASE_token_uri = 'https://oauth2.googleapis.com/token';
process.env.FIREBASE_auth_provider_x509_cert_url = 'https://www.googleapis.com/oauth2/v1/certs';
process.env.FIREBASE_client_x509_cert_url = 'https://www.googleapis.com/robot/v1/metadata/x509/test';
process.env.FIREBASE_client_email = 'test@test.iam.gserviceaccount.com';
