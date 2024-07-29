import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box, Typography, Paper, Grid, Button, Select, MenuItem,
  Table, TableBody, TableCell, TableContainer, TableRow,
  CircularProgress, Chip
} from '@mui/material';
import { Tip, TipStatus } from '../types';
import { tipService } from '../services/tipService';

const ViewTip: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [tip, setTip] = useState<Tip | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTip = async () => {
      if (!id) return;
      try {
        const fetchedTip = await tipService.getTipById(id);
        setTip(fetchedTip || null);
      } catch (error) {
        console.error('Failed to fetch tip:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTip();
  }, [id]);

  const handleStatusChange = async (newStatus: TipStatus) => {
    if (!tip || !id) return;
    try {
      const updatedTip = await tipService.updateTip({ id, status: newStatus });
      if (updatedTip) setTip(updatedTip);
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (!tip) {
    return <Typography>Tip not found</Typography>;
  }

  return (
    <Box sx={{ maxWidth: 800, margin: 'auto', mt: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h4">Tip ID - {tip.id}</Typography>
            <Button variant="contained" color="primary" onClick={() => navigate(`/tips/edit/${id}`)}>
              Edit Tip
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1">
              Status: <Chip label={tip.status} color="primary" />
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} display="flex" justifyContent="flex-end">
            <Select
              value={tip.status}
              onChange={(e) => handleStatusChange(e.target.value as TipStatus)}
              sx={{ width: 200 }}
            >
              {Object.values(TipStatus).map((s) => (
                <MenuItem key={s} value={s}>{s}</MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={12}>
            <TableContainer component={Paper} variant="outlined">
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell component="th" scope="row">Title</TableCell>
                    <TableCell>{tip.title}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">Description</TableCell>
                    <TableCell>{tip.description}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">Category</TableCell>
                    <TableCell>{tip.category}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">Date/Time</TableCell>
                    <TableCell>{new Date(tip.datetime).toLocaleString()}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">Location</TableCell>
                    <TableCell>{tip.location}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">Created At</TableCell>
                    <TableCell>{new Date(tip.createdAt).toLocaleString()}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">Updated At</TableCell>
                    <TableCell>{new Date(tip.updatedAt).toLocaleString()}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default ViewTip;