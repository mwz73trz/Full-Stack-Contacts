from django.db import models

class Subject(models.Model):
    title = models.CharField(max_length=100)
    description = models.CharField(max_length=256)

    def __str__(self):
        return f"{self.title}"

class Contact(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    street = models.CharField(max_length=200)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    zip = models.CharField(max_length=5, default="00000")
    phone= models.CharField(max_length=12, default="000-000-0000")
    email = models.CharField(max_length=150)
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE, related_name="contacts")

    def __str__(self):
        return f"{self.first_name} {self.last_name}"
