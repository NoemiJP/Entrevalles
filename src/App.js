import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import ExperiencePage from './pages/ExperiencePage/ExperiencePage';
import DiscoverPage from './pages/DiscoverPage/DiscoverPage';
import AccessPage from './pages/AccessPage/AccessPage';
import ExperienciesDetail from './pages/ExperienciesDetail/ExperienciesDetail';
import NewUser from './pages/NewUser/NewUser';
import NewPass from './pages/NewPass/NewPass';
import ConfirmPayment from './pages/ConfirmPayment/ConfirmPayment';
import { UserProvider } from './components/Usuario/UserProvider';
import ActivitiesPage from './pages/ActivitiesPage/ActivitiesPage';
import ActivitiesDetail from './pages/ActivitiesDetail/ExperienciesDetail/ActivitiesDetail';
import AdminPage from './pages/AdminPage/AdminPage';
import Bookings from './pages/bookings/Bookings';

function App() {
  return (
    <UserProvider>
    <Router>
      <Routes>
        <Route exact path="/" element={<HomePage/>} />
        <Route exact path="/digs" element={<ExperiencePage/>} />
        <Route exact path="/experiencies/:id" element={<ExperienciesDetail/>} />
        <Route exact path="/activities" element={<ActivitiesPage/>} />
        <Route exact path="/activities/:id" element={<ActivitiesDetail/>} />
        <Route exact path="/discover" element={<DiscoverPage/>} />
        <Route exact path="/access" element={<AccessPage/>} />
        <Route exact path="/newuser" element={<NewUser/>} />
        <Route exact path="/newpass" element={<NewPass/>} />
        <Route exact path="/bookings" element={<Bookings/>} />
        <Route exact path="/confirmPayment/:reservaId/:userId" element={<ConfirmPayment/>} />
        <Route exact path="/admin" element={<AdminPage/>} />
      </Routes>
    </Router>
    </UserProvider>
  );
}

export default App;
