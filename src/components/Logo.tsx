import React from 'react';
import { Link } from 'react-router-dom';
import { Box } from '@mui/material';

const Logo: React.FC = () => {
  return (
    <Link to="/dashboard" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
      <Box
        component="img"
        sx={{
          height: 30,
          width: 'auto',
          borderRadius: '50%',
          maxHeight: { xs: 30, md: 40 },
          maxWidth: { xs: 30, md: 40 },
          mr: 2,
          filter: 'brightness(0) invert(1)',
        }}
        alt="Logo"
        src="/logo.svg"
      />
    </Link>
  );
};

export default Logo;