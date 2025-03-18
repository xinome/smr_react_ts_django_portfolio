from django.urls import path, include
from . import views

urlpatterns = [
    path("project_topics/", views.project_topics, name="project_topics"),
    path("portfolio_topics/", views.portfolio_topics, name="portfolio_topics"),
    path("activity_topics/", views.activity_topics, name="activity_topics"),

    path("mypage/<int:pk>", views.mypage_index, name="mypage_index"), 
    # path("mypage/user_profile/", views.mypage_user_profile, name="mypage_user_profile"),
    path("mypage/user_profile/<int:pk>", views.mypage_user_profile, name="mypage_user_profile"),
    path("mypage/edit_profile/<int:pk>", views.mypage_edit_profile, name="mypage_edit_profile"),

    # Postman検証用View
    path("postman_test/", views.postman_test, name="postman_test"),
    path("postman_class_test/<int:pk>", views.postman_class_test.as_view(), name="postman_class_test"),

    # path("", include(router.urls)),
]