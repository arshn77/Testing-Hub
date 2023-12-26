import React from "react";
import { useParams } from "react-router-dom";

export default function TestPage() {
  const { id } = useParams();
  return (
    <Grid container xs={12} spacing={1} align="center">
      <Grid item></Grid>
    </Grid>
  );
}
