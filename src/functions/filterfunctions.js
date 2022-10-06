import _ from "lodash";

export const getDataByID = (id, list) => {
	return _.find(list, { _id: id });
};
export const getFilterListByPatientID = (id, list) => {
	return _.filter(list, (i) => i.patient_id === id);
};
export const getfilterBySearch = (search, list) => {
	if (list && list.length !== 0) {
		const newList = list.filter((i) => {
			let item = false;
			Object.values(i).forEach((j) => {
				if (String(j).toLowerCase().includes(search.toLowerCase()))
					item = true;
			});
			if (item) return i;
			return null;
		});
		return newList;
	} else return list;
};
