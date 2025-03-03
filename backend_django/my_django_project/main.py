import os

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'my_django_project.settings')

from django import setup
setup(set_prefix=False)

from django_app.models import ProjectTopics

# データを追加する
# project_topics = ProjectTopics(date='2022-10-10', content='[プロジェクト]「プロジェクト名10」デプロイされました。')
# project_topics.save()

# データを取得する
project_topics = ProjectTopics.objects.all()
print(project_topics)

for project_topic in project_topics:
  print("id: ", project_topic.id)
  print("date: ", project_topic.date)
  print("content: ", project_topic.content)
  print("created_at: ", project_topic.created_at)
  print("updated_at: ", project_topic.updated_at)
  print("--------------------")

# # データを更新する
# project_topics = ProjectTopics.objects.get(id=1)
# project_topics.content = '[プロジェクト]「プロジェクト名1」デプロイされました。'
# project_topics.save()

# # データを削除する
# project_topics = ProjectTopics.objects.get(id=1)
# project_topics.delete()