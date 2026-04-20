import ResourceTablePage from './ResourceTablePage';

function getLeaderboardEndpoint() {
  const codespaceName = process.env.REACT_APP_CODESPACE_NAME;

  return codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/leaderboard/`
    : 'http://localhost:8000/api/leaderboard/';
}

function Leaderboard() {
  return (
    <ResourceTablePage
      title="Leaderboard"
      description="Competitive standings fetched from the leaderboard REST endpoint."
      resourceName="Leaderboard"
      endpoint={getLeaderboardEndpoint()}
      columns={[
        { key: 'rank', label: 'Rank', render: (entry) => `#${entry.rank}` },
        { key: 'hero_name', label: 'Hero', render: (entry) => entry.hero_name },
        { key: 'points', label: 'Points', render: (entry) => entry.points },
        { key: 'streak_days', label: 'Streak', render: (entry) => `${entry.streak_days} days` },
        { key: 'updated_at', label: 'Updated', render: (entry) => new Date(entry.updated_at).toLocaleString() },
      ]}
      getRowTitle={(entry) => `#${entry.rank} ${entry.hero_name}`}
      getRowSummary={(entry) => `${entry.points} points · ${entry.streak_days} streak days`}
    />
  );
}

export default Leaderboard;