from django.shortcuts import render
from django.http import JsonResponse

# Create your views here.

def data(request):
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