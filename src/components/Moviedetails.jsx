import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActions from '@mui/material/CardActions';
import Button from "@mui/material/Button";
import { Grid, Pagination, Paper, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
function Moviedetails() {
  const location = useLocation();
  const data = location.state.data;

  console.log(data, "data");

  return(
  <Card key={data.imdbID} sx={{ width: "1000px", padding: "20px" , marginTop:"20px", background:"#d9d3d3"}}>
    {data?.Poster && (
      <CardMedia
        component="img"
        height="350px"
        width="100%"
        image={data?.Poster}
        alt={data.Title}
        object-fit="cover"
      />
    )}

    <CardContent>
      <Typography gutterBottom variant="h5" component="div">
        {data.Title || "ABC movie"}
      </Typography>
      <Typography variant="body2" sx={{ color: "text.secondary" }}>
        {data.Year}
      </Typography>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          Type: {data.Type}
        </Typography>
          <Button size="small" color="error" variant="contained" >Watch Now</Button>
      </div>
    </CardContent>
  </Card>)
}

export default Moviedetails;
