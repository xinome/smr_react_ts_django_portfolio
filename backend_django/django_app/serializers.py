# serializers.py: データの加工や、形式の正誤をチェックする

from rest_framework import serializers
from .models import ProjectTopics, PortfolioTopics, ActivityTopics

class ProjectTopicsSerializer(serializers.ModelSerializer):
  class Meta:
    model = ProjectTopics
    fields = ('id', 'date', 'content', 'category', 'created_at', 'updated_at')

class PortfolioTopicsSerializer(serializers.ModelSerializer):
  class Meta:
    model = PortfolioTopics
    fields = ('id', 'date', 'content', 'created_at', 'updated_at')

class ActivityTopicsSerializer(serializers.ModelSerializer):
  class Meta:
    model = ActivityTopics
    fields = ('id', 'date', 'content', 'category', 'created_at', 'updated_at')
    