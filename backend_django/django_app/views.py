from django.shortcuts import render
import json
from django.http import JsonResponse

from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

from rest_framework.views import APIView
from rest_framework import status
from rest_framework.decorators import api_view

# Model, Serializerをインポートする
from .serializers import (
   ProjectTopicsSerializer, PortfolioTopicsSerializer, ActivityTopicsSerializer,
   MypageUserProfileSerializer, MypageUserProfileUpdateSerializer,
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
# 
# mypage_index: 【マイページ】インデックス、契約プラン、プロフィール、スキルを取得するAPI
# mypage_user_profile: 【マイページ】ユーザープロフィールを取得・更新するAPI
"""

# ダッシュボード
def project_topics(request):
  # django管理画面で追加した項目が反映されるようになる
  queryset = ProjectTopics.objects.all()

  serializer_class = ProjectTopicsSerializer(queryset, many=True)
  data = serializer_class.data

  return JsonResponse(data, safe=False, json_dumps_params={'ensure_ascii': False})

def portfolio_topics(request):
  queryset = PortfolioTopics.objects.all()

  serializer_class = PortfolioTopicsSerializer(queryset, many=True)
  data = serializer_class.data

  return JsonResponse(data, safe=False, json_dumps_params={'ensure_ascii': False})

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

  return JsonResponse(data, safe=False, json_dumps_params={'ensure_ascii': False})

# マイページ: ユーザープロフィールを取得するAPI
def mypage_user_profile(request, pk=None):

  if pk is None:
    queryset = MypageUserProfile.objects.all()
  else:
    queryset = MypageUserProfile.objects.filter(id=pk)
  serializer_class = MypageUserProfileSerializer(queryset.first())
  data = serializer_class.data

  return JsonResponse(data, safe=False, json_dumps_params={'ensure_ascii': False})

# # マイページ: インデックス、契約プラン、プロフィール、スキルを取得するAPI
# 契約プラン、スキルは別途実装する
def mypage_index(request, pk=None):

  if pk is None:
    queryset = MypageUserProfile.objects.all()
  else:
    queryset = MypageUserProfile.objects.filter(id=pk)
  serializer_class = MypageUserProfileSerializer(queryset.first())
  data = serializer_class.data

  return JsonResponse(data, safe=False, json_dumps_params={'ensure_ascii': False})

# マイページ: ユーザープロフィール
@method_decorator(csrf_exempt, name='dispatch')
class mypage_user_profile(APIView):
  def get(self, request, pk):

    # 1件のみ取得
    queryset = MypageUserProfile.objects.get(id=pk)
    serializer_class = MypageUserProfileSerializer(queryset)

    data = serializer_class.data

    return JsonResponse(data, safe=False)

  def post(self, request, pk):
    print("request: ", request)
    print("request.data: ", request.data)

    queryset = MypageUserProfile.objects.get(id=pk)

    serializer_class = MypageUserProfileUpdateSerializer(queryset, data=request.data)
    if serializer_class.is_valid():
      serializer_class.save()
      print("serializer_class.data: ", serializer_class.data)
      return JsonResponse(serializer_class.data, status=201)

    return JsonResponse(serializer_class.errors, status=400)


# Postmanからの接続テスト（GET, POST, DELETEに限定する）
@csrf_exempt
@api_view(['GET', 'POST', 'PUT'])
def postman_test(request):
  # postmanからのget, post, put, deleteのテスト
  # https://www.postman.com/
  
  print("request: ", request)
  print("request.POST: ", request.POST)
  
  return JsonResponse({
    "message": "postman_test",
    "request": {
      "method": request.method,
      "path": request.path,
      "data": request.data,
    }
  })

# class-based view
@method_decorator(csrf_exempt, name='dispatch')
class postman_class_test(APIView):
  
  # def get(self, request, *args, **kwargs):
  def get(self, request, pk):
    
    # 1件のみ取得する場合
    queryset = MypageUserProfile.objects.get(id=pk)
    serializer_class = MypageUserProfileUpdateSerializer(queryset)

    # フィルターをかけて取得する場合、many=Trueを指定する
    # queryset = MypageUserProfile.objects. filter(id=pk)
    # serializer_class = MypageUserProfileUpdateSerializer(queryset, many=True)

    data = serializer_class.data

    return JsonResponse(data, safe=False)

  def post(self, request, pk):
    
    print("request: ", request)
    print("request.data: ", request.data)

    queryset = MypageUserProfile.objects.get(id=pk)

    serializer_class = MypageUserProfileUpdateSerializer(queryset, data=request.data)
    if serializer_class.is_valid():
      serializer_class.save()
      return JsonResponse(serializer_class.data, status=201)

    return JsonResponse(serializer_class.errors, status=400)