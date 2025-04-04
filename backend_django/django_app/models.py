from django.db import models
from django.utils import timezone

# Create your models here.

# 全てのモデルに共通する項目を定義する
class BaseMeta(models.Model):
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)

  class Meta:
    abstract = True  # 抽象クラスとして定義する


# Util: トピックスカテゴリ
class TopicsCategory(BaseMeta):
  id = models.AutoField(primary_key=True)
  category_name = models.CharField(max_length=100)

  class Meta:
    db_table = 'topics_category'
    verbose_name_plural = 'Util_トピックスカテゴリ'

  def __str__(self):
    return self.category_name

# Util: 料金プラン
class PricingPlan(BaseMeta):
  id = models.AutoField(primary_key=True)
  plan_name = models.CharField(max_length=100)
  has_creatable_project = models.BooleanField(default=True)
  cnt_project_limit = models.IntegerField(default=1)
  cnt_project = models.IntegerField(default=0)
  price = models.IntegerField()
  description = models.TextField()

  class Meta:
    db_table = 'pricing_plan'
    verbose_name_plural = 'Util_料金プラン'

  def __str__(self):
    return self.plan_name

# Util: Tipsカテゴリ
class TipsCategory(BaseMeta):
  id = models.AutoField(primary_key=True)
  tips_name = models.CharField(max_length=100)
  tips_path = models.CharField(max_length=100, null=True, default='tips')

  class Meta:
    db_table = 'tips_category'
    verbose_name_plural = 'Util_Tipsカテゴリ'

  def __str__(self):
    return self.tips_name

  

# ダッシュボード: プロジェクトのトピック一覧を管理するAPI
class ProjectTopics(BaseMeta):
  id = models.AutoField(primary_key=True)
  date = models.DateField()
  content = models.CharField(max_length=1000)
  category = models.ForeignKey(TopicsCategory, on_delete=models.PROTECT, null=True, default=1)  # デフォルト値: 1(プロジェクト)

  class Meta:
    db_table = 'project_topics'  # テーブル名を指定する
    verbose_name_plural = 'ダッシュボード_プロジェクトのトピック一覧'  # 管理画面で表示されるモデル名を指定する

  def __str__(self):
    return self.content  # 管理画面で表示されるモデルの名称を指定する
    
# ダッシュボード: ポートフォリオのトピック一覧を管理するAPI
class PortfolioTopics(BaseMeta):
  id = models.AutoField(primary_key=True)
  date = models.DateField()
  content = models.CharField(max_length=1000)

  class Meta:
    db_table = 'portfolio_topics'
    verbose_name_plural = 'ダッシュボード_ポートフォリオのトピック一覧'

  def __str__(self):
    return self.content

# ダッシュボード: 活動のトピック一覧を管理するAPI
class ActivityTopics(BaseMeta):
  id = models.AutoField(primary_key=True)
  date = models.DateField()
  content = models.CharField(max_length=1000)
  category = models.ForeignKey(TopicsCategory, on_delete=models.PROTECT, null=True)

  class Meta:
    db_table = 'activity_topics'
    verbose_name_plural = 'ダッシュボード_活動のトピック一覧'

  def __str__(self):
    return self.content

# マイページ: ユーザープロフィールを管理するAPI
class MypageUserProfile(BaseMeta):
  id = models.AutoField(primary_key=True)
  name = models.CharField(max_length=255)
  account_id = models.CharField(max_length=255, unique=True)
  password = models.CharField(max_length=255)
  email = models.CharField(max_length=255, unique=True)
  zip = models.CharField(max_length=7)
  address = models.CharField(max_length=255)
  phone = models.CharField(max_length=11, null=True)
  member_type = models.ForeignKey(PricingPlan, on_delete=models.PROTECT, null=True)

  class Meta:
    db_table = 'mypage_user_profile'
    verbose_name_plural = 'マイページ_ユーザープロフィール'

  def __str__(self):
    return self.name

# 開発Tips: Tips一覧を管理するAPI
class TipsContents(BaseMeta):
  id = models.AutoField(primary_key=True)
  title = models.CharField(max_length=255)
  date = models.DateField()
  content = models.TextField()
  category = models.ForeignKey(TipsCategory, on_delete=models.PROTECT, null=True)

  class Meta:
    db_table = 'tips'
    verbose_name_plural = 'Tips_一覧'

  def __str__(self):
    return self.title