import { Routes, Route } from 'react-router-dom';

import CandidateForm from './screens/CandidateForm';
import Home from './screens/Home';
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
            <Route path="/home" element={<Home />} />
            <Route path="/add" element={<CandidateForm />} />
        </Routes>
      </div>

    </div>
  );
}

export default App;
