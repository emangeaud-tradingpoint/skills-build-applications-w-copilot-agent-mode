import os

from django.contrib import admin
from django.urls import include, path
from django.views.generic import RedirectView
from rest_framework.routers import SimpleRouter

from .views import (
    ActivityViewSet,
    LeaderboardEntryViewSet,
    TeamViewSet,
    WorkoutViewSet,
    api_root,
    UserProfileViewSet,
)

codespace_name = os.environ.get('CODESPACE_NAME')
if codespace_name:
    base_url = f"https://{codespace_name}-8000.app.github.dev"
else:
    base_url = "http://localhost:8000"

router = SimpleRouter()
router.register('users', UserProfileViewSet, basename='user')
router.register('teams', TeamViewSet, basename='team')
router.register('activities', ActivityViewSet, basename='activity')
router.register('leaderboard', LeaderboardEntryViewSet, basename='leaderboard')
router.register('workouts', WorkoutViewSet, basename='workout')

urlpatterns = [
    path('', RedirectView.as_view(pattern_name='api-root', permanent=False)),
    path('admin/', admin.site.urls),
    path('api/', api_root, name='api-root'),
    path('api/', include(router.urls)),
]
