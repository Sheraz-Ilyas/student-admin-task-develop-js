import * as Yup from "yup";

export const studentsSchema = Yup.object().shape({
	name: Yup.string()
		.min(3, "Name cannot be less than 3 characters")
		.max(20, "Name cannot be more than 20 characters")
		.matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed")
		.required("Name is required"),
	sex: Yup.string().required("Gender must be selected"),
	email: Yup.string()
		.email("Must be a valid E-mail")
		.max(255)
		.required("E-mail is required"),
	pob: Yup.string()
		.min(3, "POB cannot be less than 3 characters")
		.max(20, "POB cannot be more than 20 characters")
		.matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed")
		.required("POB is required"),
	dob: Yup.date().max(new Date(), "Invalid date").required("DOB is required"),
	groups: Yup.array()
		.max(4, "Groups cannot be more than 4")
		.min(1, "Groups must be checked"),
});
