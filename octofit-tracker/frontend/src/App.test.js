import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import App from './App';

jest.mock('./components/Users', () => () => <div>Users page</div>);
jest.mock('./components/Teams', () => () => <div>Teams page</div>);
jest.mock('./components/Activities', () => () => <div>Activities page</div>);
jest.mock('./components/Leaderboard', () => () => <div>Leaderboard page</div>);
jest.mock('./components/Workouts', () => () => <div>Workouts page</div>);

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve([]),
    })
  );
});

afterEach(() => {
  jest.resetAllMocks();
});

test('renders the main navigation links', () => {
  render(
    <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <App />
    </MemoryRouter>
  );

  expect(screen.getByRole('link', { name: /users/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /teams/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /activities/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /leaderboard/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /workouts/i })).toBeInTheDocument();
});
