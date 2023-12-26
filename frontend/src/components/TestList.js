import React, { useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import {
  Container,
  Typography,
  Button,
  Menu,
  MenuItem,
  Select,
  TextField,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MoreVertIcon from "@mui/icons-material/MoreVert";

export default function TestList() {
  const [rows, setRows] = useState([]);

  const [search, setSearch] = useState("");

  const [view, setView] = useState(
    JSON.parse(localStorage.getItem("view")) || "manager"
  );
  const [sortModel, setSortModel] = useState(
    JSON.parse(localStorage.getItem("sortModel")) || []
  );
  const [filterModel, setFilterModel] = useState(
    JSON.parse(localStorage.getItem("filterModel")) || { items: [] }
  );
  const [page, setPage] = useState(
    JSON.parse(localStorage.getItem("page")) || 0
  );
  const [columnVisibilityModel, setColumnVisibilityModel] = useState(
    JSON.parse(localStorage.getItem("columnVisibilityModel")) || {
      name: view !== "manager",
      script: view !== "manager",
      code_line: view !== "manager",
      engineer: view !== "manager",
      technician: view !== "manager",
    }
  );
  const [paginationModel, setPaginationModel] = useState(
    JSON.parse(localStorage.getItem("paginationModel")) || {
      pageSize: 15,
      page: 0,
    }
  );

  // Fetching data for datagrid
  useEffect(() => {
    fetch("/api/test-list/")
      .then((response) => response.json())
      .then((data) => setRows(data))
      .catch((error) => console.log("Error"));
  }, []);

  // Saving state to local storage on datagrid property change
  useEffect(() => {
    localStorage.setItem("sortModel", JSON.stringify(sortModel));
    localStorage.setItem("filterModel", JSON.stringify(filterModel));
    localStorage.setItem("page", JSON.stringify(page));
    localStorage.setItem(
      "columnVisibilityModel",
      JSON.stringify(columnVisibilityModel)
    );
    localStorage.setItem("paginationModel", JSON.stringify(paginationModel));
    localStorage.setItem("view", JSON.stringify(view));
  }, [
    sortModel,
    filterModel,
    page,
    columnVisibilityModel,
    paginationModel,
    view,
  ]);

  const handleViewChange = (event) => {
    setView(event.target.value);
    // You can use useEffect to do this better with just the view value
    // setView is async but doesn't return a promise
    const newModel = {
      name: event.target.value !== "manager",
      script: event.target.value !== "manager",
      code_line: event.target.value !== "manager",
      engineer: event.target.value !== "manager",
      technician: event.target.value !== "manager",
    };
    setColumnVisibilityModel(newModel);
    localStorage.setItem("columnVisibilityModel", JSON.stringify(newModel));
    console.log(view);
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  // .filter takes a filtering function as an argument and returns
  // the filtered array
  const filteredRows = rows.filter((row) =>
    // Object.values returns an array of the values of an object
    // .some returns true if at least one element in the array matches the given filter function passed in
    Object.values(row).some((value) => {
      // This final line just checks if the given value includes the search value
      if (value !== null) {
        return value.toString().toLowerCase().includes(search.toLowerCase());
      }
      return false;
    })
  );

  if (rows === null) {
    <Box
      style={{ height: "100vh" }}
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Typography component="h1" variant="h1">
        Loading...
      </Typography>
    </Box>;
  }
  // else return datagrid
  return (
    <Container style={{ marginTop: 20, height: "150vh" }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <TextField
          value={search}
          onChange={handleSearchChange}
          label="Search"
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          style={{ marginBottom: 10 }}
        />
        <Select
          value={view}
          onChange={handleViewChange}
          style={{ position: "relative", marginLeft: 14, marginBottom: 10 }}
        >
          <MenuItem value={"manager"}>Manager View</MenuItem>
          <MenuItem value={"eng"}>Engineer View</MenuItem>
          <MenuItem value={"tech"}>Technician View</MenuItem>
        </Select>
      </Box>
      <Box sx={{ height: "50%", width: "100%" }}>
        <DataGrid
          rows={filteredRows}
          columns={getColumns()}
          // Setting initial state from local storage
          sortModel={sortModel}
          onSortModelChange={(model) => setSortModel(model)}
          filterModel={filterModel}
          onFilterModelChange={(model) => setFilterModel(model)}
          paginationModel={paginationModel}
          onPaginationModelChange={(model) => setPaginationModel(model)}
          columnVisibilityModel={columnVisibilityModel}
          onColumnVisibilityModelChange={(model) => {
            setColumnVisibilityModel(model);
          }}
          //----------------------------------------
          // initialState={{
          //   pagination: {
          //     paginationModel: {
          //       pageSize: 15,
          //     },
          //   },
          // }}
          pageSizeOptions={[15]}
          disableRowSelectionOnClick
          slots={{
            toolbar: GridToolbar,
          }}
        />
      </Box>
    </Container>
  );
}

function getColumns() {
  return [
    {
      field: "name",
      headerName: "Tester Name",
      width: 150,
    },
    {
      field: "program",
      headerName: "Program",
      width: 150,
    },
    {
      field: "script",
      headerName: "Script Running",
      width: 150,
    },
    {
      field: "progress",
      headerName: "Progress",
      width: 150,
      renderCell: (params) => {
        let color;
        if (params.value === "In Progress") {
          color = "#F8E95F";
        } else if (params.value === "Completed") {
          color = "#66CAEC";
        } else if (params.value === "Failed") {
          color = "#FF6347";
        }
        return <span style={{ color: color }}>{params.value}</span>;
      },
    },
    {
      field: "code_line",
      headerName: "Code Line",
      width: 150,
    },
    {
      field: "engineer",
      headerName: "Test Engineer",
      width: 150,
    },
    {
      field: "technician",
      headerName: "Test Technician",
      width: 150,
    },
    {
      field: "start_date",
      headerName: "Start Date",
      renderCell: (params) => new Date(params.value).toLocaleDateString(),
      // Not sure if this will sort correctly
      // I think renderCell renders a react element where you can add extra html
      // while valueFormatter just formats the string value?
    },
    {
      field: "end_date",
      headerName: "End Date",
      renderCell: (params) => new Date(params.value).toLocaleDateString(),
    },
    {
      field: "fail_date",
      headerName: "Fail Date",
      width: 150,
    },
  ];
}
