import './App.css';
import Home from './Pages/Home/home';
import BusRoutes from './Pages/BusRoutes/BusRoutes';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/BusRoutes" element={<BusRoutes />} />
      </Routes>
    </Router>
  );
}

export default App;
