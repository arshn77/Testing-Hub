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
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

export default function TestList() {
  const [rows, setRows] = useState([]);
  const [view, setView] = useState("manager");

  const columns = [
    {
      field: "name",
      headerName: "Tester Name",
      width: 150,
      hide: true,
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

  // Fetching data for datagrid

  useEffect(() => {
    fetch("/api/test-list/")
      .then((response) => response.json())
      .then((data) => setRows(data))
      .catch((error) => console.log("Error"));
  }, []);

  const handleChangeView = (event) => {
    setView(event.target.value);
    console.log(view);
  };

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
      <Box display="flex" justifyContent="flex-end" alignItems="center">
        <Select
          value={view}
          onChange={handleChangeView}
          style={{ position: "relative", marginLeft: 14, marginBottom: 10 }}
        >
          <MenuItem value={"manager"}>Manager View</MenuItem>
          <MenuItem value={"eng"}>Engineer View</MenuItem>
          <MenuItem value={"tech"}>Technician View</MenuItem>
        </Select>
      </Box>
      <Box sx={{ height: "50%", width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 15,
              },
            },
          }}
          pageSizeOptions={[15]}
          disableRowSelectionOnClick
          slots={{
            toolbar: GridToolbar,
          }}
          columnVisibilityModel={{
            name: view !== "manager",
            script: view !== "manager",
            code_line: view !== "manager",
            engineer: view !== "manager",
            technician: view !== "manager",
          }}
        />
      </Box>
    </Container>
  );
}
