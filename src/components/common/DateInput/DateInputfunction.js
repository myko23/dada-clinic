import _ from "lodash";

export const getMaxDay = (month, year) => {
	if (
		_.includes(
			[
				"january",
				"march",
				"may",
				"july",
				"august",
				"october",
				"december",
			],
			month
		)
	)
		return 31;
	else if (_.includes(["april", "june", "september", "november"], month))
		return 30;
	else if (month === "february") {
		if (year % 4 === 0) return 29;
		else return 28;
	}
};

export const parseStringDate = (date) => {
	let newVarDate = date;
	let newMonth = newVarDate.substr(0, date.indexOf("-"));
	newVarDate = newVarDate.substr(date.indexOf("-") + 1);
	let newDay = newVarDate.substr(0, date.indexOf("-"));
	const newYear = newVarDate.substr(date.indexOf("-") + 1);
	return { month: changeNumberToMonth(newMonth), day: newDay, year: newYear };
};
export const parseDateString = (month, day, year) => {
	return `${changeMonthToNumber(month)}-${day}-${year}`;
};
export const combineMonth = (event, state) => {
	return parseDateString(
		event,
		getDefaultDay(
			parseStringDate(state).day,
			event,
			parseStringDate(state).year
		),
		parseStringDate(state).year
	);
};
export const combineYear = (event, state) => {
	return parseDateString(
		parseStringDate(state).month,
		getDefaultDay(
			parseStringDate(state).day,
			parseStringDate(state).month,
			event
		),
		event
	);
};
export const combineDay = (event, state) => {
	return parseDateString(
		parseStringDate(state).month,
		testDayZero(event),
		parseStringDate(state).year
	);
};
export const getDefaultDay = (day, month, year) => {
	const maxDay = getMaxDay(month, year);
	if (day < maxDay) return day;
	else return maxDay;
};

export const testDayZero = (num) => {
	let newDay = 0;
	if (parseInt(num) < 10) newDay += parseInt(num).toString();
	else newDay = num;

	return newDay;
};
export const changeNumberToMonth = (num) => {
	switch (num) {
		case "01":
			return "january";
		case "02":
			return "february";
		case "03":
			return "march";
		case "04":
			return "april";
		case "05":
			return "may";
		case "06":
			return "june";
		case "07":
			return "july";
		case "08":
			return "august";
		case "09":
			return "september";
		case "10":
			return "october";
		case "11":
			return "november";
		case "12":
			return "december";
		default:
			return "january";
	}
};
export const changeMonthToNumber = (num) => {
	switch (num) {
		case "january":
			return "01";
		case "february":
			return "02";
		case "march":
			return "03";
		case "april":
			return "04";
		case "may":
			return "05";
		case "june":
			return "06";
		case "july":
			return "07";
		case "august":
			return "08";
		case "september":
			return "09";
		case "october":
			return "10";
		case "november":
			return "11";
		case "december":
			return "12";
		default:
			return "01";
	}
};
