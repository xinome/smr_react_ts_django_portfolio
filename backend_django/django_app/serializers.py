# serializers.py: データの加工や、形式の正誤（バリデーション）をチェックする

from rest_framework import serializers
from .models import (
  TopicsCategory, PricingPlan, TipsCategory,
  ProjectTopics, PortfolioTopics, ActivityTopics, 
  MypageUserProfile,
  TipsContents,
)

"""
Base: 全ページ共通のシリアライザー
"""

# Base: ログインアカウント
# TODO: oAuth認証等は後に検討する
class AuthAccountSerializer(serializers.ModelSerializer):
  class Meta:
    model = MypageUserProfile
    # fields = ('id', 'name', 'account_id', 'password', 'email', 'zip', 'address', 'phone')
    # email. passwordのみを指定する
    fields = ('email', 'password')



"""
# Utility: 外部キー用のシリアライザー
# 
# TopicsCategory: カテゴリー一覧を取得するAPI
# PricingPlan: 料金プラン一覧を取得するAPI
# TipsCategory: Tipsカテゴリー一覧を取得するAPI
"""

class TopicsCategorySerializer(serializers.ModelSerializer):
  class Meta:
    model = TopicsCategory
    fields = ('id', 'category_name')

class PricingPlanSerializer(serializers.ModelSerializer):
  class Meta:
    model = PricingPlan
    fields = ('id', 'plan_name', 'has_creatable_project', 'cnt_project_limit', 'cnt_project', 'price', 'description')

class TipsCategorySerializer(serializers.ModelSerializer):
  class Meta:
    model = TipsCategory
    fields = ('id', 'tips_name', 'tips_path')



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

# Mypage: get_user_profile
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



"""
# 開発Tips: TipsのAPI
#
# tips_contents: 【開発Tips】Tips一覧を取得するAPI
"""
class TipsContentsSerializer(serializers.ModelSerializer):
  # 外部キーのカテゴリーを取得する
  category = TipsCategorySerializer()

  class Meta:
    model = TipsContents
    fields = ('id', 'title', 'date', 'content', 'category', 'created_at', 'updated_at')

  def create(self, validated_data):
    # categoryは外部キーなので、tips_pathを取得して登録する
    validated_data['category'] = TipsCategory.objects.get(tips_path=validated_data['category'].get('tips_path'))

    return TipsContents.objects.create(**validated_data)

  def update(self, instance, validated_data):

    instance.title = validated_data.get('title', instance.title)
    instance.date = validated_data.get('date', instance.date)
    instance.content = validated_data.get('content', instance.content)
    # categoryは外部キーなので、tips_pathを取得して更新する
    instance.category = TipsCategory.objects.get(tips_path=validated_data.get('category').get('tips_path'))

    instance.save()
    return instance

  def delete(self, instance):
    instance.delete()
    return instance