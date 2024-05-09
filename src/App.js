import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import ExperiencePage from './pages/ExperiencePage/ExperiencePage';
import DigsPage from './pages/DigsPage/DigsPage';
import DiscoverPage from './pages/DiscoverPage/DiscoverPage';
import AccessPage from './pages/AccessPage/AccessPage';
import ExperienciesDetail from './pages/ExperienciesDetail/ExperienciesDetail';
import NewUser from './pages/NewUser/NewUser';


function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<HomePage/>} />
        <Route exact path="/digs" element={<ExperiencePage/>} />
        <Route exact path="/experiencies/:id" element={<ExperienciesDetail/>} />
        <Route exact path="/experiences" element={<DigsPage/>} />
        <Route exact path="/discover" element={<DiscoverPage/>} />
        <Route exact path="/access" element={<AccessPage/>} />
        <Route exact path="/newuser" element={<NewUser/>} />
        
        
      </Routes>
    </Router>
  );
}

export default App;
