from django.db import models

# Create your models here.
class ProjectTopics(models.Model):
  topic_id = models.AutoField(primary_key=True)
  date = models.DateField()
  content = models.CharField(max_length=1000)
  created_at = models.DateField(auto_now_add=True)
  updated_at = models.DateField(auto_now=True)

  class Meta:
    db_table = 'project_topics'

  def __str__(self):
    return self.content
    