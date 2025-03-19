from django.urls import path, include
from . import views

urlpatterns = [
    # アカウント認証
    path("auth_account/<int:pk>", views.auth_account, name="auth_account"),

    # ダッシュボード
    path("project_topics/", views.project_topics, name="project_topics"),
    path("portfolio_topics/", views.portfolio_topics, name="portfolio_topics"),
    path("activity_topics/", views.activity_topics, name="activity_topics"),

    # マイページ
    path("mypage/<int:pk>", views.mypage_index, name="mypage_index"), 
    path("mypage/user_profile/<int:pk>", views.mypage_user_profile.as_view(), name="mypage_user_profile"),
    path("mypage/edit_profile/<int:pk>", views.mypage_user_profile.as_view(), name="mypage_user_profile"),

    # 開発Tips
    path("tips_contents/", views.tips_contents, name="tips_contents"),

    # 検証用: Postmanとの連携、関数ベース / クラスベース
    path("postman_test/", views.postman_test, name="postman_test"),
    path("postman_class_test/<int:pk>", views.postman_class_test.as_view(), name="postman_class_test"),

    # path("", include(router.urls)),
]