import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  CircularProgress,
  Alert,
  Box,
} from "@mui/material";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const JobForm = ({ editMode = false }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  // Fetch job data for editing
  useEffect(() => {
    if (editMode && id) {
      const fetchJob = async () => {
        setLoading(true);
        setError("");
        const token = localStorage.getItem("token");
        try {
          const response = await axios.get(`http://localhost:3004/api/job/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setTitle(response?.data?.data?.title || "");
          setDescription(response?.data?.data?.description || "");
        } catch (error) {
          setError("Failed to load job data");
        } finally {
          setLoading(false);
        }
      };
      fetchJob();
    }
  }, [editMode, id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const token = localStorage.getItem("token");

    if (!title || !description) {
      setError("Both title and description are required.");
      setLoading(false);
      return;
    }

    try {
      if (editMode) {
        await axios.put(
          `http://localhost:3004/api/job/${id}`,
          {
            title,
            description,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        await axios.post(
          "http://localhost:3004/api/job",
          {
            title,
            description,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }
      navigate("/");
    } catch (error) {
      console.log("🚀 ~ handleSubmit ~ error:", error);
      setError(editMode ? "Failed to update job" : "Failed to create job");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        {editMode ? "Edit Job" : "Create Job"}
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          fullWidth
          margin="normal"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={loading}
          required
        />
        <TextField
          label="Description"
          fullWidth
          margin="normal"
          multiline
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={loading}
          required
        />
        <Box sx={{ mt: 3, textAlign: "center" }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
            sx={{ padding: "10px 20px" }}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : editMode ? (
              "Update"
            ) : (
              "Submit"
            )}
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default JobForm;
