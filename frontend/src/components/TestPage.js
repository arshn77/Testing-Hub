import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Box,
} from "@mui/material";
import { progressColors } from "../utils/progressColors";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { useNavigate } from "react-router-dom";

export default function TestPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [test, setTest] = useState({});

  const exampleTest = {
    name: "Test Name",
    program: "Test Program",
    script: "Test Script",
    progress: "Not Started",
    code_line: 0,
    engineer: "Engineer Name",
    technician: "Technician Name",
    start_date: new Date(),
    end_date: null,
    fail_date: null,
  };

  useEffect(() => {
    fetch(`/api/test-page/${id}`)
      .then((response) => response.json())
      .then((data) => setTest(data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <Container maxWidth="md">
      <Box position="relative">
        <Button
          variant="contained"
          color="inherit"
          onClick={() => navigate("/")}
          sx={{
            position: "absolute",
            left: 0,
            minWidth: 0,
            width: 55,
            aspectRatio: "1/1",
            top: "50%",
            transform: "translateY(-50%)",
          }}
        >
          <ArrowBackIcon fontSize="medium" />
        </Button>
        <Typography
          variant="h2"
          component="h1"
          gutterBottom
          style={{ marginTop: 16 }}
          align="center"
        >
          {test.name}
        </Typography>
      </Box>
      <Card>
        <CardContent>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={12}>
              <Typography
                variant="h5"
                align="center"
                style={{ fontWeight: "bold" }}
              >
                {test.program}
              </Typography>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Typography variant="h6">Script:</Typography>
              <Typography>{test.script}</Typography>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Typography variant="h6">Code Line:</Typography>
              <Typography>{test.code_line}</Typography>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Typography variant="h6">Progress:</Typography>
              <Typography style={{ color: progressColors[test.progress] }}>
                {test.progress}
              </Typography>
            </Grid>
            {/* Conditionally rendering fail date */}
            {test.fail_date ? (
              <Grid item xs={6} sm={3}>
                <Typography variant="h6">Fail Date:</Typography>
                <Typography>
                  {new Date(test.fail_date).toLocaleString()}
                </Typography>
              </Grid>
            ) : (
              <Grid item xs={6} sm={3}></Grid>
            )}
            <Grid item xs={6} sm={3}>
              <Typography variant="h6">Engineer:</Typography>
              <Typography>{test.engineer}</Typography>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Typography variant="h6">Technician:</Typography>
              <Typography>{test.technician}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}></Grid>
            <Grid item xs={6} sm={3}>
              <Typography variant="h6">Start Date:</Typography>
              <Typography>
                {test.start_date
                  ? new Date(test.start_date).toLocaleString()
                  : ""}
              </Typography>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Typography variant="h6">End Date:</Typography>
              <Typography>
                {test.end_date
                  ? new Date(test.end_date).toLocaleString()
                  : "N/A"}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
}
