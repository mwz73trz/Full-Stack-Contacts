from rest_framework.serializers import ModelSerializer, StringRelatedField
from contact_app.models import Subject, Contact

class SubjectSerializer(ModelSerializer):
    class Meta:
        model = Subject
        fields = ['id', 'title', 'description', 'user', 'contacts']
        depth = 1

    user = StringRelatedField()

class ContactSerializer(ModelSerializer):
    class Meta:
        model = Contact
        fields = '__all__'