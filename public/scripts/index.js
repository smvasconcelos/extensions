const getUser = async () => {

	return await chrome.storage.sync.get('email').then((res) => {
		return res.email;
	});

}

const getManhwaHistory = async () => {
	const email = await getUser();
	return await $.get(`https://manhwa-tracker.herokuapp.com/get_history?&email=${email}`).then((res) => {
		return JSON.parse(res);
	}).catch(err => {
		return err;
	});
}
const getManhwaHistorySaved = async () => {
	const email = await getUser();
	return await $.get(`https://manhwa-tracker.herokuapp.com/get_manhwa?&email=${email}`).then((res) => {
		return JSON.parse(res);
	}).catch(err => {
		return err;
	});
}

const removeManhwaSaved = async (title) => {
	const email = await getUser();
	return await $.get(`https://manhwa-tracker.herokuapp.com/remove_manhwa?&email=${email}&url=${title}`).then((res) => {
		return JSON.parse(res);
	}).catch(err => {
		return err;
	});
}
const removeManhwaHistory = async (title) => {
	const email = await getUser();
	return await $.get(`https://manhwa-tracker.herokuapp.com/remove_history?&email=${email}&url=${title}`).then((res) => {
		return JSON.parse(res);
	}).catch(err => {
		return err;
	});
}

$(document).ready(async function () {

	const manhwa = await getManhwaHistorySaved().then((res) => {
		res = res.data.manhwa;
		if (res.length > 0) {
			res.map((item) => {
				$("#manhwa tbody").append(`
					<tr>
						<td>${item.date}</td>
						<td>${item.title}</td>
						<td class="remove-saved" data="${item}"><i class="bi bi-calendar-x-fill"></i></td>
					</tr>
				`).hide().fadeIn(100);

				$("#card-list").append(`
					<div class="card m-2" style="width: 15rem;">
						<img src=${item.url || "https://i.imgur.com/i71IPKv.jpg"} class="card-img-top" alt="..."> </img>
						<div class="card-body">
							<h5 class="card-title"> <a target="_blank" href="${item.title}" >${item.name || "Title Not Found 404"}</a></h5>
						</div>
						<ul class="list-group list-group-flush">
							<li class="list-group-item">
								<button type="button" class="btn btn-warning">${item.chapter || 0}</button>
							</li>
						</ul>
						<div class="card-body">
								<button data="${item}" type="button" class="btn btn-success"><i class="bi bi-plus-circle"></i></button>
								<button data="${item}" type="button" class="btn btn-danger"><i class="bi bi-shield-fill-x"></i></button>
						</div>
					</div>
				`)

			});
		} else {
			$("#manhwa tbody").append(`
				<tr>
					<td>None</td>
					<td>None</td>
					<td><i class="bi bi-calendar-x-fill"></i></td>
				</tr>
			`);
		}
	});

	await getManhwaHistory().then(res => {
		res = res.data.manhwa;
		if (res.length > 0) {
			res.map((item) => {
				$("#history tbody").append(`
					<tr>
						<td>${item.date}</td>
						<td>${item.title}</td>
						<td class="remove-saved" data="${item}"><i class="bi bi-calendar-x-fill"></i></td>
					</tr>
				`).hide().fadeIn(100);
			});
		} else {
			$("#history tbody").append(`
				<tr>
					<td>None</td>
					<td>None</td>
					<td><i class="bi bi-calendar-x-fill"></i></td>
				</tr>
			`);
		}
	});

});
