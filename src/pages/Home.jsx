import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Button,
  Box,
  CircularProgress,
  Alert,
} from "@mui/material";
import JobCard from "../components/JobCard";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchJobs = async () => {
    setLoading(true);
    setError(null);
    const token = localStorage.getItem("token");

    try {
      const res = await axios.get("http://localhost:3004/api/job", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setJobs(res?.data?.data || []);
    } catch (err) {
      console.error("Failed to fetch jobs:", err);
      setError("Unable to load job listings. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <Container sx={{ mt: 4 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          mb: 3,
        }}
      >
        <Typography variant="h4" fontWeight={600}>
          Job Listings
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/create-job")}
          sx={{ mt: { xs: 2, sm: 0 } }}
        >
          Post New Job
        </Button>
      </Box>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : jobs.length === 0 ? (
        <Typography variant="body1" color="text.secondary">
          No jobs available. Start by posting one.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {jobs.map((job) => (
            <Grid item xs={12} sm={6} md={4} key={job._id}>
              <JobCard job={job} onRefresh={fetchJobs} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default Home;
