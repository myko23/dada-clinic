import React from "react";
import { monthsData } from "./dateOptionData";
import {
	getMaxDay,
	combineDay,
	combineMonth,
	combineYear,
	parseStringDate,
	testDayZero,
} from "./DateInputfunction";
import "./DateInput.css";

const DateInput = ({ label, className, edit, state, setState }) => {
	const renderOption = () => {
		return monthsData.map((i, j) => (
			<option key={j} value={i.value}>
				{i.label}
			</option>
		));
	};

	const renderDay = (maxLength) => {
		const days = Array.from({ length: maxLength }, (_, i) => i + 1);
		return days.map((i, j) => (
			<option key={j} value={testDayZero(i)}>
				{i}
			</option>
		));
	};

	const renderYears = () => {
		const today = new Date().getFullYear();
		const years = Array(today + 1 - 1930 + 1)
			.fill()
			.map((_, idx) => 1930 + idx);
		return years.map((i, j) => (
			<option key={j} value={testDayZero(i)}>
				{i}
			</option>
		));
	};

	const defineEdit = () => {
		if (edit === true) return "dateinput__edit--true";
		else if (edit === false) return "dateinput__edit--false";
		else return "dateinput__edit--true";
	};

	return (
		<div className={`fit dateinput ${className || ""} ${defineEdit()}`}>
			<div className="dateinput__label">{label}</div>
			<div className="dateinput__input-set">
				<select
					className="dateinput__input dateinput__input--month"
					value={parseStringDate(state || "06-23-1996").month}
					onChange={(e) => {
						setState(combineMonth(e.target.value, state));
					}}
				>
					{renderOption()}
				</select>
				<select
					className="dateinput__input dateinput__input--day"
					value={parseStringDate(state || "06-23-1996").day}
					onChange={(e) => {
						setState(combineDay(e.target.value, state));
					}}
				>
					{renderDay(
						getMaxDay(
							parseStringDate(state || "06-23-1996").month,
							parseStringDate(state || "06-23-1996").year
						)
					)}
				</select>
				<select
					className="dateinput__input dateinput__input--year"
					value={parseStringDate(state || "06-23-1996").year}
					onChange={(e) => {
						setState(combineYear(e.target.value, state));
					}}
				>
					{renderYears()}
				</select>
			</div>
		</div>
	);
};

export default DateInput;
