import ResourceTablePage from './ResourceTablePage';

function getActivitiesEndpoint() {
  const codespaceName = process.env.REACT_APP_CODESPACE_NAME;

  return codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/activities/`
    : 'http://localhost:8000/api/activities/';
}

function Activities() {
  return (
    <ResourceTablePage
      title="Activities"
      description="Tracked activities synced from the backend REST endpoint."
      resourceName="Activities"
      endpoint={getActivitiesEndpoint()}
      columns={[
        { key: 'activity_type', label: 'Activity', render: (activity) => activity.activity_type },
        { key: 'user_hero_name', label: 'User', render: (activity) => activity.user_hero_name },
        { key: 'duration_minutes', label: 'Duration', render: (activity) => `${activity.duration_minutes} min` },
        { key: 'calories_burned', label: 'Calories', render: (activity) => activity.calories_burned },
        { key: 'notes', label: 'Notes', render: (activity) => activity.notes || 'No notes' },
      ]}
      getRowTitle={(activity) => activity.activity_type}
      getRowSummary={(activity) => `${activity.user_hero_name} · ${activity.duration_minutes} min`}
    />
  );
}

export default Activities;