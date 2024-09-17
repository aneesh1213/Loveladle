import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './components/USER/Signup.jsx';
import Signin from './components/USER/Signin.jsx';
import RegisterNgo from './components/NGO/RegisterNgo.jsx';
import NgoLogin from './components/NGO/ngoLogin.jsx'; // Import your NGO login component
import Appbar from './Appbar.jsx';
import Sidebar from './Sidebar.jsx';
import Choice from './choicePage.jsx';
import Connect from './components/USER/ConnectNgo.jsx';
import Donate from './components/USER/Donate.jsx';
import { RecoilRoot } from 'recoil';
import Landing from './Landing.jsx';
import UserConnect from './components/NGO/userConnect.jsx';
import { useNavigate, useLocation } from 'react-router-dom';


function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation()
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const isChoicePage = location.pathname === '/';
  return (
    <div>
      <RecoilRoot>

        {!isChoicePage && (
          <>
            <Appbar onMenuButtonClick={toggleSidebar} /> {/* Pass toggleSidebar as prop */}
            <Sidebar open={isSidebarOpen} onClose={toggleSidebar} /> {/* Pass open state and toggleSidebar as props */}
          </>
        )}
        <div style={{ marginLeft: isSidebarOpen && !isChoicePage ? '250px' : '0', transition: 'margin .3s' }}>
          <Routes>
            <Route path="/" element={<Choice />} />
            <Route path="/landing" element={<Landing />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/register" element={<RegisterNgo />} /> {/* NGO Registration */}
            <Route path="/ngologin" element={<NgoLogin />} /> {/* NGO Login */}
            <Route path="/donate" element={<Donate />} />
            <Route path="/connect/:ngoId" element={<Connect />} />
            <Route path="/userconnect/:ngoId" element={<UserConnect />} />
          </Routes>
        </div>

      </RecoilRoot>
    </div>
  );
}

export default App;
