import React from "react";
import {
	DataGrid,
	Typography,
	Button,
	Stack,
	Avatar,
	PersonIcon,
	IconButton,
	DescriptionIcon,
	DeleteIcon,
	EditIcon,
} from "../../ui";
import { deleteStudent } from "../../services/api";
import FormModal from "../form-modal/FormModal";
import "./studentTable.css";

function StudentsTable({
	searchedData,
	filteredCategories,
	setAailableStudentsRecord,
	availableStudentsRecord,
}) {
	const [filteredStudents, setFilteredStudents] = React.useState("");
	const [rowData, setRowData] = React.useState(null);
	const [openAddForm, setOpenAddForm] = React.useState(false);
	const [openEditForm, setOpenEditForm] = React.useState(false);
	const [isLoading, setIsLoading] = React.useState(true);

	const avatarHandler = (val) => {
		return val.row.sex === "male" ? (
			<Avatar alt="asd" src="man.jpg" />
		) : (
			<Avatar alt="asd" src="girl.png" />
		);
	};

	React.useEffect(() => {
		const searchedNameRes = availableStudentsRecord.filter((record) => {
			return record.name === searchedData;
		});
		setFilteredStudents(searchedNameRes);
	}, [searchedData, availableStudentsRecord]);

	React.useEffect(() => {
		const filteredRes = availableStudentsRecord.filter((student) => {
			let found;
			found = student.groups?.some((r) => filteredCategories.indexOf(r) >= 0);
			return found && student;
		});
		setFilteredStudents(filteredRes);
	}, [filteredCategories, availableStudentsRecord]);

	React.useEffect(() => {
		async function getStudents() {
			const response = await fetch("/api/students");
			const data = await response.json();
			console.log("data", data);

			if (response.ok) {
				console.log("success");
				setAailableStudentsRecord(data);
				setIsLoading(false);
			}
		}
		getStudents();
	}, [setAailableStudentsRecord]);

	const columns = [
		{
			field: "avatar",
			headerName: "",
			width: 80,
			renderCell: (val) => avatarHandler(val),
		},
		{
			field: "name",
			headerName: "NAME",
			width: 120,
		},
		{
			field: "sex",
			headerName: "SEX",
			width: 80,
		},
		{
			field: "email",
			headerName: "EMAIL",
			width: 200,
		},
		{
			field: "pob",
			headerName: "PLACE OF BIRTH",
			width: 150,
		},
		{
			field: "dob",
			headerName: "DATE OF BIRTH",
			width: 150,
		},
		{
			field: "groups",
			headerName: "GROUPS",
			width: 160,
		},
		{
			field: "actions",
			type: "actions",
			headerName: "ACTIONS",
			width: 100,
			cellClassName: "actions",
			getActions: ({ id }) => {
				const onDeleteStudent = () => {
					console.log("id for delete", id);
					deleteStudent(id, setAailableStudentsRecord);
				};

				const onEditStudent = (e) => {
					const data = availableStudentsRecord.find(
						(student) => student._id === id
					);
					console.log(data);
					setRowData(data);
					setOpenEditForm(true);
				};

				return [
					<Stack
						direction="row"
						spacing={1}
						sx={{ justifyContent: "flex-end" }}
					>
						<IconButton aria-label="edit">
							<EditIcon
								color="secondary"
								fontSize="large"
								onClick={onEditStudent}
							/>
						</IconButton>
						<IconButton aria-label="delete">
							<DeleteIcon
								color="error"
								onClick={onDeleteStudent}
								fontSize="large"
							/>
						</IconButton>
					</Stack>,
				];
			},
		},
	];

	return (
		<>
			<FormModal
				title="Edit Student"
				action="edit"
				open={openEditForm}
				handleClose={() => setOpenEditForm(false)}
				data={rowData}
				setAailableStudentsRecord={setAailableStudentsRecord}
			/>
			<FormModal
				title="Add New Student"
				action="add"
				open={openAddForm}
				handleClose={() => setOpenAddForm(false)}
				setAailableStudentsRecord={setAailableStudentsRecord}
			/>
			<div style={{ height: 400, width: "100%", marginTop: "40px" }}>
				<div style={{ display: "flex" }}>
					<PersonIcon fontSize="large" />

					<Typography sx={{ fontSize: "23px" }}>
						{availableStudentsRecord.length === 1
							? `${availableStudentsRecord.length} Student`
							: `${availableStudentsRecord.length} Students`}
					</Typography>

					<Button
						onClick={() => setOpenAddForm(true)}
						variant="contained"
						startIcon={<DescriptionIcon />}
						sx={{
							borderRadius: "0px",
							padding: "5px 35px",
							marginBottom: "30px",
							marginLeft: "40px",
						}}
					>
						New
					</Button>
				</div>

				<DataGrid
					rows={
						filteredStudents.length ? filteredStudents : availableStudentsRecord
					}
					columns={columns}
					pageSize={10}
					getRowId={(row) => row._id}
					rowsPerPageOptions={[10]}
					disableSelectionOnClick
					loading={isLoading}
				/>
			</div>
		</>
	);
}

export default StudentsTable;
