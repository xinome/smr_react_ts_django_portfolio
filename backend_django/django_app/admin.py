from django.contrib import admin

from .models import (
  TopicsCategory, PricingPlan,
  ProjectTopics, PortfolioTopics, ActivityTopics,
  MypageUserProfile,
)

# Register your models here.

# admin.site.register(ProjectTopics)

# Utility
@admin.register(TopicsCategory)
class TopicsCategoryAdmin(admin.ModelAdmin):
  Fields = ('id', 'category_name')
  list_display = ('id', 'category_name', 'created_at', 'updated_at')
  list_display_links = ('category_name', )

  search_fields = ('category_name', )
  list_filter = ('category_name', )

@admin.register(PricingPlan)
class PricingPlanAdmin(admin.ModelAdmin):
  Fields = ('id', 'plan_name', 'price', 'description')
  list_display = ('id', 'plan_name', 'has_creatable_project', 'cnt_project_limit', 'cnt_project', 'price', 'created_at', 'updated_at')
  list_display_links = ('plan_name', )

  search_fields = ('plan_name', 'price', )
  list_filter = ('plan_name', 'price', )



# Dashboard
@admin.register(ProjectTopics)
class ProjectTopicsAdmin(admin.ModelAdmin):
  Fields = ('id', 'date', 'content')  # 編集画面で表示する項目を指定する
  list_display = ('id', 'date', 'content', 'category', 'created_at', 'updated_at')  # 一覧画面で表示する項目を指定する
  list_display_links = ('id', )  # 一覧画面でリンクにする項目を指定する

  search_fields = ('content', )  # 検索ボックスを表示する項目を指定する
  list_filter = ('date', )  # フィルターを表示する項目を指定する
  list_editable = ('date', 'content', 'category')  # 一覧画面で編集可能にする項目を指定する　※list_display_linksと同時に指定することはできない

@admin.register(PortfolioTopics)
class PortfolioTopicsAdmin(admin.ModelAdmin):
  Fields = ('id', 'date', 'content')
  list_display = ('id', 'date', 'content', 'created_at', 'updated_at')
  list_display_links = ('id', )

  search_fields = ('content', )
  list_filter = ('date', )
  list_editable = ('date', 'content')

@admin.register(ActivityTopics)
class ActivityTopicsAdmin(admin.ModelAdmin):
  Fields = ('id', 'date', 'content')
  list_display = ('id', 'date', 'content', 'category', 'created_at', 'updated_at')
  list_display_links = ('id', )

  search_fields = ('content', )
  list_filter = ('date', )
  list_editable = ('date', 'content', 'category')



# Mypage
@admin.register(MypageUserProfile)
class MypageUserProfileAdmin(admin.ModelAdmin):
  Fields = ('id', 'name', 'account_id', 'password', 'email', 'zip', 'address', 'phone', 'member_type')
  list_display = ('id', 'name', 'account_id', 'password', 'email', 'zip', 'address', 'phone', 'member_type', 'created_at', 'updated_at')
  list_display_links = ('id', )

  search_fields = ('name', 'account_id', 'email', 'zip', 'address', 'phone', 'member_type')
  list_filter = ('name', 'account_id', 'email', 'zip', 'address', 'phone', 'member_type')
  # list_editable = ('name', 'account_id', 'email', 'zip', 'address', 'member_type')