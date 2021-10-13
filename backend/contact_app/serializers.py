from rest_framework.serializers import ModelSerializer
from contact_app.models import Subject, Contact

class SubjectSerializer(ModelSerializer):
    class Meta:
        model = Subject
        fields = ['id', 'title', 'description', 'contacts']
        depth = 1

class ContactSerializer(ModelSerializer):
    class Meta:
        model = Contact
        fields = '__all__'