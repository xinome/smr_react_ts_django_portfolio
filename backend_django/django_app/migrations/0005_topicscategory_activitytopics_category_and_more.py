# Generated by Django 5.0.1 on 2025-03-04 01:46

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('django_app', '0004_activitytopics_portfoliotopics_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='TopicsCategory',
            fields=[
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('category_name', models.CharField(max_length=100)),
            ],
            options={
                'verbose_name_plural': 'トピックスカテゴリ',
                'db_table': 'topics_category',
            },
        ),
        migrations.AddField(
            model_name='activitytopics',
            name='category',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.PROTECT, to='django_app.topicscategory'),
        ),
        migrations.AddField(
            model_name='projecttopics',
            name='category',
            field=models.ForeignKey(default=1, null=True, on_delete=django.db.models.deletion.PROTECT, to='django_app.topicscategory'),
        ),
    ]
