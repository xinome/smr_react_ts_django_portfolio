from django.shortcuts import render
from django.http import JsonResponse
from rest_framework import viewsets

# Model, Serializerをインポートする
from .serializers import ProjectTopicsSerializer, PortfolioTopicsSerializer, ActivityTopicsSerializer
from .models import ProjectTopics, PortfolioTopics, ActivityTopics

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

  # for ProjectTopic in queryset:
  #   print("ProjectTopic: ", ProjectTopic)
  #   print("ProjectTopic.id: ", ProjectTopic.id)
  #   print("ProjectTopic.date: ", ProjectTopic.date)
  #   print("ProjectTopic.content: ", ProjectTopic.content)
  #   print("ProjectTopic.category: ", ProjectTopic.category)
  #   # print("ProjectTopic.category.id: ", ProjectTopic.category.id)
  #   # print("ProjectTopic.category.category_name: ", ProjectTopic.category.category_name)
  #   print("ProjectTopic.created_at: ", ProjectTopic.created_at)
  #   print("ProjectTopic.updated_at: ", ProjectTopic.updated_at)

  serializer_class = ProjectTopicsSerializer(queryset, many=True)
  data = serializer_class.data

  # for item in data:
  #   print("item: ", item)
  #   print("item['category']: ", item['category'])

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