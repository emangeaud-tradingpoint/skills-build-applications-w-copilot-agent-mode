from rest_framework import serializers

from .models import Activity, LeaderboardEntry, Team, UserProfile, Workout


class ObjectIdStringMixin(serializers.ModelSerializer):
    id = serializers.SerializerMethodField()

    def get_id(self, obj):
        return str(obj.pk)


class TeamSerializer(ObjectIdStringMixin):
    member_count = serializers.IntegerField(source='members.count', read_only=True)

    class Meta:
        model = Team
        fields = ['id', 'name', 'universe', 'motto', 'created_at', 'member_count']
        read_only_fields = ['id', 'created_at', 'member_count']


class UserProfileSerializer(ObjectIdStringMixin):
    team = serializers.PrimaryKeyRelatedField(queryset=Team.objects.all(), allow_null=True)
    team_name = serializers.CharField(source='team.name', read_only=True)

    class Meta:
        model = UserProfile
        fields = [
            'id',
            'full_name',
            'hero_name',
            'email',
            'age',
            'team',
            'team_name',
            'total_points',
            'joined_at',
        ]
        read_only_fields = ['id', 'joined_at', 'team_name']


class ActivitySerializer(ObjectIdStringMixin):
    user = serializers.PrimaryKeyRelatedField(queryset=UserProfile.objects.all())
    user_hero_name = serializers.CharField(source='user.hero_name', read_only=True)

    class Meta:
        model = Activity
        fields = [
            'id',
            'user',
            'user_hero_name',
            'activity_type',
            'duration_minutes',
            'calories_burned',
            'notes',
            'performed_at',
        ]
        read_only_fields = ['id', 'user_hero_name']


class LeaderboardEntrySerializer(ObjectIdStringMixin):
    user = serializers.PrimaryKeyRelatedField(queryset=UserProfile.objects.all())
    hero_name = serializers.CharField(source='user.hero_name', read_only=True)

    class Meta:
        model = LeaderboardEntry
        fields = ['id', 'user', 'hero_name', 'rank', 'points', 'streak_days', 'updated_at']
        read_only_fields = ['id', 'hero_name', 'updated_at']


class WorkoutSerializer(ObjectIdStringMixin):
    target_team = serializers.PrimaryKeyRelatedField(queryset=Team.objects.all(), allow_null=True, required=False)
    target_team_name = serializers.CharField(source='target_team.name', read_only=True)

    class Meta:
        model = Workout
        fields = [
            'id',
            'title',
            'focus_area',
            'difficulty',
            'duration_minutes',
            'description',
            'target_team',
            'target_team_name',
            'created_at',
        ]
        read_only_fields = ['id', 'created_at', 'target_team_name']