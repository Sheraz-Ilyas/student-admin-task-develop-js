import React from "react";
import {
	Button,
	Modal,
	Box,
	Typography,
	Grid,
	TextField,
	RadioGroup,
	FormControlLabel,
	Radio,
	FormLabel,
	Stack,
	Checkbox,
	EditIcon,
	AddCircleIcon,
} from "../../ui/";
import { useFormik, FormikProvider } from "formik";
import { addStudent, updateStudent } from "../../services/api";
import { groupsOptions } from "../../constants/constants";
import { studentsSchema } from "../../schemas/Validations";
import { makeStyles } from "@mui/styles";
import "./modals.css";

const useStyles = makeStyles({
	error: {
		color: "red",
		fontSize: "12px",
	},
	boxStyle: {
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		width: 400,
		bgcolor: "background.paper",
		border: "2px solid #000",
		boxShadow: 24,
		p: 4,
	},
});

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
	bgcolor: "background.paper",
	border: "2px solid #000",
	boxShadow: 24,
	p: 4,
};

function FormModal({
	open,
	handleClose,
	title,
	setAailableStudentsRecord,
	action,
	data,
}) {
	const classes = useStyles();
	const studentForm = useFormik({
		initialValues: data
			? data
			: {
					name: "",
					sex: "",
					email: "",
					pob: "",
					dob: "",
					groups: [],
			  },
		enableReinitialize: true,
		validationSchema: studentsSchema,
		onSubmit: (values) => {
			if (action === "add") {
				addStudent(values, setAailableStudentsRecord);
				handleClose();
				studentForm.handleReset();
				studentForm.resetForm();
				return;
			}
			if (action === "edit") {
				updateStudent(data._id, values, setAailableStudentsRecord);
				handleClose();
				studentForm.handleReset();
				studentForm.resetForm();
				return;
			}
		},
	});

	return (
		<>
			<FormikProvider value={studentForm}>
				<form onSubmit={studentForm.handleSubmit}>
					<Modal
						open={open}
						aria-labelledby="modal-modal-title"
						aria-describedby="modal-modal-description"
						className="form-model"
						style={{ border: "none", borderRadius: "10px" }}
					>
						<Box sx={style}>
							<Typography
								id="modal-modal-title"
								variant="h5"
								component="h2"
								sx={{ marginBottom: { sm: "5px", md: "15px" } }}
							>
								{title}
							</Typography>
							<Grid container spacing={2}>
								<Grid item xs={12} md={6} className="item-container">
									<TextField
										id="standard-basic"
										error={
											studentForm.errors.name && studentForm.touched.name
												? true
												: false
										}
										label="Name"
										name="name"
										onChange={studentForm.handleChange}
										onBlur={studentForm.handleBlur}
										defaultValue={data?.name}
										variant="standard"
										helperText={
											studentForm.errors.name && studentForm.touched.name
												? studentForm.errors.name
												: ""
										}
										fullWidth
									/>
								</Grid>
								<Grid
									item
									xs={12}
									md={6}
									className="item-container"
									sx={{ marginTop: { sm: "5px", md: "15px" } }}
								>
									<FormLabel
										error={
											studentForm.errors.sex && studentForm.touched.sex
												? true
												: false
										}
									>
										Gender
									</FormLabel>
									<RadioGroup
										onChange={studentForm.handleChange}
										name="sex"
										sx={{ display: "flex", flexDirection: "row" }}
										defaultValue={data?.sex}
									>
										<FormControlLabel
											value="male"
											control={<Radio />}
											label="male"
										/>
										<FormControlLabel
											value="female"
											control={<Radio />}
											label="female"
										/>
									</RadioGroup>
									<Typography
										className={classes.error}
										variant="p"
										component="p"
									>
										{studentForm.errors.sex && studentForm.touched.sex
											? studentForm.errors.sex
											: ""}
									</Typography>
								</Grid>
								<Grid
									item
									xs={12}
									md={12}
									className="item-container"
									sx={{ paddingTop: "0px !important" }}
								>
									<TextField
										id="standard-basic"
										label="Email"
										variant="standard"
										type="email"
										name="email"
										value={studentForm.values.email}
										onChange={studentForm.handleChange}
										onBlur={studentForm.handleBlur}
										helperText={
											studentForm.errors.email && studentForm.touched.email
												? studentForm.errors.email
												: ""
										}
										error={
											studentForm.errors.email && studentForm.touched.email
												? true
												: false
										}
										fullWidth
									/>
								</Grid>
								<Grid
									item
									xs={12}
									md={6}
									className="item-container"
									sx={{
										paddingTop: {
											sm: "0px !important",
											md: "29.9px !important",
										},
									}}
								>
									<TextField
										id="standard-basic"
										label="Place of Birth"
										variant="standard"
										fullWidth
										helperText={
											studentForm.errors.pob && studentForm.touched.pob
												? studentForm.errors.pob
												: ""
										}
										name="pob"
										error={
											studentForm.errors.pob && studentForm.touched.pob
												? true
												: false
										}
										value={studentForm.values.pob}
										onChange={studentForm.handleChange}
										onBlur={studentForm.handleBlur}
										type="text"
									/>
								</Grid>
								<Grid
									item
									xs={12}
									md={6}
									className="item-container"
									sx={{ paddingTop: "22px !important" }}
								>
									<FormLabel
										error={
											studentForm.errors.dob && studentForm.touched.dob
												? true
												: false
										}
									>
										Date of Birth
									</FormLabel>

									<TextField
										id="standard-basic"
										label=""
										variant="standard"
										name="dob"
										fullWidth
										error={
											studentForm.errors.dob && studentForm.touched.dob
												? true
												: false
										}
										value={studentForm.values.dob}
										onChange={studentForm.handleChange}
										helperText={
											studentForm.errors.dob && studentForm.touched.dob
												? studentForm.errors.dob
												: ""
										}
										onBlur={studentForm.handleBlur}
										type="date"
									/>
								</Grid>
								<Grid
									item
									xs={12}
									md={12}
									className="item-container"
									sx={{ paddingTop: "30px !important" }}
								>
									<FormLabel
										error={
											studentForm.errors.groups && studentForm.touched.groups
												? true
												: false
										}
									>
										Groups
									</FormLabel>
									<div>
										{React.Children.toArray(
											groupsOptions.map((group) => {
												return (
													<FormControlLabel
														control={
															<Checkbox
																onChange={studentForm.handleChange}
																defaultChecked={data?.groups?.includes(
																	group.label
																)}
															/>
														}
														label={group.label}
														name="groups"
														value={group.label}
													/>
												);
											})
										)}
									</div>
									<Typography
										className={classes.error}
										variant="p"
										component="p"
									>
										{studentForm.errors.groups && studentForm.touched.groups
											? studentForm.errors.groups
											: ""}
									</Typography>
								</Grid>
								<Grid item xs={12} md={12} className="item-container">
									<Stack
										direction="row"
										spacing={2}
										sx={{ justifyContent: "flex-end", marginTop: "10px" }}
									>
										<Button
											variant="outlined"
											onClick={() => {
												handleClose();
												studentForm.handleReset();
												studentForm.resetForm();
											}}
										>
											Cancel
										</Button>
										<Button
											type="submit"
											variant="contained"
											endIcon={
												action === "add" ? <AddCircleIcon /> : <EditIcon />
											}
											onClick={studentForm.handleSubmit}
										>
											{action === "add" ? "Add" : "Update"}
										</Button>
									</Stack>
								</Grid>
							</Grid>
						</Box>
					</Modal>
				</form>
			</FormikProvider>
		</>
	);
}

export default FormModal;
