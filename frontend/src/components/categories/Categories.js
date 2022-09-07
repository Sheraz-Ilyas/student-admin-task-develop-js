import React from "react";
import {
	FormGroup,
	FormControlLabel,
	Checkbox,
	Typography,
	orange,
	grey,
} from "../../ui";
import { groupsOptions } from "../../constants/constants";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
	categoriesDiv: {
		display: "flex",
		justifyContent: "center",
		flexDirection: "column",
		alignContent: "center",
	},
	headingTag: {
		fontSize: "16px",
		textTransform: "uppercase",
		textAlign: "left",
		marginTop: "50px",
	},
});

function Categories({ setCategories }) {
	const classes = useStyles();
	const [checkBoxValues, setCheckBoxValues] = React.useState([]);

	const handleCheckBoxValues = (e) => {
		const index = checkBoxValues.indexOf(e.target.value);
		const filteredCheckBoxVals = checkBoxValues.filter(
			(checkBoxValue) => checkBoxValue !== e.target.value
		);
		if (index === -1) {
			setCheckBoxValues([...checkBoxValues, e.target.value]);
		} else {
			setCheckBoxValues(filteredCheckBoxVals);
		}
	};
	setCategories(checkBoxValues);

	return (
		<>
			<FormGroup sx={{ paddingTop: "50px" }}>
				<Typography className={classes.headingTag}>
					Filters for study groups
				</Typography>
				<div className={classes.categoriesDiv}>
					{React.Children.toArray(
						groupsOptions.map((group) => {
							return (
								<FormControlLabel
									control={
										<Checkbox
											sx={{
												color: grey[600],
												"&.Mui-checked": {
													color: orange[600],
												},
											}}
											value={group.label}
											checked={checkBoxValues.includes(group.label)}
											onChange={handleCheckBoxValues}
										/>
									}
									label={group.label}
								/>
							);
						})
					)}
				</div>
			</FormGroup>
		</>
	);
}

export default Categories;
