export const addManhwa = async (title, email, data) => {
	return await $.ajax({
		url: `https://manhwa-tracker.herokuapp.com/add_manhwa`,
		type: "POST",
		contentType: 'application/json',
		crossDomain: true,
		data: JSON.stringify({
			title: title,
			email: email,
			...data
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
export const removeManhwa = async (title, email) => {
	return await $.get(`https://manhwa-tracker.herokuapp.com/remove_manhwa?url=${title}&email=${email}`).then((res) => {
	}).catch(err => {
		return err;
	});
}
export const addManhwaHistory = async (title, email) => {
	return await $.get(`https://manhwa-tracker.herokuapp.com/add_history?url=${title}&email=${email}`).then((res) => {
		console.log(res);
		return res;
	}).catch(err => {
		return err;
	});
}
export const removeManhwaHistory = async (title, email) => {
	return await $.get(`https://manhwa-tracker.herokuapp.com/remove_history?url=${title}&email=${email}`).then((res) => {
		return res;
	}).catch(err => {
		return err;
	});
}

export const getManhwaHistory = async (title, email) => {
	return await $.get(`https://manhwa-tracker.herokuapp.com/get_history`).then((res) => {
		return res;
	}).catch(err => {
		return err;
	});
}

// https://readm.org/manga/2548
// https://readm.org/manga/2548/1385/all-pages
// https://readm.org/

const readm = async (path) => {
	if (path === "/" || !path.includes("/manga/")) {
		return {
			chapter: "",
			name: "",
			img: "",
			card: false,
		}
	} else if (path.includes("/manga/")) {
		if (!path.includes("/all-pages")) {
			var url = window.location.href;
			var chapter = "";
		} else {
			var url = window.location.origin;
			var chapter = path.split("/")[3];
			url = `${url}${path.split("/").splice(0, 3).join("/")}`;
		}
		return await $.ajax(url).then((res) => {
			const html = $($.parseHTML(res.html));
			const name = html.find("h1.page-title").html();
			const img = `${window.location.origin}${html.find("img.series-profile-thumb").attr("src")}`;
			const data = {
				chapter: chapter,
				name: name,
				img: img,
				card: true,
			};
			return data;
		});
	}
}
const asura = async (path) => {
	console.log(path.replace(/[^0-9]/g, ""));
	if (path === "/" || !path.includes("/comics/") && !path.includes("chapter")) {
		alert("a")
		return {
			chapter: "",
			name: "",
			img: "",
			card: false,
		}
	} else {
		if (!path.includes("chapter")) {
			var url = window.location.href;
			var chapter = "";
		} else {
			var url = $("div.allc a").attr("href");
			chapter = path.replace(/[^0-9]/g, "");
		}
		return await $.ajax(url).then((res) => {
			const html = $($.parseHTML(res));
			const name = html.find("h1.entry-title").html();
			const img = html.find("div.thumb > img.wp-post-image").attr("src");
			const data = {
				chapter: chapter,
				name: name,
				img: img,
				card: true,
			};
			console.log(data);
			return data;
		});
	}
}
const reaper = async (path) => {
	if (path === "/" || !path.includes("/series/") && !path.includes("chapter")) {
		return {
			chapter: "",
			name: "",
			img: "",
			card: false,
		}
	} else {
		if (!path.includes("chapter")) {
			var url = window.location.href;
			var chapter = "";
		} else {
			var url = window.location.origin;
			url = `${url}${path.split("/").splice(0, 3).join("/")}`;
			chapter = path.replace(/[^0-9]/g, "");
		}
		return await $.ajax(url).then((res) => {
			const html = $($.parseHTML(res));
			const name = html.find("div.post-title h1").html().replace("\n", "");
			const img = html.find("div.summary_image img.img-responsive").attr("src");
			const data = {
				chapter: chapter,
				name: name,
				img: img,
				card: true,
			};
			console.log(data);
			return data;
		});
	}
}
const kakalot = async (path) => {
	console.log({ path });
	if (path === "/" || !path.includes("/manga") && !path.includes("chapter")) {
		return {
			chapter: "",
			name: "",
			img: "",
			card: false,
		}
	} else {
		if (!path.includes("chapter")) {
			var url = window.location.href;
			var chapter = "";
		} else {
			var url = window.location.origin;
			url = `${url}${path.split("/").splice(0, 2).join("/")}`;
			chapter = path.replace(/[^0-9]/g, "");
		}
		return await $.ajax(url).then((res) => {
			const html = $($.parseHTML(res));
			const name = html.find("div.story-info-right h1").html();
			const img = html.find("span.info-image img.img-loading").attr("src");
			const data = {
				chapter: chapter,
				name: name,
				img: img,
				card: true,
			};
			console.log(data);
			return data;
		});
	}
}
const getInfo = {
	0: readm,
	1: asura,
	2: reaper,
	3: kakalot,
	4: kakalot,
}

export const getManhwaInfo = async (url) => {
	const origin = window.location.hostname;
	const type = [
		"readm",
		"asurascans",
		"reaperscans",
		"mangakakalot",
		"readmanganato"
	];
	const option = type.filter((item, index) => {

		if (origin.includes(item)) {
			if (item === "readm" && origin.includes("readmanganato"))
				return false
			return item;
		}
		else
			return false
	})[0];

	const path = window.location.pathname;
	const index = type.indexOf(option);
	return await getInfo[index](path);

}
