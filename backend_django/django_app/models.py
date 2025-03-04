from django.db import models
from django.utils import timezone

# Create your models here.

# 全てのモデルに共通する項目を定義する
class BaseMeta(models.Model):
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)

  class Meta:
    abstract = True  # 抽象クラスとして定義する

# トピックスカテゴリ
class TopicsCategory(BaseMeta):
  id = models.AutoField(primary_key=True)
  category_name = models.CharField(max_length=100)

  class Meta:
    db_table = 'topics_category'
    verbose_name_plural = 'トピックスカテゴリ'

  def __str__(self):
    return self.category_name

# ダッシュボード: プロジェクトのトピック一覧を取得するAPI
class ProjectTopics(BaseMeta):
  id = models.AutoField(primary_key=True)
  date = models.DateField()
  content = models.CharField(max_length=1000)
  category = models.ForeignKey(TopicsCategory, on_delete=models.PROTECT, null=True, default=1)  # デフォルト値: 1(プロジェクト)

  class Meta:
    db_table = 'project_topics'  # テーブル名を指定する
    verbose_name_plural = 'プロジェクトのトピック一覧'  # 管理画面で表示されるモデル名を指定する

  def __str__(self):
    return self.content  # 管理画面で表示されるモデルの名称を指定する
    
# ダッシュボード: ポートフォリオのトピック一覧を取得するAPI
class PortfolioTopics(BaseMeta):
  id = models.AutoField(primary_key=True)
  date = models.DateField()
  content = models.CharField(max_length=1000)

  class Meta:
    db_table = 'portfolio_topics'
    verbose_name_plural = 'ポートフォリオのトピック一覧'

  def __str__(self):
    return self.content

# ダッシュボード: 活動のトピック一覧を取得するAPI
class ActivityTopics(BaseMeta):
  id = models.AutoField(primary_key=True)
  date = models.DateField()
  content = models.CharField(max_length=1000)
  category = models.ForeignKey(TopicsCategory, on_delete=models.PROTECT, null=True)

  class Meta:
    db_table = 'activity_topics'
    verbose_name_plural = '活動のトピック一覧'

  def __str__(self):
    return self.content