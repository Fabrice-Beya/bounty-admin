import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Typography, TextField, Box, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper, IconButton,
  Button, Select, MenuItem, FormControl, InputLabel
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { tipService } from '../services/tipService';
import { Tip, TipStatus, TipCategory } from '../types';

const TipManagement: React.FC = () => {
  const [tips, setTips] = useState<Tip[]>([]);
  const [filteredTips, setFilteredTips] = useState<Tip[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<TipStatus | 'All'>('All');
  const [categoryFilter, setCategoryFilter] = useState<TipCategory | 'All'>('All');

  useEffect(() => {
    const fetchTips = async () => {
      const fetchedTips = await tipService.getAllTips();
      setTips(fetchedTips);
      setFilteredTips(fetchedTips);
    };
    fetchTips();
  }, []);

  useEffect(() => {
    const filtered = tips.filter(tip =>
      tip.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (statusFilter === 'All' || tip.status === statusFilter) &&
      (categoryFilter === 'All' || tip.category === categoryFilter)
    );
    setFilteredTips(filtered);
  }, [searchTerm, statusFilter, categoryFilter, tips]);

  const handleDelete = async (id: string) => {
    await tipService.deleteTip(id);
    setTips(tips.filter(tip => tip.id !== id));
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h4" gutterBottom>Tip Management</Typography>
        <Button component={Link} to="/tips/create" variant="contained" color="primary">
          Create Tip
        </Button>
      </Box>

      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <TextField
          label="Search Tips"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as TipStatus | 'All')}
            label="Status"
          >
            <MenuItem value="All">All</MenuItem>
            {Object.values(TipStatus).map((status) => (
              <MenuItem key={status} value={status}>{status}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Category</InputLabel>
          <Select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value as TipCategory | 'All')}
            label="Category"
          >
            <MenuItem value="All">All</MenuItem>
            {Object.values(TipCategory).map((category) => (
              <MenuItem key={category} value={category}>{category}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Priority</TableCell>
              <TableCell>Reward</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTips.map((tip) => (
              <TableRow key={tip.id}>
                <TableCell>{tip.title}</TableCell>
                <TableCell>{tip.category}</TableCell>
                <TableCell>{tip.status}</TableCell>
                <TableCell>{tip.priority}</TableCell>
                <TableCell>${tip.reward}</TableCell>
                <TableCell>{new Date(tip.datetime).toLocaleString()}</TableCell>
                <TableCell>
                  <IconButton component={Link} to={`/tips/view/${tip.id}`}>
                    <VisibilityIcon />
                  </IconButton>
                  <IconButton component={Link} to={`/tips/edit/${tip.id}`}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(tip.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TipManagement;