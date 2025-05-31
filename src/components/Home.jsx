import React, { useState, useContext, useEffect } from "react";
import { createContext } from "react";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import { Grid, Pagination, Paper, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import LaunchIcon from "@mui/icons-material/Launch";
import { useNavigate } from "react-router-dom";
import Moviedetails from "./Moviedetails";

function Home() {
  const [query, SetQuery] = useState("");
  const [movies, setMovies] = useState();
  const [pagecount, setCount] = useState(1);
  const [loding, setLoading] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState();
  const navigate = useNavigate();

  console.log(query, "query");

  const handleSearch = async () => {
    setMovies();
    setLoading(true);
    try {
      const { data } = await axios.get(
        `http://www.omdbapi.com/?apikey=982ff953&s=${query}&page=${pagecount}`
      );
      console.log(data, "dataaaaa");
      setMovies(data);
      setLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleNavigateMovie = (movie) => {
    navigate("/movie", {
      state: { data: movie },
    });
  };
  console.log(movies, "movies");

  useEffect(() => {
    handleSearch();
  }, [pagecount]);

  return (
    <div style={{ maxWidth: "1200px", padding: "2rem" }}>
      <Grid
        container
        spacing={2}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Grid
          item
          xs={12}
          md={12}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 3,
            width: "100%",
          }}
        >
          <TextField
            id="query"
            label="Search movies here..."
            value={query}
            onChange={(e) => {
              SetQuery(e.target.value);
            }}
          />

          <Button variant="contained" color="primary" onClick={handleSearch}>
            Search
          </Button>

          <Button
            variant="contained"
            color="error"
            onClick={() => {
              SetQuery("");
              setMovies();
            }}
          >
            clear
          </Button>
        </Grid>

        <Grid item xs={12} md={12} sx={{ width: "100%" }}>
          <Paper elevation={3} sx={{ width: "100%", padding: "1rem" }}>
            <Grid container spacing={4} justifyContent="center">
              {movies ? (
                movies?.Response === "True" ? (
                  movies?.Search?.map((movie, index) => (
                    <Grid item sm={3} md={3} sx={{ width: "30%" }} key={index}>
                      <Card sx={{ maxWidth: 300 }} key={index}>
                        {movie?.Poster && (
                          <CardMedia
                            component="img"
                            height="140"
                            image={movie?.Poster}
                            alt={movie.Title}
                          />
                        )}

                        <CardContent>
                          <Typography gutterBottom variant="h5" component="div">
                            {movie.Title || "ABC movie"}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{ color: "text.secondary" }}
                          >
                            {movie.Year}
                          </Typography>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "flex-start",
                              alignItems: "center",
                            }}
                          >
                            <Typography
                              variant="body2"
                              sx={{ color: "text.secondary" }}
                            >
                              Type: {movie.Type}
                            </Typography>

                            <Button size="small">
                              <LaunchIcon
                                onClick={() => handleNavigateMovie(movie)}
                              />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))
                ) : (
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    Movie not found!
                  </Typography>
                )
              ) : (
                <Typography variant="h6" sx={{ color: "text.secondary" }}>
                  Search for a movie
                </Typography>
              )}
            </Grid>
            {movies && movies?.Response === "True" && (
              <div
                style={{
                  display: "flex",
                  position: "relative",
                  width: "100%",
                  height: "100px",
                  marginTop: "1rem",
                }}
              >
                <Pagination
                  count={movies?.totalResults}
                  variant="outlined"
                  page={pagecount}
                  sx={{
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                  onClick={() => setCount(pagecount + 1)}
                />
              </div>
            )}
          </Paper>
        </Grid>
   
      </Grid>
    </div>
  );
}

export default Home;
