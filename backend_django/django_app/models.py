from django.db import models
from django.utils import timezone

# Create your models here.

# 全てのモデルに共通する項目を定義する
class BaseMeta(models.Model):
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)

  class Meta:
    abstract = True  # 抽象クラスとして定義する

# ダッシュボード: プロジェクトのトピック一覧を取得するAPI
class ProjectTopics(BaseMeta):
  topic_id = models.AutoField(primary_key=True)
  date = models.DateField()
  content = models.CharField(max_length=1000)

  class Meta:
    db_table = 'project_topics'
    verbose_name_plural = 'プロジェクトのトピック一覧'  # 管理画面で表示されるモデル名を指定する

  def __str__(self):
    return self.content  # 管理画面で表示されるモデルの名称を指定する
    