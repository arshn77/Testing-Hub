import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import { Container, Typography } from "@mui/material";

// We may be able to get column fields to also fetch from API
const columns = [
  {
    field: "type",
    headerName: "Test Type",
    width: 150,
  },
  {
    field: "progress",
    headerName: "Progress",
    width: 150,
  },
  {
    field: "date_started",
    headerName: "Date Started",
    renderCell: (params) => new Date(params.value).toLocaleDateString(),
    // Not sure if this will sort correctly
    // I think renderCell renders a react element where you can add extra html
    // while valueFormatter just formats the string value?
  },
  {
    field: "date_ended",
    headerName: "Date Ended",
    renderCell: (params) => new Date(params.value).toLocaleDateString(),
  },
];

export default function TestList() {
  const [rows, setRows] = useState([]); // Should initial state be null?

  // Fetching data for datagrid

  useEffect(() => {
    fetch("/api/test-list/")
      .then((response) => response.json())
      .then((data) => setRows(data))
      .catch((error) => console.log("Error"));
  });

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
    <Container style={{ marginTop: 20, height: "180vh" }}>
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
        />
      </Box>
    </Container>
  );
}
