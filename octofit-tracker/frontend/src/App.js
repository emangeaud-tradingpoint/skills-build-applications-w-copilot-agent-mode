import './App.css';
import { Navigate, NavLink, Route, Routes } from 'react-router-dom';

import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

function App() {
  return (
    <div className="app-shell">
      <header className="app-header shadow-lg">
        <div className="container py-4">
          <div className="row align-items-center g-4">
            <div className="col-lg-8">
              <div className="app-brand-row mb-3">
                <img className="app-logo" src={`${process.env.PUBLIC_URL}/octofitapp-small.png`} alt="OctoFit logo" />
                <div>
                  <p className="app-eyebrow text-uppercase mb-2">OctoFit Tracker</p>
                  <h1 className="display-4 fw-bold mb-2">Fitness Dashboard</h1>
                </div>
              </div>
              <p className="lead mb-0 app-subtitle">
                Navigation, tables and detail views now follow one consistent Bootstrap pattern for
                every backend collection.
              </p>
            </div>
            <div className="col-lg-4">
              <div className="card border-0 shadow-sm app-hero-card">
                <div className="card-body">
                  <h2 className="h5 card-title mb-3">Data Sources</h2>
                  <p className="card-text mb-2">Users, teams, activities, leaderboard and workouts are all backed by Django REST endpoints.</p>
                  <a className="btn btn-warning fw-semibold" href="/users">Open dashboard</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <nav className="navbar navbar-expand-lg app-navbar sticky-top" aria-label="Main navigation">
        <div className="container">
          <span className="navbar-brand fw-bold d-inline-flex align-items-center gap-2">
            <img className="app-nav-logo" src={`${process.env.PUBLIC_URL}/octofitapp-small.png`} alt="OctoFit mark" />
            <span>OctoFit</span>
          </span>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#octofit-nav"
            aria-controls="octofit-nav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="octofit-nav">
            <div className="navbar-nav nav-pills ms-auto gap-2">
              <NavLink className={({ isActive }) => `nav-link rounded-pill px-3 ${isActive ? 'active' : ''}`} to="/users">Users</NavLink>
              <NavLink className={({ isActive }) => `nav-link rounded-pill px-3 ${isActive ? 'active' : ''}`} to="/teams">Teams</NavLink>
              <NavLink className={({ isActive }) => `nav-link rounded-pill px-3 ${isActive ? 'active' : ''}`} to="/activities">Activities</NavLink>
              <NavLink className={({ isActive }) => `nav-link rounded-pill px-3 ${isActive ? 'active' : ''}`} to="/leaderboard">Leaderboard</NavLink>
              <NavLink className={({ isActive }) => `nav-link rounded-pill px-3 ${isActive ? 'active' : ''}`} to="/workouts">Workouts</NavLink>
            </div>
          </div>
        </div>
      </nav>

      <main className="app-content container py-4">
        <Routes>
          <Route path="/" element={<Navigate to="/users" replace />} />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
