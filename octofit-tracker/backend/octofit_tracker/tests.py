from django.test import TestCase
from rest_framework.test import APIClient

from .models import Team, UserProfile


class OctoFitApiTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.team = Team.objects.create(
            name='Team Marvel',
            universe='Marvel',
            motto='Train like an Avenger.',
        )
        self.user = UserProfile.objects.create(
            full_name='Peter Parker',
            hero_name='Spider-Man',
            email='spidey@octofit.test',
            age=21,
            team=self.team,
            total_points=150,
        )

    def test_root_redirects_to_api(self):
        response = self.client.get('/')
        self.assertEqual(response.status_code, 302)
        self.assertEqual(response.url, '/api/')

    def test_api_root_lists_resources(self):
        response = self.client.get('/api/')
        self.assertEqual(response.status_code, 200)
        self.assertIn('users', response.json())
        self.assertIn('teams', response.json())
        self.assertIn('activities', response.json())
        self.assertIn('leaderboard', response.json())
        self.assertIn('workouts', response.json())

    def test_users_endpoint_serializes_object_id_as_string(self):
        response = self.client.get('/api/users/')
        self.assertEqual(response.status_code, 200)
        payload = response.json()
        self.assertEqual(len(payload), 1)
        self.assertIsInstance(payload[0]['id'], str)
        self.assertEqual(payload[0]['hero_name'], 'Spider-Man')