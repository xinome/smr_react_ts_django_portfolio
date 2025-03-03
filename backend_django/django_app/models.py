from django.db import models
from django.utils import timezone

# Create your models here.

# 全てのモデルに共通する項目を定義する
class BaseMeta(models.Model):
  created_at = models.DateTimeField(default=timezone.datetime.now)
  updated_at = models.DateTimeField(auto_now=True)

  class Meta:
    abstract = True

# ダッシュボード: プロジェクトのトピック一覧を取得するAPI
class ProjectTopics(models.Model):
  topic_id = models.AutoField(primary_key=True)
  date = models.DateField()
  content = models.CharField(max_length=1000)
  created_at = models.DateTimeField(default=timezone.datetime.now)
  updated_at = models.DateTimeField(auto_now=True)

  class Meta:
    db_table = 'project_topics'

  # def __str__(self):
  #   return self.content
    