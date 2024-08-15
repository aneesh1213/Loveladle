import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './Signup.jsx';
import Signin from './Signin.jsx';
import Register from './RegisterNgo.jsx';
import Appbar from './Appbar.jsx';
import Sidebar from './Sidebar.jsx';
import Landing from './Landing.jsx';
import Connect from './ConnectNgo.jsx';
import { useNavigate } from 'react-router-dom';
import Donate from './Donate.jsx';
import { RecoilRoot } from 'recoil';


function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      <RecoilRoot>
      <Router>
        <Appbar onMenuButtonClick={toggleSidebar} /> {/* Pass toggleSidebar as prop */}
        <Sidebar open={isSidebarOpen} onClose={toggleSidebar} /> {/* Pass open state and toggleSidebar as props */}
        <div style={{ marginLeft: isSidebarOpen ? '250px' : '0', transition: 'margin .3s' }}>
          {/* Main content area */}
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/register" element={<Register />} />
            <Route path="/donate" element={<Donate />} />
            <Route path="/connect/:ngoId" element={<Connect />} />
          </Routes>
        </div>
      </Router>
      </RecoilRoot>
    </div>
  );
}

export default App;
