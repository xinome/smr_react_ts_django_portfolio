from django.contrib import admin

from .models import ProjectTopics, PortfolioTopics, ActivityTopics

# Register your models here.

# admin.site.register(ProjectTopics)

@admin.register(ProjectTopics)
class ProjectTopicsAdmin(admin.ModelAdmin):
  Fields = ('id', 'date', 'content')  # 編集画面で表示する項目を指定する
  list_display = ('id', 'date', 'content', 'created_at', 'updated_at')  # 一覧画面で表示する項目を指定する
  list_display_links = ('id', )  # 一覧画面でリンクにする項目を指定する

  search_fields = ('content', )  # 検索ボックスを表示する項目を指定する
  list_filter = ('date', )  # フィルターを表示する項目を指定する
  list_editable = ('date', 'content')  # 一覧画面で編集可能にする項目を指定する　※list_display_linksと同時に指定することはできない

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
  list_display = ('id', 'date', 'content', 'created_at', 'updated_at')
  list_display_links = ('id', )

  search_fields = ('content', )
  list_filter = ('date', )
  list_editable = ('date', 'content')