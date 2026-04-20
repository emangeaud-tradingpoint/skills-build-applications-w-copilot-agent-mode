from django.contrib import admin

from .models import Activity, LeaderboardEntry, Team, UserProfile, Workout


@admin.register(Team)
class TeamAdmin(admin.ModelAdmin):
    list_display = ('name', 'universe', 'created_at')
    search_fields = ('name', 'universe')


@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ('hero_name', 'full_name', 'email', 'team', 'total_points')
    search_fields = ('hero_name', 'full_name', 'email')
    list_filter = ('team',)


@admin.register(Activity)
class ActivityAdmin(admin.ModelAdmin):
    list_display = ('activity_type', 'user', 'duration_minutes', 'calories_burned', 'performed_at')
    search_fields = ('activity_type', 'user__hero_name')
    list_filter = ('activity_type',)


@admin.register(LeaderboardEntry)
class LeaderboardEntryAdmin(admin.ModelAdmin):
    list_display = ('rank', 'user', 'points', 'streak_days', 'updated_at')
    search_fields = ('user__hero_name',)


@admin.register(Workout)
class WorkoutAdmin(admin.ModelAdmin):
    list_display = ('title', 'focus_area', 'difficulty', 'duration_minutes', 'target_team')
    search_fields = ('title', 'focus_area', 'difficulty')
    list_filter = ('difficulty', 'target_team')