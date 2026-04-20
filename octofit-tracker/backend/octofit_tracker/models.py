from bson import ObjectId
from djongo import models


class Team(models.Model):
    id = models.ObjectIdField(primary_key=True, default=ObjectId, editable=False)
    name = models.CharField(max_length=100, unique=True)
    universe = models.CharField(max_length=32)
    motto = models.CharField(max_length=255, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'teams'
        ordering = ['name']

    def __str__(self):
        return self.name


class UserProfile(models.Model):
    id = models.ObjectIdField(primary_key=True, default=ObjectId, editable=False)
    full_name = models.CharField(max_length=120)
    hero_name = models.CharField(max_length=120)
    email = models.EmailField(unique=True)
    age = models.PositiveIntegerField()
    team = models.ForeignKey(Team, on_delete=models.SET_NULL, null=True, related_name='members')
    total_points = models.PositiveIntegerField(default=0)
    joined_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'users'
        ordering = ['hero_name']

    def __str__(self):
        return self.hero_name


class Activity(models.Model):
    id = models.ObjectIdField(primary_key=True, default=ObjectId, editable=False)
    user = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name='activities')
    activity_type = models.CharField(max_length=100)
    duration_minutes = models.PositiveIntegerField()
    calories_burned = models.PositiveIntegerField()
    notes = models.TextField(blank=True)
    performed_at = models.DateTimeField()

    class Meta:
        db_table = 'activities'
        ordering = ['-performed_at']

    def __str__(self):
        return f'{self.user.hero_name} - {self.activity_type}'


class LeaderboardEntry(models.Model):
    id = models.ObjectIdField(primary_key=True, default=ObjectId, editable=False)
    user = models.OneToOneField(UserProfile, on_delete=models.CASCADE, related_name='leaderboard_entry')
    rank = models.PositiveIntegerField()
    points = models.PositiveIntegerField()
    streak_days = models.PositiveIntegerField(default=0)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'leaderboard'
        ordering = ['rank', '-points']

    def __str__(self):
        return f'{self.rank} - {self.user.hero_name}'


class Workout(models.Model):
    id = models.ObjectIdField(primary_key=True, default=ObjectId, editable=False)
    title = models.CharField(max_length=120)
    focus_area = models.CharField(max_length=120)
    difficulty = models.CharField(max_length=32)
    duration_minutes = models.PositiveIntegerField()
    description = models.TextField()
    target_team = models.ForeignKey(Team, on_delete=models.SET_NULL, null=True, blank=True, related_name='workouts')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'workouts'
        ordering = ['title']

    def __str__(self):
        return self.title