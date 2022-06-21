export const addManhwa = async (title, email) => {
	return await $.get(`https://manhwa-tracker.herokuapp.com/add_manhwa?url=${title}&email=${email}`).then((res) => {
		return res;
	}).catch(err => {
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
