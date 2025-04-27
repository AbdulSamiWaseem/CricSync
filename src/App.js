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
import TeamsProfile from './pages/TeamsProfile/TeamsProfile';
import MatchDetails from './pages/MatchDetails/MatchDetails';

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
          <Route path='/matches/upcoming-matches' element={<MyMatches />} />
          <Route path='/matches/matches-history' element={<MatchesHistory />} />
          <Route path='/tournament/list' element={<TournamentList />} />
          <Route path='/tournament/my-tournaments' element={<MyTournament />} />
          <Route path='/teams/list' element={<TeamsList />} />
          <Route path='/notifications' element={<NotificationPage />} />
          <Route path='/matches/match-setup' element={<MatchSetup />} />
          <Route path='/settings' element={<Settings />} />
          <Route path='/tournament/tournament-setup' element={< TournamentSetup />} />
          <Route path="/team/:teamId" element={<TeamProfile />} />
          <Route path="/teams/following-teams" element={<FollowingTeams />} />
          <Route path='/teams/following-teams' element={< FollowingTeams />} />
          <Route path="/manage-cities" element={<ManageCities />} />
          <Route path="/manage-formats" element={<ManageFormats />} />
          <Route path="/manage-locations" element={<ManageLocations />} />
          <Route path="/team-profile/:teamId" element={<TeamsProfile />} />
          <Route path="/match-detail/:id" element={<MatchDetails />} />
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
