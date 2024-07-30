import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box, Typography, Paper, Grid, Button, Select, MenuItem,
  Table, TableBody, TableCell, TableContainer, TableRow,
  CircularProgress, Chip, Dialog, DialogTitle, DialogContent,
  DialogActions, TextField
} from '@mui/material';
import { Bounty, BountyStatus, BountyPriority, BountyCategory } from '../types';
import { bountyService } from '../services/bountyService';

const ViewBounty: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [bounty, setBounty] = useState<Bounty | null>(null);
  const [loading, setLoading] = useState(true);
  const [rewardDialogOpen, setRewardDialogOpen] = useState(false);
  const [rewardAmount, setRewardAmount] = useState<number>(0);

  useEffect(() => {
    const fetchBounty = async () => {
      try {
        const fetchedBounty = await bountyService.getBountyById(id!);
        if (fetchedBounty) {
          setBounty(fetchedBounty);
          setRewardAmount(fetchedBounty.reward);
        }
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch bounty:', error);
        setLoading(false);
      }
    };
    fetchBounty();
  }, [id]);

  const handleStatusChange = async (newStatus: BountyStatus) => {
    try {
      const updatedBounty = await bountyService.updateBounty({ id: id!, status: newStatus });
      setBounty(updatedBounty);
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  const handlePriorityChange = async (newPriority: BountyPriority) => {
    try {
      const updatedBounty = await bountyService.updateBounty({ id: id!, priority: newPriority });
      setBounty(updatedBounty);
    } catch (error) {
      console.error('Failed to update priority:', error);
    }
  };

  const handleCategoryChange = async (newCategory: BountyCategory) => {
    try {
      const updatedBounty = await bountyService.updateBounty({ id: id!, category: newCategory });
      setBounty(updatedBounty);
    } catch (error) {
      console.error('Failed to update category:', error);
    }
  };

  const handleRewardAssignment = () => {
    setRewardDialogOpen(true);
  };

  const handleRewardConfirm = async () => {
    try {
      const updatedBounty = await bountyService.updateBounty({ id: id!, reward: rewardAmount });
      setBounty(updatedBounty);
      setRewardDialogOpen(false);
    } catch (error) {
      console.error('Failed to update reward:', error);
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (!bounty) {
    return <Typography>Bounty not found</Typography>;
  }

  return (
    <Box sx={{ maxWidth: 1200, margin: 'auto', mt: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h4">Bounty ID - {bounty.id.substring(0, 8).toUpperCase()}</Typography>
            <Box>
              <Button variant="contained" color="primary" onClick={() => navigate(`/bounties/edit/${id}`)}>
                Edit Bounty
              </Button>
              <Button variant="outlined" color="primary" sx={{ ml: 2 }} onClick={handleRewardAssignment}>
                Update Reward Budget
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1">
              Status: <Chip label={bounty.status} color="primary" />
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TableContainer component={Paper} variant="outlined">
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell component="th" scope="row">Title</TableCell>
                    <TableCell>{bounty.title}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">Description</TableCell>
                    <TableCell>{bounty.description}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">Reward Budget</TableCell>
                    <TableCell>${bounty.reward}</TableCell>
                  </TableRow>
                 
                  <TableRow>
                    <TableCell component="th" scope="row">Category</TableCell>
                    <TableCell>
                      <Select
                        value={bounty.category}
                        onChange={(e) => handleCategoryChange(e.target.value as BountyCategory)}
                      >
                        {Object.values(BountyCategory).map((c) => (
                          <MenuItem key={c} value={c}>{c}</MenuItem>
                        ))}
                      </Select>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">Status</TableCell>
                    <TableCell>
                      <Select
                        value={bounty.status}
                        onChange={(e) => handleStatusChange(e.target.value as BountyStatus)}
                      >
                        {Object.values(BountyStatus).map((s) => (
                          <MenuItem key={s} value={s}>{s}</MenuItem>
                        ))}
                      </Select>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">Priority</TableCell>
                    <TableCell>
                      <Select
                        value={bounty.priority}
                        onChange={(e) => handlePriorityChange(e.target.value as BountyPriority)}
                      >
                        {Object.values(BountyPriority).map((p) => (
                          <MenuItem key={p} value={p}>{p}</MenuItem>
                        ))}
                      </Select>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">Created At</TableCell>
                    <TableCell>{new Date(bounty.createdAt).toLocaleString()}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">Expires At</TableCell>
                    <TableCell>{bounty.expiresAt ? new Date(bounty.expiresAt).toLocaleString() : 'N/A'}</TableCell>
                  </TableRow>
                  {/* <TableRow>
                    <TableCell component="th" scope="row">Created By</TableCell>
                    <TableCell>{bounty.}</TableCell>
                  </TableRow> */}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Paper>

      <Dialog open={rewardDialogOpen} onClose={() => setRewardDialogOpen(false)}>
        <DialogTitle>Update Reward Budget</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Reward Amount"
            type="number"
            fullWidth
            value={rewardAmount}
            onChange={(e) => setRewardAmount(Number(e.target.value))}
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

export default ViewBounty;