import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box, Typography, Paper, Grid, Button, Select, MenuItem,
  Table, TableBody, TableCell, TableContainer, TableRow,
  CircularProgress, Chip, Dialog, DialogTitle, DialogContent,
  DialogActions, TextField
} from '@mui/material';
import { Tip, TipStatus, TipCategory, TipPriority } from '../types';
import { tipService } from '../services/tipService';

const ViewTip: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [tip, setTip] = useState<Tip | null>(null);
  const [loading, setLoading] = useState(true);
  const [priorityDialogOpen, setPriorityDialogOpen] = useState(false);
  const [rewardDialogOpen, setRewardDialogOpen] = useState(false);
  const [newPriority, setNewPriority] = useState<TipPriority | ''>('');
  const [rewardAmount, setRewardAmount] = useState<number>(0);

  useEffect(() => {
    const fetchTip = async () => {
      if (!id) return;
      try {
        const fetchedTip = await tipService.getTipById(id);
        setTip(fetchedTip);
      } catch (error) {
        console.error('Failed to fetch tip:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTip();
  }, [id]);

  const handlePriorityChange = () => {
    setPriorityDialogOpen(true);
  };

  const handlePriorityConfirm = async () => {
    if (!tip || !newPriority) return;
    try {
      const updatedTip = await tipService.updateTip({ id: tip.id, priority: newPriority });
      setTip(updatedTip);
      setPriorityDialogOpen(false);
    } catch (error) {
      console.error('Failed to update priority:', error);
    }
  };

  const handleRewardAssignment = () => {
    setRewardDialogOpen(true);
  };

  const handleRewardConfirm = async () => {
    if (!tip) return;
    try {
      const updatedTip = await tipService.updateTip({ id: tip.id, reward: rewardAmount });
      setTip(updatedTip);
      setRewardDialogOpen(false);
    } catch (error) {
      console.error('Failed to update reward:', error);
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (!tip) {
    return <Typography>Tip not found</Typography>;
  }

  return (
    <Box sx={{ maxWidth: 1200, margin: 'auto', mt: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h4">Tip ID - {tip.id}</Typography>
            <Box>
              <Button variant="contained" color="primary" onClick={() => navigate(`/tips/edit/${id}`)}>
                Edit Tip
              </Button>
              <Button variant="outlined" color="primary" sx={{ ml: 2 }} onClick={handlePriorityChange}>
                Change Priority
              </Button>
              <Button variant="outlined" color="primary" sx={{ ml: 2 }} onClick={handleRewardAssignment}>
                Assign Reward
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1">
              Status: <Chip label={tip.status} color="primary" />
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1">
              Priority: <Chip label={tip.priority} color="secondary" />
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TableContainer>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell><strong>Title</strong></TableCell>
                    <TableCell>{tip.title}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell><strong>Description</strong></TableCell>
                    <TableCell>{tip.description}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell><strong>Category</strong></TableCell>
                    <TableCell>{tip.category}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell><strong>Date/Time</strong></TableCell>
                    <TableCell>{new Date(tip.datetime).toLocaleString()}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell><strong>Location</strong></TableCell>
                    <TableCell>{tip.location}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell><strong>Reward</strong></TableCell>
                    <TableCell>${tip.reward}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Paper>

      <Dialog open={priorityDialogOpen} onClose={() => setPriorityDialogOpen(false)}>
        <DialogTitle>Change Priority</DialogTitle>
        <DialogContent>
          <Select
            value={newPriority}
            onChange={(e) => setNewPriority(e.target.value as TipPriority)}
            fullWidth
          >
            {Object.values(TipPriority).map((priority) => (
              <MenuItem key={priority} value={priority}>
                {priority}
              </MenuItem>
            ))}
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPriorityDialogOpen(false)}>Cancel</Button>
          <Button onClick={handlePriorityConfirm} color="primary">Confirm</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={rewardDialogOpen} onClose={() => setRewardDialogOpen(false)}>
        <DialogTitle>Assign Reward</DialogTitle>
        <DialogContent>
          <TextField
            label="Reward Amount"
            type="number"
            value={rewardAmount}
            onChange={(e) => setRewardAmount(Number(e.target.value))}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setRewardDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleRewardConfirm} color="primary">Confirm</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ViewTip;