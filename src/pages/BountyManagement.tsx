import React, { useState, useEffect } from 'react';
import { 
  Typography, TextField, Box, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, Paper, IconButton,
  Select, MenuItem, InputLabel, FormControl, Button
} from '@mui/material';
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { bountyService } from '../services/bountyService';
import { Bounty, BountyStatus, BountyPriority } from '../types';

const BountyManagement: React.FC = () => {
  const [bounties, setBounties] = useState<Bounty[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');

  useEffect(() => {
    const fetchBounties = async () => {
      const fetchedBounties = await bountyService.getAllBounties();
      setBounties(fetchedBounties);
    };
    fetchBounties();
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredBounties = bounties.filter(bounty => 
    bounty.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (categoryFilter === '' || bounty.category === categoryFilter) &&
    (priorityFilter === '' || bounty.priority === priorityFilter)
  );

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h4" gutterBottom>Bounty Management</Typography>
        <Button
          component={Link}
          to="/bounties/create"
          variant="contained"
          color="primary"
        >
          Create Bounty
        </Button>
      </Box>
      
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <TextField
          label="Search by Name"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearch}
          sx={{ flexGrow: 1 }}
        />
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Category</InputLabel>
          <Select
            value={categoryFilter}
            label="Category"
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="software">Software</MenuItem>
            <MenuItem value="content">Content</MenuItem>
            <MenuItem value="research">Research</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Priority</InputLabel>
          <Select
            value={priorityFilter}
            label="Priority"
            onChange={(e) => setPriorityFilter(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value={BountyPriority.Low}>Low</MenuItem>
            <MenuItem value={BountyPriority.Medium}>Medium</MenuItem>
            <MenuItem value={BountyPriority.High}>High</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Reward</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Priority</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredBounties.map((bounty) => (
              <TableRow key={bounty.id}>
                <TableCell>{bounty.id}</TableCell>
                <TableCell>{bounty.title}</TableCell>
                <TableCell>${bounty.reward}</TableCell>
                <TableCell>{bounty.status}</TableCell>
                <TableCell>{bounty.category}</TableCell>
                <TableCell>{bounty.priority}</TableCell>
                <TableCell>
            <IconButton component={Link} to={`/bounties/view/${bounty.id}`}>
              <VisibilityIcon />
            </IconButton>
            <IconButton component={Link} to={`/bounties/edit/${bounty.id}`}>
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => console.log('Delete', bounty.id)}>
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

export default BountyManagement;