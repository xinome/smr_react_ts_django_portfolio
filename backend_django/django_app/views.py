from django.shortcuts import render
import json
from django.http import JsonResponse

from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

from rest_framework.views import APIView
from rest_framework import status
from rest_framework.decorators import api_view

# 認証系
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import generics
# siimple.jwt ログイン認証
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.tokens import RefreshToken

# Model, Serializerをインポートする
from .serializers import (
   ProjectTopicsSerializer, PortfolioTopicsSerializer, ActivityTopicsSerializer,
   MypageUserProfileSerializer, MypageUserProfileUpdateSerializer,
   TipsContentsSerializer, TipsCategorySerializer,
)
from .models import (
  ProjectTopics, PortfolioTopics, ActivityTopics,
  MypageUserProfile,
  TipsContents, TipsCategory,
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

# base: ログインアカウント
def auth_account(request, pk=None):

  if pk is None or pk == 0:
    print ("auth_account: pk is None or 0")
    return JsonResponse({
      "message": "auth_account: pk is None or 0",
    }, status=400)
  else:
    queryset = MypageUserProfile.objects.get(id=pk)
  serializer_class = MypageUserProfileSerializer(queryset)
  data = serializer_class.data

  return JsonResponse(data, safe=False)

# base: ログイン
@csrf_exempt
def auth_login(request):
  print("request: ", request)

  # JSON形式で受け取る
  data = json.loads(request.body.decode('utf-8'))
  email = data.get('email')
  password = data.get('password')

  print(f"email: {email}, password: {password}")

  try:
    queryset = MypageUserProfile.objects.get(email=email, password=password)
    serializer_class = MypageUserProfileSerializer(queryset)
    data = serializer_class.data
    return JsonResponse(data, safe=False)
  except MypageUserProfile.DoesNotExist:
    return JsonResponse({'error': 'Invalid Credentials'}, status=400)

# JWTを使ったログイン認証
# class LoginView(generics.CreateAPIView):
#   permission_classes = (AllowAny,)
#   authentication_classes = (JWTAuthentication,)
#   queryset = MypageUserProfile.objects.all()
#   serializer_class = MypageUserProfileSerializer

#   def post(self, request, *args, **kwargs):
#     email = request.data.get('email')
#     password = request.data.get('password')
    
#     queryset = MypageUserProfile.objects.get(email=email, password=password)
#     if queryset is not None:
#       refresh = RefreshToken.for_user(queryset)
#       serializer_class = MypageUserProfileSerializer(queryset)
#       data = {
#         'user': serializer_class.data,
#         'refresh': str(refresh),
#         'access': str(refresh.access_token),
#       }
#       return JsonResponse(data, safe=False)
#     else:
#       return JsonResponse({'error': 'Invalid Credentials'}, status=400)

# base: ログアウト
@csrf_exempt
def auth_logout(request):
  
  return JsonResponse({
    "message": "auth_logout",
  })


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
# def mypage_user_profile(request, pk=None):

#   if pk is None:
#     queryset = MypageUserProfile.objects.all()
#   else:
#     queryset = MypageUserProfile.objects.filter(id=pk)
#   serializer_class = MypageUserProfileSerializer(queryset.first())
#   data = serializer_class.data

#   return JsonResponse(data, safe=False, json_dumps_params={'ensure_ascii': False})

# マイページ: インデックス、契約プラン、プロフィール、スキルを取得するAPI
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
      return JsonResponse(serializer_class.data, status=201, json_dumps_params={'ensure_ascii': False})

    return JsonResponse(serializer_class.errors, status=400, json_dumps_params={'ensure_ascii': False})


# 開発Tips
# Tips一覧
def tips_contents(request):
  queryset = TipsContents.objects.all()
  serializer_class = TipsContentsSerializer(queryset, many=True)
  data = serializer_class.data

  return JsonResponse(data, safe=False, json_dumps_params={'ensure_ascii': False})

# Tipsカテゴリー一覧
@csrf_exempt
def tips_category(request):
  queryset = TipsCategory.objects.all()
  serializer_class = TipsCategorySerializer(queryset, many=True)
  data = serializer_class.data

  return JsonResponse(data, safe=False, json_dumps_params={'ensure_ascii': False})

# Tips: カテゴリーごとのTips一覧
def tips_categorized_contents(request, category_path):

  print("category_path: ", category_path)

  # 外部キーでフィルターをかける
  queryset = TipsContents.objects.filter(category__tips_path=category_path)
  serializer_class = TipsContentsSerializer(queryset, many=True)
  data = serializer_class.data

  return JsonResponse(data, safe=False, json_dumps_params={'ensure_ascii': False})

# Tips: IDを参照して1件のみ取得
def tips_detail_contents(request, pk):
  queryset = TipsContents.objects.get(id=pk)
  serializer_class = TipsContentsSerializer(queryset)
  data = serializer_class.data

  return JsonResponse(data, safe=False, json_dumps_params={'ensure_ascii': False})

# Tips: 新規作成
@method_decorator(csrf_exempt, name='dispatch')
class tips_contents_create(APIView):

  # GET: 編集時に参照
  def get(self, request):
    queryset = TipsContents.objects.all()
    serializer_class = TipsContentsSerializer(queryset, many=True)

    data = serializer_class.data

    return JsonResponse(data, safe=False, json_dumps_params={'ensure_ascii': False})

  # POST: 実行
  def post(self, request):

    print("request: ", request)
    print("request.data: ", request.data)

    serializer_class = TipsContentsSerializer(data=request.data)
    if serializer_class.is_valid():
      serializer_class.save()
      return JsonResponse(serializer_class.data, status=201, json_dumps_params={'ensure_ascii': False})

    return JsonResponse(serializer_class.errors, status=400, json_dumps_params={'ensure_ascii': False})

# Tips: 更新
@method_decorator(csrf_exempt, name='dispatch')
class tips_contents_update(APIView):

  # GET: 確認用
  def get(self, request, pk):

    # 1件のみ取得
    queryset = TipsContents.objects.get(id=pk)
    serializer_class = TipsContentsSerializer(queryset)

    data = serializer_class.data

    return JsonResponse(data, safe=False, json_dumps_params={'ensure_ascii': False})

  # POST: 実行
  def post(self, request, pk):

    print("request: ", request)
    print("request.data: ", request.data)

    queryset = TipsContents.objects.get(id=pk)

    serializer_class = TipsContentsSerializer(queryset, data=request.data)
    if serializer_class.is_valid():
      serializer_class.save()
      return JsonResponse(serializer_class.data, status=201, json_dumps_params={'ensure_ascii': False})

    return JsonResponse(serializer_class.errors, status=400, json_dumps_params={'ensure_ascii': False})

# Tips: 削除
@method_decorator(csrf_exempt, name='dispatch')
class tips_contents_delete(APIView):

  # GET: 確認用
  def get(self, request, pk):

    # 1件のみ取得
    queryset = TipsContents.objects.get(id=pk)
    serializer_class = TipsContentsSerializer(queryset)

    data = serializer_class.data

    return JsonResponse(data, safe=False, json_dumps_params={'ensure_ascii': False})

  # POST: 実行
  def post(self, request, pk):

    print("request: ", request)
    print("request.data: ", request.data)

    queryset = TipsContents.objects.get(id=pk)
    queryset.delete()

    return JsonResponse({
      "message": "delete success",
    }, status=201, json_dumps_params={'ensure_ascii': False})


# Postmanからの接続テスト（GET, POST, DELETEに限定する）
@csrf_exempt
@api_view(['GET', 'POST', 'PUT'])
def postman_test(request):
  # postmanからのget, post, put, deleteのテスト
  # https://www.postman.com/
    
  return JsonResponse({
    "message": "postman_test",
    "request": {
      "method": request.method,
      "path": request.path,
      "data": request.data,
    }
  }, json_dumps_params={'ensure_ascii': False})

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

    return JsonResponse(data, safe=False, json_dumps_params={'ensure_ascii': False})

  def post(self, request, pk):
    
    print("request: ", request)
    print("request.data: ", request.data)

    queryset = MypageUserProfile.objects.get(id=pk)

    serializer_class = MypageUserProfileUpdateSerializer(queryset, data=request.data)
    if serializer_class.is_valid():
      serializer_class.save()
      return JsonResponse(serializer_class.data, status=201, json_dumps_params={'ensure_ascii': False})

    return JsonResponse(serializer_class.errors, status=400, json_dumps_params={'ensure_ascii': False})