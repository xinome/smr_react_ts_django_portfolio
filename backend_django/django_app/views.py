from django.shortcuts import render
from django.http import JsonResponse

# Create your views here.

"""
# project_topics: プロジェクトのトピック一覧を取得するAPI
# portfolio_topics: ポートフォリオのトピック一覧を取得するAPI
# activity_topics: 活動のトピック一覧を取得するAPI
"""

def project_topics(request):
  data = [
    {
      "id": 1,
      "date": "2022-10-01",
      "content": "【テスト】[プロジェクト]「プロジェクト名1」デプロイされました。"
    },
    {
      "id": 2,
      "date": "2022-10-02",
      "content": "[プロジェクト]「プロジェクト名2」デプロイされました。"
    },
    {
      "id": 3,
      "date": "2022-10-03",
      "content": "[プロジェクト]「プロジェクト名3」デプロイされました。"
    },
    {
      "id": 4,
      "date": "2022-10-04",
      "content": "[プロジェクト]「プロジェクト名4」デプロイされました。"
    },
    {
      "id": 5,
      "date": "2022-10-05",
      "content": "[プロジェクト]「プロジェクト名5」デプロイされました。"
    },
    {
      "id": 6,
      "date": "2022-10-06",
      "content": "[プロジェクト]「プロジェクト名6」デプロイされました。"
    },
    {
      "id": 7,
      "date": "2022-10-07",
      "content": "[プロジェクト]「プロジェクト名7」デプロイされました。"
    },
    {
      "id": 8,
      "date": "2022-10-08",
      "content": "[プロジェクト]「プロジェクト名8」デプロイされました。"
    },
    {
      "id": 9,
      "date": "2022-10-09",
      "content": "[プロジェクト]「プロジェクト名9」デプロイされました。"
    }
  ]

  return JsonResponse(data, safe=False)

def portfolio_topics(request):
  data = [
    {
      "id": 1,
      "date": "2022-10-01",
      "content": "「ポートフォリオ名」html / css / wordpress"
    },
    {
      "id": 2,
      "date": "2022-10-02",
      "content": "「ポートフォリオ名」php / laravel / docker"
    },
    {
      "id": 3,
      "date": "2022-10-03",
      "content": "「ポートフォリオ名」vue.js / vuetify / node.js / bootstrap"
    },
    {
      "id": 4,
      "date": "2022-10-04",
      "content": "「ポートフォリオ名」html / css / wordpress"
    },
    {
      "id": 5,
      "date": "2022-10-05",
      "content": "「ポートフォリオ名」php / laravel / docker"
    },
    {
      "id": 6,
      "date": "2022-10-06",
      "content": "「ポートフォリオ名」vue.js / vuetify / node.js / bootstrap"
    },
    {
      "id": 7,
      "date": "2022-10-07",
      "content": "「ポートフォリオ名」html / css / wordpress"
    },
    {
      "id": 8,
      "date": "2022-10-08",
      "content": "「ポートフォリオ名」php / laravel / docker"
    },
    {
      "id": 9,
      "date": "2022-10-09",
      "content": "「ポートフォリオ名」vue.js / vuetify / node.js / bootstrap"
    }
    
  ]

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

  return JsonResponse(data, safe=False)
  