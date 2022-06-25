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

app.get('/check_and_create_user', cors(), check_and_create_user);

async function check_and_create_user(request, response) {
	const email = request.query.email;
	const key = btoa(email);

	try {

		const userExists = await manhwaRef.doc(key).get();

		if (!userExists.data()) {
			await manhwaRef.doc(key).set({
				manhwa: [
					{
						title: "",
						date: "",
						chapter: "",
						name: "",
						img: "",
						card: false,
					}
				]
			}).then(() => {
				response.send(JSON.stringify({ message: "Manhwa added successfully", status: 201 }));
			}).catch((e) => {
				response.send(JSON.stringify({ message: "Error adding manhwa", status: 500, error: e }));
			});
			await historyRef.doc(key).set({
				manhwa: []
			}).then(() => {
				response.send(JSON.stringify({ message: "Manhwa added successfully", status: 201 }));
			}).catch((e) => {
				response.send(JSON.stringify({ message: "Error adding manhwa", status: 500, error: e }));
			});
		} else {
			response.send(JSON.stringify({ message: "User already exists", status: 200 }));
		}

	} catch (err) {
		response.send(JSON.stringify({ message: "User already exists", status: 200, error: err }));
	}


}

app.post('/add_manhwa', cors(), add_manhwa);

const obj_match = (fields, new_obj, old_obj) => {

	var match = false;

	fields.map(field => {

		if (new_obj[field] == old_obj[field])
			match = true;
		else
			match = false;

	});

	return match ? { data: new_obj, match: match } : { data: old_obj, match: match };

}

async function check_manhwa_data(obj, email) {

	const fields = [
		"card",
		"img",
		"name",
	];

	const key = btoa(email);
	var new_data;
	var match = false;

	await manhwaRef.doc(key).get().then(res => {
		const data = res.data().manhwa;
		new_data = data.map(item => {

			if (match)
				return item

			const new_item = obj_match(fields, obj, item);

			if (new_item.match)
				match = true;

			return new_item.data;
		});
	}).catch(e => {
		console.log(e);
	});

	if (!match)
		new_data.push(obj);
	return new_data;

}

async function add_manhwa(request, response) {
	try {
		const title = request.body.url || "";
		const chapter = request.body.chapter || "";
		const name = request.body.name || "";
		const email = request.body.email || "";
		const img = request.body.img || "";
		const card = request.body.card || "";
		const key = btoa(email);

		const data = {
			title: title,
			date: new Date().toLocaleDateString("pt-BR").toString(),
			chapter: chapter || "",
			name: name || "",
			img: img || "",
			card: card || false,
		};

		const new_data = await check_manhwa_data(data, email);
		// console.log({ new_data, data });

		await manhwaRef.doc(key).update({
			manhwa: new_data
		}).then(() => {
			response.send(JSON.stringify({ message: "Manhwa added successfully", status: 201 }));
		}).catch((e) => {
			response.send(JSON.stringify({ message: "Error adding manhwa", status: 500, error: e }));
		});

	} catch (e) {
		response.send(JSON.stringify({ message: "Error adding manhwa", status: 500, error: e }));
	}
}

app.post('/remove_manhwa', cors(), remove_manhwa);

async function remove_manhwa(request, response) {
	const data = request.body.data || "";
	const email = request.body.email || "";
	const key = btoa(email);
	await manhwaRef.doc(key).update({
		manhwa: admin.firestore.FieldValue.arrayRemove({
			...data
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
app.post('/remove_history', cors(), remove_history);

async function remove_history(request, response) {
	const data = request.body.data;
	const email = request.body.email;
	const key = btoa(email);
	await historyRef.doc(key).update({
		manhwa: admin.firestore.FieldValue.arrayRemove({
			...data
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
	await manhwaRef.doc(key).get().then((manhwa) => {
		var data = manhwa.data();
		data.id = manhwa.id;
		response.send(JSON.stringify({ message: "Manhwa listed successfully", status: 200, data: data }));
	}).catch((e) => {
		response.send(JSON.stringify({ message: "Error deleting manhwa", status: 500, error: e }));
	});
}

app.get('/get_history', cors(), get_history);

async function get_history(request, response) {
	const email = request.query.email;
	const key = btoa(email);
	await historyRef.doc(key).get().then((history) => {
		var data = history.data();
		data.id = history.id;
		response.send(JSON.stringify({ message: "Manhwa listed successfully", status: 200, data: history.data() }));
	}).catch((e) => {
		response.send(JSON.stringify({ message: "Error deleting manhwa", status: 500, error: e }));
	});
}

app.listen(process.env.PORT || 3002, () => {
	return "okay";
})
