import ResourceTablePage from './ResourceTablePage';

function getTeamsEndpoint() {
  const codespaceName = process.env.REACT_APP_CODESPACE_NAME;

  return codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/teams/`
    : 'http://localhost:8000/api/teams/';
}

function Teams() {
  return (
    <ResourceTablePage
      title="Teams"
      description="Team data loaded from the Django REST teams endpoint."
      resourceName="Teams"
      endpoint={getTeamsEndpoint()}
      columns={[
        { key: 'name', label: 'Name', render: (team) => team.name },
        { key: 'universe', label: 'Universe', render: (team) => team.universe },
        { key: 'motto', label: 'Motto', render: (team) => team.motto || 'No motto set' },
        { key: 'member_count', label: 'Members', render: (team) => team.member_count },
      ]}
      getRowTitle={(team) => team.name}
      getRowSummary={(team) => `${team.universe} universe`}
    />
  );
}

export default Teams;