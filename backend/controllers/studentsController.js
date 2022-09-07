const Student = require("../models/student");
const mongoose = require("mongoose");

//get all students
const getStudents = async (req, res) => {
	const students = await Student.find({}).sort({ createdAt: -1 });
	res.status(200).json(students);
};

//get a single student
const getStudent = async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: "No such student" });
	}

	const student = await Student.findById(id);

	if (!student) {
		return res.status(404).json({ error: "No such student" });
	}

	res.status(200).json(student);
};

//create a new student
const createStudent = async (req, res) => {
	const { name, sex, email, pob, dob, groups } = req.body;
	try {
		const student = await Student.create({
			name,
			sex,
			email,
			pob,
			dob,
			groups,
		});
		res.status(200).json(student);
	} catch (error) {
		// res.status(400).json({ error: error.message });
		console.log("Error while fecthing", error);
	}
	// res.json({ msg: "POST a new student" });
};

//delete a student
const deleteStudent = async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: "No such student" });
	}

	const student = await Student.findOneAndDelete({ _id: id });

	if (!student) {
		return res.status(404).json({ error: "No such student" });
	}

	res.status(200).json(student);
};

//update a student
const updateStudent = async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: "No such student" });
	}

	const student = await Student.findOneAndUpdate(
		{ _id: id },
		{
			...req.body,
		}
	);

	if (!student) {
		return res.status(404).json({ error: "No such student" });
	}

	res.status(200).json(student);
};

module.exports = {
	createStudent,
	getStudents,
	getStudent,
	deleteStudent,
	updateStudent,
};
