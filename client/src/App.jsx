import { Routes, Route } from 'react-router-dom';

import Admin from './screens/Admin';
import Vote from './screens/Vote';
import Navbar from './components/Navbar';
import Login from './screens/Login';

function App() {
  return (
    <div className="App">
      <div>
        <Routes>
            <Route path="/login" element={<div></div>} />
            <Route path="/*" element={<Navbar />} />
        </Routes>
      </div>

      <div>
      <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/vote" element={<Vote />} />
            <Route path="/home" element={<Admin />} />
        </Routes>
      </div>

    </div>
  );
}

export default App;
