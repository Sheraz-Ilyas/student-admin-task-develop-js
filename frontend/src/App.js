import React from "react";
import { Typography, Box, Container, Grid } from "./ui";
import StudentsTable from "./components/students-table/StudentsTable";
import SearchBar from "./components/search-bar/SearchBar";
import Categories from "./components/categories/Categories";

function App() {
	const [searchedStudent, setSearchedStudent] = React.useState([]);
	const [categories, setCategories] = React.useState([]);
	const [availableStudentsRecord, setAailableStudentsRecord] = React.useState(
		[]
	);
	return (
		<>
			<Container maxWidth="xl">
				<Typography
					id="modal-modal-title"
					variant="h4"
					component="h4"
					sx={{ textAlign: "center", marginBottom: "20px", marginTop: "20px" }}
				>
					Student Administration Framework
				</Typography>
				<Box
					sx={{
						borderTop: "1px solid #efefef",
						paddingTop: "30px",
						alignItems: "center",
					}}
				>
					<Grid container spacing={4}>
						<Grid item sm={12} md={3} className="item-container">
							<SearchBar
								setSearchedStudent={setSearchedStudent}
								availableStudentsRecord={availableStudentsRecord}
							/>
							<Categories
								setCategories={setCategories}
								availableStudentsRecord={availableStudentsRecord}
							/>
						</Grid>
						<Grid item sm={12} md={9}>
							<StudentsTable
								searchedData={searchedStudent}
								filteredCategories={categories}
								setAailableStudentsRecord={setAailableStudentsRecord}
								availableStudentsRecord={availableStudentsRecord}
							/>
						</Grid>
					</Grid>
				</Box>
			</Container>
		</>
	);
}
export default App;
