import './App.css';
import Start from './pages/Start';
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from './pages/SignUp/SignUp';
import Login from './pages/Login/Login';
import ForgotPassword from './pages/ForgotPassword';
import Dashboard from './pages/Dashboard/Dashboard';
import MatchList from './pages/MatchList/MatchList';
import MyMatches from './pages/MyMatches/MyMatches';
import TournamentList from './pages/TournamentList/TournamentList';
import MyTournament from './pages/MyTournament/MyTournament';
import TeamsList from './pages/TeamList/TeamsList';
import NotificationPage from './pages/NotificationPage';
import MatchSetup from './pages/MatchSetup/matchSetup';
import Settings from './pages/Settings/settings';
import TeamProfile from './pages/TeamProfile/teamProfile';
import TournamentSetup from './pages/TournamentSetup/tournamentSetup';
import FollowingTeams from './pages/FollowingTeams/followingTeams';
import MatchesHistory from './pages/MatchesHistory/MatchesHistory';
import ManageCities from './pages/ManageCities';
import ManageFormats from './pages/ManageFormats';
import ManageLocations from './pages/ManageLocations';
import MatchDetails from './pages/MatchDetails/MatchDetails';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute'
function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Start />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />

            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path='/matches/list' element={<ProtectedRoute><MatchList /></ProtectedRoute>} />
            <Route path='/matches/upcoming-matches' element={<ProtectedRoute><MyMatches /></ProtectedRoute>} />
            <Route path='/matches/matches-history' element={<ProtectedRoute><MatchesHistory /></ProtectedRoute>} />
            <Route path='/tournament/list' element={<ProtectedRoute><TournamentList /></ProtectedRoute>} />
            <Route path='/tournament/my-tournaments' element={<ProtectedRoute><MyTournament /></ProtectedRoute>} />
            <Route path='/teams/list' element={<ProtectedRoute><TeamsList /></ProtectedRoute>} />
            <Route path='/notifications' element={<ProtectedRoute><NotificationPage /></ProtectedRoute>} />
            <Route path='/matches/match-setup' element={<ProtectedRoute><MatchSetup /></ProtectedRoute>} />
            <Route path='/settings' element={<ProtectedRoute><Settings /></ProtectedRoute>} />
            <Route path='/tournament/tournament-setup' element={<ProtectedRoute><TournamentSetup /></ProtectedRoute>} />
            <Route path="/team/:id" element={<ProtectedRoute><TeamProfile /></ProtectedRoute>} />
            <Route path="/teams/following-teams" element={<ProtectedRoute><FollowingTeams /></ProtectedRoute>} />
            <Route path="/manage-cities" element={<ProtectedRoute><ManageCities /></ProtectedRoute>} />
            <Route path="/manage-formats" element={<ProtectedRoute><ManageFormats /></ProtectedRoute>} />
            <Route path="/manage-locations" element={<ProtectedRoute><ManageLocations /></ProtectedRoute>} />
            <Route path="/match-detail/:id" element={<ProtectedRoute><MatchDetails /></ProtectedRoute>} />

          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
