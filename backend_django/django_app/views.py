from django.shortcuts import render
from django.http import JsonResponse
from rest_framework import viewsets

# Model, Serializerをインポートする
from .serializers import (
   ProjectTopicsSerializer, PortfolioTopicsSerializer, ActivityTopicsSerializer,
   MypageUserProfileSerializer,
)
from .models import (
  ProjectTopics, PortfolioTopics, ActivityTopics,
  MypageUserProfile,
)

# Create your views here.

"""
# project_topics: 【ダッシュボード】プロジェクトのトピック一覧を取得するAPI
# portfolio_topics: 【ダッシュボード】ポートフォリオのトピック一覧を取得するAPI
# activity_topics: 【ダッシュボード】活動のトピック一覧を取得するAPI
"""

# class ProjectTopicsViewsSet(viewsets.ModelViewSet):
#   queryset = ProjectTopics.objects.all()
#   serializer_class = ProjectTopicsSerializer


# class PortfolioTopicsViewsSet(viewsets.ModelViewSet):
#   queryset = PortfolioTopics.objects.all()
#   serializer_class = PortfolioTopicsSerializer

# class ActivityTopicsViewsSet(viewsets.ModelViewSet):
#   queryset = ActivityTopics.objects.all()
#   serializer_class = ActivityTopicsSerializer



def project_topics(request):
  # data = [
  #   {
  #     "id": 1,
  #     "date": "2022-10-01",
  #     "content": "【テスト】[プロジェクト]「プロジェクト名1」デプロイされました。"
  #   },
  #   {
  #     "id": 2,
  #     "date": "2022-10-02",
  #     "content": "[プロジェクト]「プロジェクト名2」デプロイされました。"
  #   },
  #   {
  #     "id": 3,
  #     "date": "2022-10-03",
  #     "content": "[プロジェクト]「プロジェクト名3」デプロイされました。"
  #   },
  #   {
  #     "id": 4,
  #     "date": "2022-10-04",
  #     "content": "[プロジェクト]「プロジェクト名4」デプロイされました。"
  #   },
  #   {
  #     "id": 5,
  #     "date": "2022-10-05",
  #     "content": "[プロジェクト]「プロジェクト名5」デプロイされました。"
  #   },
  #   {
  #     "id": 6,
  #     "date": "2022-10-06",
  #     "content": "[プロジェクト]「プロジェクト名6」デプロイされました。"
  #   },
  #   {
  #     "id": 7,
  #     "date": "2022-10-07",
  #     "content": "[プロジェクト]「プロジェクト名7」デプロイされました。"
  #   },
  #   {
  #     "id": 8,
  #     "date": "2022-10-08",
  #     "content": "[プロジェクト]「プロジェクト名8」デプロイされました。"
  #   },
  #   {
  #     "id": 9,
  #     "date": "2022-10-09",
  #     "content": "[プロジェクト]「プロジェクト名9」デプロイされました。"
  #   }
  # ]

  # django管理画面で追加した項目が反映されるようになる
  queryset = ProjectTopics.objects.all()

  serializer_class = ProjectTopicsSerializer(queryset, many=True)
  data = serializer_class.data

  return JsonResponse(data, safe=False)

def portfolio_topics(request):
  # data = [
  #   {
  #     "id": 1,
  #     "date": "2022-10-01",
  #     "content": "「ポートフォリオ名」html / css / wordpress"
  #   },
  #   {
  #     "id": 2,
  #     "date": "2022-10-02",
  #     "content": "「ポートフォリオ名」php / laravel / docker"
  #   },
  #   {
  #     "id": 3,
  #     "date": "2022-10-03",
  #     "content": "「ポートフォリオ名」vue.js / vuetify / node.js / bootstrap"
  #   },
  #   {
  #     "id": 4,
  #     "date": "2022-10-04",
  #     "content": "「ポートフォリオ名」html / css / wordpress"
  #   },
  #   {
  #     "id": 5,
  #     "date": "2022-10-05",
  #     "content": "「ポートフォリオ名」php / laravel / docker"
  #   },
  #   {
  #     "id": 6,
  #     "date": "2022-10-06",
  #     "content": "「ポートフォリオ名」vue.js / vuetify / node.js / bootstrap"
  #   },
  #   {
  #     "id": 7,
  #     "date": "2022-10-07",
  #     "content": "「ポートフォリオ名」html / css / wordpress"
  #   },
  #   {
  #     "id": 8,
  #     "date": "2022-10-08",
  #     "content": "「ポートフォリオ名」php / laravel / docker"
  #   },
  #   {
  #     "id": 9,
  #     "date": "2022-10-09",
  #     "content": "「ポートフォリオ名」vue.js / vuetify / node.js / bootstrap"
  #   }
  # ]

  queryset = PortfolioTopics.objects.all()
  serializer_class = PortfolioTopicsSerializer(queryset, many=True)
  data = serializer_class.data

  return JsonResponse(data, safe=False)

def activity_topics(request):
  data = [
    {
      "id": 1,
      "date": "2022-10-01",
      "content": "[プロジェクト] 「プロジェクト名」デプロイされました。"
    },
    {
      "id": 2,
      "date": "2022-10-02",
      "content": "[ポートフォリオ] 「ポートフォリオ名」いいねがつきました。"
    },
    {
      "id": 3,
      "date": "2022-10-03",
      "content": "[スカウト] 「社名」からメッセージが届きました。"
    },
    {
      "id": 4,
      "date": "2022-10-04",
      "content": "[プロジェクト] 「プロジェクト名」デプロイされました。"
    },
    {
      "id": 5,
      "date": "2022-10-05",
      "content": "[ポートフォリオ] 「ポートフォリオ名」いいねがつきました。"
    },
    {
      "id": 6,
      "date": "2022-10-06",
      "content": "[スカウト] 「社名」からメッセージが届きました。"
    },
    {
      "id": 7,
      "date": "2022-10-07",
      "content": "[プロジェクト] 「プロジェクト名」デプロイされました。"
    },
    {
      "id": 8,
      "date": "2022-10-08",
      "content": "[ポートフォリオ] 「ポートフォリオ名」いいねがつきました。"
    },
    {
      "id": 9,
      "date": "2022-10-09",
      "content": "[スカウト] 「社名」からメッセージが届きました。"
    }
  ]

  queryset = ActivityTopics.objects.all()
  serializer_class = ActivityTopicsSerializer(queryset, many=True)
  data = serializer_class.data

  return JsonResponse(data, safe=False)

# マイページ: ユーザープロフィールを取得するAPI
def mypage_user_profile(request, pk=None):

  if pk is None:
    queryset = MypageUserProfile.objects.all()
  else:
    queryset = MypageUserProfile.objects.filter(id=pk)
  serializer_class = MypageUserProfileSerializer(queryset, many=True)
  data = serializer_class.data

  return JsonResponse(data, safe=False)

# マイページ: ユーザープロフィールを更新するAPI
def mypage_edit_profile(request, pk=None):

  queryset = MypageUserProfile.objects.filter(id=pk)
  print("queryset: ", queryset)
  print("request.POST: ", request.POST)

  queryset.update(
    name=request.POST['name'],
    account_id=request.POST['account_id'],
    password=request.POST['password'],
    email=request.POST['email'],
    zip=request.POST['zip'],
    address=request.POST['address'],
    phone=request.POST['phone'],
    member_type=request.POST['member_type']
  )

  # serializer_class = MypageUserProfileSerializer(queryset, many=True)
  # data = serializer_class.data

  # return JsonResponse(data, safe=False)