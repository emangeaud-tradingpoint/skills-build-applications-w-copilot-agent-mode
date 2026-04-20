from datetime import timedelta

from django.conf import settings
from django.core.management.base import BaseCommand
from django.utils import timezone
from pymongo import MongoClient

from octofit_tracker.models import Activity, LeaderboardEntry, Team, UserProfile, Workout


class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def _ensure_user_email_index(self):
        client_settings = settings.DATABASES['default']['CLIENT']
        client = MongoClient(host=client_settings['host'], port=client_settings['port'])
        try:
            collection = client[settings.DATABASES['default']['NAME']]['users']
            collection.create_index([('email', 1)], unique=True)
        finally:
            client.close()

    def handle(self, *args, **options):
        self.stdout.write('Resetting OctoFit test data...')

        Activity.objects.all().delete()
        LeaderboardEntry.objects.all().delete()
        Workout.objects.all().delete()
        UserProfile.objects.all().delete()
        Team.objects.all().delete()

        teams = {
            'marvel': Team.objects.create(
                name='Team Marvel',
                universe='Marvel',
                motto='Train like an Avenger.',
            ),
            'dc': Team.objects.create(
                name='Team DC',
                universe='DC',
                motto='Push beyond Gotham nights.',
            ),
        }

        heroes = [
            {
                'full_name': 'Peter Parker',
                'hero_name': 'Spider-Man',
                'email': 'spiderman@octofit.test',
                'age': 21,
                'team': teams['marvel'],
                'total_points': 180,
            },
            {
                'full_name': 'Carol Danvers',
                'hero_name': 'Captain Marvel',
                'email': 'captainmarvel@octofit.test',
                'age': 34,
                'team': teams['marvel'],
                'total_points': 240,
            },
            {
                'full_name': 'Bruce Wayne',
                'hero_name': 'Batman',
                'email': 'batman@octofit.test',
                'age': 38,
                'team': teams['dc'],
                'total_points': 220,
            },
            {
                'full_name': 'Diana Prince',
                'hero_name': 'Wonder Woman',
                'email': 'wonderwoman@octofit.test',
                'age': 3000,
                'team': teams['dc'],
                'total_points': 260,
            },
        ]

        users = [UserProfile.objects.create(**hero) for hero in heroes]
        users_by_hero = {user.hero_name: user for user in users}

        now = timezone.now()
        activities = [
            {
                'user': users_by_hero['Spider-Man'],
                'activity_type': 'Web Sprint Intervals',
                'duration_minutes': 45,
                'calories_burned': 420,
                'notes': 'Agility ladder and rooftop cardio.',
                'performed_at': now - timedelta(days=1),
            },
            {
                'user': users_by_hero['Captain Marvel'],
                'activity_type': 'Photon Power Circuit',
                'duration_minutes': 60,
                'calories_burned': 610,
                'notes': 'High-intensity strength and endurance session.',
                'performed_at': now - timedelta(days=2),
            },
            {
                'user': users_by_hero['Batman'],
                'activity_type': 'Gotham Night Run',
                'duration_minutes': 50,
                'calories_burned': 480,
                'notes': 'Weighted sprint training through the city.',
                'performed_at': now - timedelta(hours=12),
            },
            {
                'user': users_by_hero['Wonder Woman'],
                'activity_type': 'Amazon Strength Session',
                'duration_minutes': 70,
                'calories_burned': 700,
                'notes': 'Full-body power routine with shield drills.',
                'performed_at': now - timedelta(days=3),
            },
        ]
        Activity.objects.bulk_create([Activity(**activity) for activity in activities])

        leaderboard_entries = [
            {
                'user': users_by_hero['Wonder Woman'],
                'rank': 1,
                'points': 260,
                'streak_days': 14,
            },
            {
                'user': users_by_hero['Captain Marvel'],
                'rank': 2,
                'points': 240,
                'streak_days': 11,
            },
            {
                'user': users_by_hero['Batman'],
                'rank': 3,
                'points': 220,
                'streak_days': 9,
            },
            {
                'user': users_by_hero['Spider-Man'],
                'rank': 4,
                'points': 180,
                'streak_days': 7,
            },
        ]
        LeaderboardEntry.objects.bulk_create(
            [LeaderboardEntry(**entry) for entry in leaderboard_entries]
        )

        workouts = [
            {
                'title': 'Avengers Core Blast',
                'focus_area': 'Core Strength',
                'difficulty': 'Intermediate',
                'duration_minutes': 35,
                'description': 'Circuit focused on core stability and rotational power.',
                'target_team': teams['marvel'],
            },
            {
                'title': 'Justice League Power Push',
                'focus_area': 'Full Body Strength',
                'difficulty': 'Advanced',
                'duration_minutes': 45,
                'description': 'Compound movement workout built for explosive strength.',
                'target_team': teams['dc'],
            },
            {
                'title': 'Hero Recovery Flow',
                'focus_area': 'Mobility',
                'difficulty': 'Beginner',
                'duration_minutes': 20,
                'description': 'Low-impact recovery plan for flexibility and reset days.',
                'target_team': None,
            },
        ]
        Workout.objects.bulk_create([Workout(**workout) for workout in workouts])
        self._ensure_user_email_index()

        self.stdout.write(
            self.style.SUCCESS(
                'Created 2 teams, 4 users, 4 activities, 4 leaderboard entries, and 3 workouts.'
            )
        )