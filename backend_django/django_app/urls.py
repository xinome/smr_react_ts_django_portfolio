
from django.urls import path
from . import views

urlpatterns = [
    path("project_topics/", views.project_topics, name="project_topics"),
    path("portfolio_topics/", views.portfolio_topics, name="portfolio_topics"),
    path("activity_topics/", views.activity_topics, name="activity_topics"),
]
