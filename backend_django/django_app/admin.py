from django.contrib import admin

# Register your models here.
from .models import ProjectTopics

# admin.site.register(ProjectTopics)

@admin.register(ProjectTopics)
class ProjectTopicsAdmin(admin.ModelAdmin):
  Fields = ('topic_id', 'date', 'content')  # 編集画面で表示する項目を指定する
  list_display = ('topic_id', 'date', 'content', 'created_at', 'updated_at')  # 一覧画面で表示する項目を指定する
  list_display_links = ('topic_id', )  # 一覧画面でリンクにする項目を指定する

  search_fields = ('content', )  # 検索ボックスを表示する項目を指定する
  list_filter = ('date', )  # フィルターを表示する項目を指定する
  list_editable = ('date', 'content')  # 一覧画面で編集可能にする項目を指定する　※list_display_linksと同時に指定することはできない
  