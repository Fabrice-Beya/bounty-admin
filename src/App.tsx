import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import theme from './utils/theme';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import BountyManagement from './pages/BountyManagement';
import TipManagement from './pages/TipManagement';
import UserProfile from './pages/UserProfile';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Toolbar from './components/Toolbar';
import SideMenu from './components/SideMenu';
import CreateBounty from './pages/CreateBounty';
import EditBounty from './pages/EditBounty';
import ViewBounty from './pages/ViewBounty';
import CreateTip from './pages/CreateTip';
import ViewTip from './pages/ViewTip';
import EditTip from './pages/EditTip';


function AppContent() {
  const location = useLocation();
  const isAuthPage = ['/login', '/register'].includes(location.pathname);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Toolbar />
      <Box sx={{ display: 'flex', flexGrow: 1 }}>
        {!isAuthPage && <SideMenu />}
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<PrivateRoute />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/bounties" element={<BountyManagement />} />
              <Route path="/bounties/create" element={<CreateBounty />} />
              <Route path="/bounties/edit/:id" element={<EditBounty />} />
              <Route path="/bounties/view/:id" element={<ViewBounty />} />
              <Route path="/tips" element={<TipManagement />} />
              <Route path="/tips/create" element={<CreateTip />} />
              <Route path="/tips/edit/:id" element={<EditTip />} />
              <Route path="/tips/view/:id" element={<ViewTip />} />
              <Route path="/profile" element={<UserProfile />} />
            </Route>
          </Routes>
        </Box>
      </Box>
    </Box>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;