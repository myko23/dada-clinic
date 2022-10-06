import moment from "moment";

export const getAge = (birthday) => {
	return moment(birthday, "MM-DD-YYYY").fromNow(true);
};
export const formatFormalDate = (date) => {
	return moment(date, "MM-DD-YYYY").format("MMM DD, YYYY");
};

export const getDateDiff = (datestart, dateend) => {
	const days = moment(dateend, "MM-DD-YYYY").diff(
		moment(datestart, "MM-DD-YYYY"),
		"days"
	);
	console.log(days);

	return days + (days === 1 ? " day" : " days");
};
