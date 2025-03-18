from django.urls import path, include
from . import views
# from rest_framework import routers

# router = routers.DefaultRouter()
# router.register("project_topics", views.ProjectTopicsViewsSet)
# router.register("portfolio_topics", views.PortfolioTopicsViewsSet)
# router.register("activity_topics", views.ActivityTopicsViewsSet)

urlpatterns = [
    path("project_topics/", views.project_topics, name="project_topics"),
    path("portfolio_topics/", views.portfolio_topics, name="portfolio_topics"),
    path("activity_topics/", views.activity_topics, name="activity_topics"),
    path("mypage/user_profile/", views.mypage_user_profile, name="mypage_user_profile"),
    path("mypage/user_profile/<int:pk>", views.mypage_user_profile, name="mypage_user_profile"),
    path("mypage/edit_profile/<int:pk>", views.mypage_edit_profile, name="mypage_edit_profile"),

    # path("", include(router.urls)),
]