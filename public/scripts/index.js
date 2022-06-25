var manhwa;
var history;

const getUser = async () => {

	return await chrome.storage.sync.get('email').then((res) => {
		return res.email;
	});

}

const getManhwaHistory = async () => {
	const email = await getUser();
	if (!email)
		return;
	return await $.get(`https://manhwa-tracker.herokuapp.com/get_history?&email=${email}`).then((res) => {
		return JSON.parse(res);
	}).catch(err => {
		return err;
	});
}
const getManhwaHistorySaved = async () => {
	const email = await getUser();
	if (!email)
		return;
	return await $.get(`https://manhwa-tracker.herokuapp.com/get_manhwa?&email=${email}`).then((res) => {
		return JSON.parse(res);
	}).catch(err => {
		return err;
	});
}

const removeManhwaSaved = async (data) => {
	const email = await getUser();
	if (!email)
		return;
	return await $.ajax({
		url: `https://manhwa-tracker.herokuapp.com/remove_manhwa`,
		type: "POST",
		contentType: 'application/json',
		crossDomain: true,
		data: JSON.stringify({
			email: email,
			data: data
		}),
		dataType: 'json',
		processData: false,
		type: 'POST',
	}).then((res) => {
		console.log(res);
		return res;
	}).catch(err => {
		console.log(err);
		return err;
	});
}
const removeManhwaHistory = async (data) => {
	const email = await getUser();
	if (!email)
		return;
	return await $.ajax({
		url: `https://manhwa-tracker.herokuapp.com/remove_history`,
		type: "POST",
		contentType: 'application/json',
		crossDomain: true,
		data: JSON.stringify({
			email: email,
			data: data
		}),
		dataType: 'json',
		processData: false,
		type: 'POST',
	}).then((res) => {
		console.log(res);
		return res;
	}).catch(err => {
		console.log(err);
		return err;
	});
}

const similarity = (s1, s2) => {
	var longer = s1;
	var shorter = s2;
	if (s1.length < s2.length) {
		longer = s2;
		shorter = s1;
	}
	var longerLength = longer.length;
	if (longerLength == 0) {
		return 1.0;
	}
	return (longerLength - distance(longer, shorter)) / parseFloat(longerLength);
}

const distance = (s1, s2) => {
	s1 = s1.toLowerCase();
	s2 = s2.toLowerCase();

	var costs = new Array();
	for (var i = 0; i <= s1.length; i++) {
		var lastValue = i;
		for (var j = 0; j <= s2.length; j++) {
			if (i == 0)
				costs[j] = j;
			else {
				if (j > 0) {
					var newValue = costs[j - 1];
					if (s1.charAt(i - 1) != s2.charAt(j - 1))
						newValue = Math.min(Math.min(newValue, lastValue),
							costs[j]) + 1;
					costs[j - 1] = lastValue;
					lastValue = newValue;
				}
			}
		}
		if (i > 0)
			costs[s2.length] = lastValue;
	}
	return costs[s2.length];
}

$(document).ready(async function () {

	manhwa = await getManhwaHistorySaved().then((res) => {
		if (!res)
			return
		res = res.data.manhwa;
		if (res.length > 0) {
			res.map((item) => {
				console.log({ item });
				$("#manhwa tbody").append(`
					<tr style="cursor:pointer;">
						<td class="open-manhwa">${item.date}</td>
						<td class="title" style="display: none;">${item.title}</td>
						<td class="open-manhwa">${item.name || item.title}</td>
						<td class="remove-saved" data-manhwa="${btoa(unescape(JSON.stringify(item)))}"><i class="bi bi-calendar-x-fill"></i></td>
					</tr>
				`).hide().fadeIn(100);
				if (item.card)
					$("#card-list").append(`
						<div class="card m-2 shadow-sm" style="width: 14rem; padding: 0;">
							<img src=${item.img || "https://i.i1Amgur.com/i71IPKv.jpg"}  alt="..." style="width: 100%; height: 250px;"> </img>
							<div class="m-2 mb-0">
								<p> <a class="title" target="_blank" href="${item.title}" >${item.name || "Title Not Found 404"}</a></p>
							</div>
							<ul class="list-group list-group-flush">
								<li class="list-group-item d-flex justify-content-end">
									<button type="button" class="btn btn-warning">Chapter ${item.chapter || 0}</button>
									<button data-manhwa="${btoa(unescape(JSON.stringify(item)))}" type="button" class="btn btn-danger  ms-2"><i class="bi bi-shield-fill-x"></i></button>
								</li>
							</ul>
						</div>
					`)

			});
		} else {
			$("#manhwa tbody").append(`
				<tr>
					<td>Not Found</td>
					<td>Not Found</td>
					<td>Not Found</td>
				</tr>
			`);
		}

		if ($(".card").length == 0) {
			$("#card-list").append(`
						<div class="card m-2 shadow-sm " style="width: 14rem; padding: 0;">
							<img src="https://i.imgur.com/i71IPKv.jpg"  alt="..." style="width: 100%; height: 250px;"> </img>
							<div class="m-2 mb-0">
								<p> <a class="title" target="_blank" href="#" >Not Found</a></p>
							</div>
							<ul class="list-group list-group-flush">
								<li class="list-group-item d-flex justify-content-end">
									<button type="button" class="btn btn-warning">Chapter Not Found</button>
								</li>
							</ul>
						</div>
					`)
		}

		return res;
	});

	$("body").on("click", ".open-manhwa", async function (e) {
		e.stopPropagation();
		e.preventDefault();
		const url = $(this).parent().find("td.title").text();
		window.open(url);
	});

	$("body").on("click", "td.remove-saved-history", async function (e) {
		e.stopPropagation();
		e.preventDefault();
		const data = $(this).data("manhwa");
		console.log(JSON.parse(atob(data)));
		await removeManhwaHistory(JSON.parse(atob(unescape(data)))).then((res) => {
			$(this).parent().fadeOut(200).remove();
		}).catch(err => {
			console.log(err);
		});
	});

	$("body").on("click", "td.remove-saved", async function (e) {
		const data = $(this).data("manhwa");
		await removeManhwaSaved(JSON.parse(atob(unescape(data)))).then((res) => {
			$(this).parent().fadeOut(200).remove();
		}).catch(err => {
			console.log(err);
		});
	});
	$("body").on("click", ".btn-danger", async function (e) {
		const data = $(this).data("manhwa");
		await removeManhwaSaved(JSON.parse(atob(data))).then((res) => {
			$(this).parent().parent().parent().fadeOut(200).remove();
		}).catch(err => {
			console.log(err);
		});
	});

	history = await getManhwaHistory().then(res => {
		if (!res)
			return
		res = res.data.manhwa;
		if (res.length > 0) {
			res.reverse().map((item) => {
				$("#history tbody").append(`
					<tr style="cursor:pointer;" class="open-manhwa">
						<td>${item.date}</td>
						<td class="title">${item.title}</td>
						<td class="remove-saved-history" data-manhwa="${btoa(unescape(JSON.stringify(item)))}"><i class="bi bi-calendar-x-fill"></i></td>
					</tr>
				`).hide().fadeIn(100);
			});
		} else {
			$("#history tbody").append(`
				<tr>
					<td>None</td>
					<td>None</td>
					<td>None</td>
				</tr>
			`);
		}
	});

	$("#search").on("keyup", function (e) {
		const search = $(this).val().toLowerCase();
		const searchTarget = $("#nav-bar").find("a.nav-link.active").attr("href");
		if (search == "") {
			console.log("to aki")
			$(searchTarget).find("tr").fadeIn(100);
			$(searchTarget).find(".card").fadeIn(100);
			return;
		}

		if (searchTarget == "#cards")

			$(searchTarget).find(`div.card`).each(function (index) {

				var foundManhwa = false;
				const val = $(this).find("a.title").text().toLowerCase();
				const similarity_r = similarity(val, search);
				if (val.includes(search) || similarity_r >= 0.3)
					foundManhwa = true;
				else
					foundManhwa = false;

				if (!foundManhwa) {
					$(this).fadeOut(200);
				}
				else {
					$(this).fadeIn(200);
				}

			});

		else

			$(searchTarget).find("tr").each(function (e) {
				$(this).each(function (e) {
					var found = false;
					$(this).find("td").each(function (e) {

						var val = $(this).text().toLowerCase();
						if (found)
							return;

						if (val.includes(search) || similarity(val, search) >= 0.3)
							found = true;
						else
							found = false;

						console.log({ found, search, val })
					});

					if (!found)
						$(this).fadeOut(100);
					else
						$(this).fadeIn(100);

					found = false;
				});
			});


	})

});
