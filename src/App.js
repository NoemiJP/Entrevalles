import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import ExperiencePage from './pages/ExperiencePage/ExperiencePage';
import DigsPage from './pages/DigsPage/DigsPage';
import DiscoverPage from './pages/DiscoverPage/DiscoverPage';
import AccessPage from './pages/AccessPage/AccessPage';


function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<HomePage/>} />
        <Route exact path="/experiencies" element={<ExperiencePage/>} />
        <Route exact path="/digs" element={<DigsPage/>} />
        <Route exact path="/discover" element={<DiscoverPage/>} />
        <Route exact path="/access" element={<AccessPage/>} />
      </Routes>
    </Router>
  );
}

export default App;
