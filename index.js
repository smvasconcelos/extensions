require('dotenv').config();
// const admin = require("firebase-admin");
// const fireApp = admin.initializeApp({
// 	credential: admin.credential.cert({
// 		"type": process.env.FIREBASE_type,
// 		"project_id": process.env.FIREBASE_project_id,
// 		"private_key_id": process.env.FIREBASE_private_key_id,
// 		"private_key": process.env.FIREBASE_private_key,
// 		"client_id": process.env.FIREBASE_client_id,
// 		"auth_uri": process.env.FIREBASE_auth_uri,
// 		"token_uri": process.env.FIREBASE_token_uri,
// 		"auth_provider_x509_cert_url": process.env.FIREBASE_auth_provider_x509_cert_url,
// 		"client_x509_cert_url": process.env.FIREBASE_client_x509_cert_url,
// 		"client_email": process.env.FIREBASE_client_email,
// 	})
// });
// const firestore = admin.firestore(fireApp);

// const manhwaRef = firestore.collection('manhwa');
// const historyRef = firestore.collection('history');

const express = require('express');
const app = express();
const cors = require('cors');

app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", '*');
	res.header("Access-Control-Allow-Credentials", true);
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
	res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
	next();
});

app.use(express.json())
app.use(cors({ origin: "*" }))

app.get('/add_manhwa', cors(), add_manhwa);

async function add_manhwa(request, response) {
	const data = request.data;
	console.log({ data });
	return "add manhwa"
}

app.get('/remove_manhwa', cors(), remove_manhwa);

async function remove_manhwa(request, response) {
	return "remove manhwa"
}
app.get('/add_history', cors(), add_history);

async function add_history(request, response) {
	return "add history"
}
app.get('/remove_history', cors(), remove_history);

async function remove_history(request, response) {
	return "remove_history"
}

app.listen(process.env.PORT || 3002, () => {
	return "okay";
})
