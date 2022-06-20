require('dotenv').config();
const admin = require("firebase-admin");
const fireApp = admin.initializeApp({
	credential: admin.credential.cert({
		"type": process.env.FIREBASE_type,
		"project_id": process.env.FIREBASE_project_id,
		"private_key_id": process.env.FIREBASE_private_key_id,
		"private_key": process.env.FIREBASE_private_key.replace(/\\n/g, '\n'),
		"client_id": process.env.FIREBASE_client_id,
		"auth_uri": process.env.FIREBASE_auth_uri,
		"token_uri": process.env.FIREBASE_token_uri,
		"auth_provider_x509_cert_url": process.env.FIREBASE_auth_provider_x509_cert_url,
		"client_x509_cert_url": process.env.FIREBASE_client_x509_cert_url,
		"client_email": process.env.FIREBASE_client_email,
	})
});
const firestoreAdmin = admin.firestore();

const manhwaRef = firestoreAdmin.collection('manhwa');
const historyRef = firestoreAdmin.collection('history');

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
	const title = request.query.url;
	const email = request.query.email;
	const key = btoa(email);
	await manhwaRef.doc(key).update({
		manhwa: admin.firestore.FieldValue.arrayUnion({
			title: title,
			date: new Date().toLocaleDateString("pt-BR").toString(),
		})
	}).then(() => {
		response.send(JSON.stringify({ message: "Manhwa added successfully", status: 201 }));
	}).catch((e) => {
		response.send(JSON.stringify({ message: "Error adding manhwa", status: 500, error: e }));
	});
}

app.get('/', cors(), remove_manhwa);

async function remove_manhwa(request, response) {
	const title = request.query.url;
	const email = request.query.email;
	const key = btoa(email);
	await manhwaRef.doc(key).update({
		manhwa: admin.firestore.FieldValue.arrayRemove({
			title: title
		})
	}).then(() => {
		response.send(JSON.stringify({ message: "Manhwa removed successfully", status: 201 }));
	}).catch((e) => {
		response.send(JSON.stringify({ message: "Error removing manhwa", status: 500, error: e }));
	});
}
app.get('/add_history', cors(), add_history);

async function add_history(request, response) {
	const title = request.query.url;
	const email = request.query.email;
	const key = btoa(email);
	await historyRef.doc(key).update({
		manhwa: admin.firestore.FieldValue.arrayUnion({
			title: title,
			date: new Date().toLocaleDateString("pt-BR").toString(),
		})
	}).then(() => {
		response.send(JSON.stringify({ message: "Manhwa added successfully", status: 201 }));
	}).catch((e) => {
		response.send(JSON.stringify({ message: "Error adding manhwa", status: 500, error: e }));
	});
}
app.get('/remove_history', cors(), remove_history);

async function remove_history(request, response) {
	const title = request.query.url;
	const email = request.query.email;
	const key = btoa(email);
	await historyRef.doc(key).update({
		manhwa: admin.firestore.FieldValue.arrayRemove({
			title: title
		})
	}).then(() => {
		response.send(JSON.stringify({ message: "Manhwa removed successfully", status: 201 }));
	}).catch((e) => {
		response.send(JSON.stringify({ message: "Error removing manhwa", status: 500, error: e }));
	});
}


app.get('/get_manhwa', cors(), get_manhwa);

async function get_manhwa(request, response) {
	const email = request.query.email;
	const key = btoa(email);
	await manhwaRef.doc(key).get().then((snapshot) => {
		const data = snapshot.map((item) => {
			return item.data();
		});
		response.send(JSON.stringify({ message: "Manhwa listed successfully", status: 200, data: data }));
	}).catch((e) => {
		response.send(JSON.stringify({ message: "Error deleting manhwa", status: 500, error: e }));
	});
}
app.get('/get_history', cors(), get_history);

async function get_history(request, response) {
	const email = request.query.email;
	const key = btoa(email);
	await manhwaRef.doc(key).get().then((snapshot) => {
		const data = snapshot.map((item) => {
			return item.data();
		});
		response.send(JSON.stringify({ message: "Manhwa listed successfully", status: 200, data: data }));
	}).catch((e) => {
		response.send(JSON.stringify({ message: "Error deleting manhwa", status: 500, error: e }));
	});
}

app.listen(process.env.PORT || 3002, () => {
	return "okay";
})
