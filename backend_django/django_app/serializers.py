# serializers.py: データの加工や、形式の正誤（バリデーション）をチェックする

from rest_framework import serializers
from .models import (
  TopicsCategory, PricingPlan,
  ProjectTopics, PortfolioTopics, ActivityTopics, 
  MypageUserProfile,
)

# Utility
class TopicsCategorySerializer(serializers.ModelSerializer):
  class Meta:
    model = TopicsCategory
    fields = ('id', 'category_name')

class PricingPlanSerializer(serializers.ModelSerializer):
  class Meta:
    model = PricingPlan
    fields = ('id', 'plan_name', 'has_creatable_project', 'cnt_project_limit', 'cnt_project', 'price', 'description')

# Dashboard
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

# Mypage: get_user_profile
class MypageUserProfileSerializer(serializers.ModelSerializer):
  # 外部キーのカテゴリーを取得する
  member_type = PricingPlanSerializer()

  class Meta:
    model = MypageUserProfile
    fields = ('id', 'name', 'account_id', 'password', 'email', 'zip', 'address', 'phone', 'member_type')

# Mypage: update_user_profile
class MypageUserProfileUpdateSerializer(serializers.ModelSerializer):
  # 対象: member_type（外部キー）以外
  class Meta:
    model = MypageUserProfile
    fields = ('id', 'name', 'account_id', 'password', 'email', 'zip', 'address', 'phone')