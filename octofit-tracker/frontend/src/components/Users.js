import ResourceTablePage from './ResourceTablePage';

function getUsersEndpoint() {
  const codespaceName = process.env.REACT_APP_CODESPACE_NAME;

  return codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/users/`
    : 'http://localhost:8000/api/users/';
}

function Users() {
  return (
    <ResourceTablePage
      title="Users"
      description="User profiles served by the Django REST API."
      resourceName="Users"
      endpoint={getUsersEndpoint()}
      columns={[
        { key: 'hero_name', label: 'Hero', render: (user) => user.hero_name },
        { key: 'full_name', label: 'Full Name', render: (user) => user.full_name },
        { key: 'email', label: 'Email', render: (user) => user.email },
        { key: 'team_name', label: 'Team', render: (user) => user.team_name || 'Unassigned' },
        { key: 'total_points', label: 'Points', render: (user) => user.total_points },
      ]}
      getRowTitle={(user) => user.hero_name}
      getRowSummary={(user) => `${user.full_name} · ${user.email}`}
    />
  );
}

export default Users;