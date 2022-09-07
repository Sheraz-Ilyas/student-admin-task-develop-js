import { BASE_URL } from "../constants/constants";

export const addStudent = async (student, setAailableStudentsRecord) => {
	const settings = {
		method: "POST",
		body: JSON.stringify(student),
		headers: {
			"Content-type": "application/json; charset=UTF-8",
		},
	};
	const response = await fetch(BASE_URL, settings);
	const data = await response.json();
	setAailableStudentsRecord((prev) => {
		return [...prev, data];
	});
	return data;
};

export const deleteStudent = async (id, setAailableStudentsRecord) => {
	const settings = {
		method: "DELETE",
	};
	const response = await fetch(BASE_URL + `/${id}`, settings);
	if (response.ok) {
		setAailableStudentsRecord((prev) => prev.filter((stu) => stu._id !== id));
	}
};

export const updateStudent = async (id, student, setAailableStudentsRecord) => {
	const settings = {
		method: "PATCH",
		body: JSON.stringify(student),
		headers: {
			"Content-type": "application/json; charset=UTF-8",
		},
	};
	let response = await fetch(BASE_URL + `/${id}`, settings);
	let data = await response.json();
	console.log("Updated data", data);
	setAailableStudentsRecord((prev) => {
		return prev.map((stu) => {
			if (stu._id === data._id) {
				return data;
			}
			return stu;
		});
	});
};
