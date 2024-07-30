import React from 'react';
import { Link } from 'react-router-dom';
import { Box } from '@mui/material';

const Logo: React.FC = () => {
  return (
    <Link to="/dashboard" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
      <Box
        component="img"
        sx={{
          height: 40,
          width: 'auto',
          borderRadius: '50%',
          maxHeight: { xs: 40, md: 50 },
          maxWidth: { xs: 40, md: 50 },
          mr: 2
        }}
        alt="Logo"
        src="/logo.svg"
      />
    </Link>
  );
};

export default Logo;