const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const studentSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		sex: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		pob: {
			type: String,
			required: true,
		},
		dob: {
			type: String,
			required: true,
		},
		groups: {
			type: [String],
			required: true,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Student", studentSchema);
