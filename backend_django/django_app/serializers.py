# serializers.py: データの加工や、形式の正誤（バリデーション）をチェックする

from rest_framework import serializers
from .models import (
  TopicsCategory, PricingPlan,
  ProjectTopics, PortfolioTopics, ActivityTopics, 
  MypageUserProfile,
)

"""
Base: 全ページ共通のシリアライザー
"""

# Base: ログインアカウント
class AuthAccountSerializer(serializers.ModelSerializer):
  class Meta:
    model = MypageUserProfile
    fields = ('id', 'name', 'account_id', 'password', 'email', 'zip', 'address', 'phone')

"""
# Utility: 外部キー用のシリアライザー
# 
# TopicsCategory: カテゴリー一覧を取得するAPI
# PricingPlan: 料金プラン一覧を取得するAPI
"""

class TopicsCategorySerializer(serializers.ModelSerializer):
  class Meta:
    model = TopicsCategory
    fields = ('id', 'category_name')

class PricingPlanSerializer(serializers.ModelSerializer):
  class Meta:
    model = PricingPlan
    fields = ('id', 'plan_name', 'has_creatable_project', 'cnt_project_limit', 'cnt_project', 'price', 'description')


"""
# Dashboard: ダッシュボードのAPI
#
# project_topics: 【ダッシュボード】プロジェクトのトピック一覧を取得するAPI
# portfolio_topics: 【ダッシュボード】ポートフォリオのトピック一覧を取得するAPI
# activity_topics: 【ダッシュボード】活動のトピック一覧を取得するAPI
"""

class ProjectTopicsSerializer(serializers.ModelSerializer):
  # 外部キーのカテゴリーを取得する
  category = TopicsCategorySerializer()
  
  class Meta:
    model = ProjectTopics
    fields = ('id', 'date', 'content', 'category')

class PortfolioTopicsSerializer(serializers.ModelSerializer):
  class Meta:
    model = PortfolioTopics
    fields = ('id', 'date', 'content')

class ActivityTopicsSerializer(serializers.ModelSerializer):
  # 外部キーのカテゴリーを取得する
  category = TopicsCategorySerializer()

  class Meta:
    model = ActivityTopics
    fields = ('id', 'date', 'content', 'category')


"""
# Mypage: マイページのAPI
#
# mypage_index: 【マイページ】インデックス、契約プラン、プロフィール、スキルを取得するAPI
# mypage_user_profile: 【マイページ】ユーザープロフィールを取得・更新するAPI
"""

class MypageUserProfileSerializer(serializers.ModelSerializer):
  # 外部キーのカテゴリーを取得する
  member_type = PricingPlanSerializer()

  class Meta:
    model = MypageUserProfile
    fields = ('id', 'name', 'account_id', 'password', 'email', 'zip', 'address', 'phone', 'member_type')

# Mypage: ユーザープロフィールを更新するAPI
class MypageUserProfileUpdateSerializer(serializers.ModelSerializer):
  # 対象: member_type（外部キー）以外
  class Meta:
    model = MypageUserProfile
    fields = ('id', 'name', 'account_id', 'password', 'email', 'zip', 'address', 'phone')