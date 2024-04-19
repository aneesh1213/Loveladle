import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './Signup.jsx';
import Signin from './Signin.jsx';
import Appbar from './Appbar.jsx';
import Sidebar from './Sidebar.jsx';
import Landing from './Landing.jsx';
function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      <Router>
        <Appbar onMenuButtonClick={toggleSidebar} /> {/* Pass toggleSidebar as prop */}
        <Sidebar open={isSidebarOpen} onClose={toggleSidebar} /> {/* Pass open state and toggleSidebar as props */}
        <div style={{ marginLeft: isSidebarOpen ? '250px' : '0', transition: 'margin .3s' }}>
          {/* Main content area */}
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
