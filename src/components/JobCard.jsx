import React from "react";
import { Card, CardContent, Typography, Button, Box, Chip } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';

const JobCard = ({ job, onRefresh }) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    const token = localStorage.getItem("token");

    try {
      await axios.delete(`https://job-backend-api-production.up.railway.app/api/job/${job._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      onRefresh(); // Refresh job list after deletion
    } catch (error) {
      console.error("Failed to delete job:", error);
      alert("Failed to delete job");
    }
  };

  const handleEdit = () => {
    navigate(`/edit-job/${job._id}`);
  };

  return (
    <Card
      sx={{
        borderRadius: 2,
        boxShadow: '0 3px 10px rgba(0,0,0,0.08)',
        backgroundColor: '#fff',
        transition: 'all 0.3s ease-in-out',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 6px 15px rgba(0,0,0,0.12)',
        },
        p: 1,
      }}
    >
      <CardContent sx={{ padding: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <WorkOutlineIcon sx={{ color: '#1976d2', fontSize: 24 }} />
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              color: '#1a237e',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {job.title}
          </Typography>
        </Box>
        <Typography
          variant="body2"
          sx={{
            color: '#455a64',
            mb: 2,
            lineHeight: 1.6,
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {job.description}
        </Typography>
        {job.status && (
          <Chip
            label={job.status}
            size="small"
            sx={{
              mb: 2,
              backgroundColor: job.status === 'Open' ? '#e8f5e9' : '#ffebee',
              color: job.status === 'Open' ? '#2e7d32' : '#c62828',
              fontWeight: 500,
            }}
          />
        )}
        <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
          <Button
            variant="contained"
            color="error"
            onClick={handleDelete}
            sx={{
              borderRadius: '12px',
              textTransform: 'none',
              px: 2,
              py: 0.5,
              fontWeight: 500,
              '&:hover': {
                backgroundColor: '#d32f2f',
                transform: 'translateY(-1px)',
              },
              transition: 'all 0.2s ease',
            }}
          >
            Delete
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleEdit}
            sx={{
              borderRadius: '12px',
              textTransform: 'none',
              px: 2,
              py: 0.5,
              fontWeight: 500,
              '&:hover': {
                backgroundColor: 'rgba(25, 118, 210, 0.04)',
                borderColor: '#1565c0',
                transform: 'translateY(-1px)',
              },
              transition: 'all 0.2s ease',
            }}
          >
            Edit
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default JobCard;