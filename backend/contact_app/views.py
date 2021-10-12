from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from contact_app.serializers import SubjectSerializer, ContactSerializer
from contact_app.models import Subject, Contact

class SubjectViewSet(ModelViewSet):
    queryset = Subject.objects.all()
    serializer_class = SubjectSerializer

class ContactViewSet(ModelViewSet):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer
