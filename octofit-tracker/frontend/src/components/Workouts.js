import ResourceTablePage from './ResourceTablePage';

function getWorkoutsEndpoint() {
  const codespaceName = process.env.REACT_APP_CODESPACE_NAME;

  return codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/workouts/`
    : 'http://localhost:8000/api/workouts/';
}

function Workouts() {
  return (
    <ResourceTablePage
      title="Workouts"
      description="Workout suggestions coming from the backend workouts API."
      resourceName="Workouts"
      endpoint={getWorkoutsEndpoint()}
      columns={[
        { key: 'title', label: 'Title', render: (workout) => workout.title },
        { key: 'focus_area', label: 'Focus', render: (workout) => workout.focus_area },
        { key: 'difficulty', label: 'Difficulty', render: (workout) => workout.difficulty },
        { key: 'duration_minutes', label: 'Duration', render: (workout) => `${workout.duration_minutes} min` },
        { key: 'target_team_name', label: 'Target Team', render: (workout) => workout.target_team_name || 'All teams' },
      ]}
      getRowTitle={(workout) => workout.title}
      getRowSummary={(workout) => `${workout.focus_area} · ${workout.difficulty}`}
    />
  );
}

export default Workouts;