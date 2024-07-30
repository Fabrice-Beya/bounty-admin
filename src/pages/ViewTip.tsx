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
  const [statusDialogOpen, setStatusDialogOpen] = useState(false);
  const [newPriority, setNewPriority] = useState<TipPriority | ''>('');
  const [newStatus, setNewStatus] = useState<TipStatus | ''>('');
  const [rewardAmount, setRewardAmount] = useState<number>(0);
  //initialise rewardAmount to use tip.amount
  useEffect(() => {
    setRewardAmount(tip?.reward || 0);
  }, [tip]);

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

  // const handlePriorityChange = () => {
  //   setPriorityDialogOpen(true);
  // };

  const handlePriorityChange = async (newPriority: TipPriority) => {
    try {

      const updatedTip = await tipService.updateTip({ id: tip!.id, priority: newPriority });
      setTip(updatedTip);
    } catch (error) {
      console.error('Failed to update priority:', error);
    }
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

  const handleStatusChange = async (newStatus: TipStatus) => {
    try {

      const updatedTip = await tipService.updateTip({ id: tip!.id, status: newStatus });
      setTip(updatedTip);
    } catch (error) {
      console.error('Failed to update priority:', error);
    }
  };

  const handleStatusConfirm = async () => {
    if (!tip || !newStatus) return;
    try {
      const updatedTip = await tipService.updateTip({ id: tip.id, status: newStatus });
      setTip(updatedTip);
      setStatusDialogOpen(false);
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
    <Box sx={{ maxWidth: 1200, margin: 'auto', mt: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h4">Tip ID - {tip.id.substring(0, 6)}</Typography>
            <Box>
              <Button variant="contained" color="primary" onClick={() => navigate(`/tips/edit/${id}`)}>
                Edit Tip
              </Button>
              <Button variant="outlined" color="primary" sx={{ ml: 2 }} onClick={handleRewardAssignment}>
                Update Reward
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
                    <TableCell component="th" scope="row">Status</TableCell>
                    <TableCell>
                      <Select
                        value={tip.status}
                        onChange={(e) => handleStatusChange(e.target.value as TipStatus)}
                      >
                        {Object.values(TipStatus).map((s) => (
                          <MenuItem key={s} value={s}>{s}</MenuItem>
                        ))}
                      </Select>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">Priority</TableCell>
                    <TableCell>
                      <Select
                        value={tip.priority}
                        onChange={(e) => handlePriorityChange(e.target.value as TipPriority)}
                      >
                        {Object.values(TipPriority).map((p) => (
                          <MenuItem key={p} value={p}>{p}</MenuItem>
                        ))}
                      </Select>
                    </TableCell>
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
            // make textfield label more visible
            InputLabelProps={{
              style: { padding: '10px 0px 0px 0px' },
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setRewardDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleRewardConfirm} color="primary">Confirm</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={statusDialogOpen} onClose={() => setStatusDialogOpen(false)}>
        <DialogTitle>Change Status</DialogTitle>
        <DialogContent>
          <Select
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value as TipStatus)}
            fullWidth
          >
            {Object.values(TipStatus).map((status) => (
              <MenuItem key={status} value={status}>
                {status}
              </MenuItem>
            ))}
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setStatusDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleStatusConfirm} color="primary">Confirm</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ViewTip;