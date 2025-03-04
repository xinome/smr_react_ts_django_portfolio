# serializers.py: データの加工や、形式の正誤をチェックする

from rest_framework import serializers
from .models import ProjectTopics, PortfolioTopics, ActivityTopics, TopicsCategory

class TopicsCategorySerializer(serializers.ModelSerializer):
  class Meta:
    model = TopicsCategory
    fields = ('id', 'category_name')

class ProjectTopicsSerializer(serializers.ModelSerializer):
  class Meta:
    model = ProjectTopics
    fields = ('id', 'date', 'content', 'category')

class PortfolioTopicsSerializer(serializers.ModelSerializer):
  class Meta:
    model = PortfolioTopics
    fields = ('id', 'date', 'content')

class ActivityTopicsSerializer(serializers.ModelSerializer):
  class Meta:
    model = ActivityTopics
    fields = ('id', 'date', 'content', 'category')
    