import './App.css';
import Start from './pages/Start';
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import Dashboard from './pages/Dashboard';
import MatchList from './pages/MatchList';
import MyMatches from './pages/MyMatches';
import TournamentList from './pages/TournamentList';
import MyTournament from './pages/MyTournament';
import TeamsList from './pages/TeamsList';
import NotificationPage from './pages/NotificationPage';
import MatchSetup from './pages/matchSetup';
import Settings from './pages/settings';
import TeamProfile from './pages/teamProfile';
import TournamentSetup from './pages/tournamentSetup';
import FollowingTeams from './pages/followingTeams';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Start />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path='/matches/list' element={<MatchList />} />
          <Route path='/matches/my-matches' element={<MyMatches />} />
          <Route path='/tournament/list' element={<TournamentList />} />
          <Route path='/tournament/my-tournaments' element={<MyTournament />} />
          <Route path='/teams/list' element={<TeamsList />} />
          <Route path='/notifications' element={<NotificationPage />} />
          <Route path='/matches/match-setup' element={<MatchSetup />} />
          <Route path='/settings' element={<Settings />} />
          <Route path='/tournament/tournament-setup' element={< TournamentSetup />} />
          <Route path="/team/:teamId" element={<TeamProfile />} />
          <Route path="/teams/following-teams" element={<FollowingTeams />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
