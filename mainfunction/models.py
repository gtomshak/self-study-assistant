from django.db import models

# Create your models here.

class FormulaPaper(models.Model):
	fname = models.CharField(max_length=200)
	flink = models.CharField(max_length=300)

	def __str__(self):
		return self.fname
