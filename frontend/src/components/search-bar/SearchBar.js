import React from "react";
import {
	Autocomplete,
	TextField,
	Typography,
	InputAdornment,
	SearchIcon,
} from "../../ui";
import { makeStyles } from "@mui/styles";
import "./searchBar.css";

const useStyles = makeStyles({
	textField: {
		width: "100%",
		marginLeft: "auto",
		marginRight: "auto",
		paddingBottom: 0,
		paddingLeft: "40px",
		marginTop: 0,
		fontWeight: 500,
		height: "2px",
		border: 0,
	},
	input: {
		color: "black",
		backgroundColor: "#efefefa3",
		height: "2px",
		border: 0,
	},
});

function SearchBar({ setSearchedStudent, availableStudentsRecord }) {
	const classes = useStyles();

	return (
		<div>
			<Typography
				gutterBottom
				sx={{
					fontSize: "16px",
					textTransform: "uppercase",
					textAlign: "left",
					marginTop: "",
				}}
			>
				Search for name
			</Typography>
			<div style={{ display: "flex", marginLeft: "-38px" }}>
				<SearchIcon
					style={{
						position: "relative",
						left: "39px",
						padding: "7px",
						backgroundColor: "#efefef",
					}}
				/>
				<Autocomplete
					id="free-solo-demo"
					freeSolo
					style={{ width: 300, height: "3.47vw" }}
					options={availableStudentsRecord?.map((option) => option.name)}
					renderInput={(params) => <TextField {...params} />}
					onChange={(e, v) => setSearchedStudent(v)}
					inputprops={{
						className: classes.textField,
						startAdornment: <InputAdornment position="start"></InputAdornment>,
					}}
				/>
			</div>
		</div>
	);
}

export default SearchBar;
