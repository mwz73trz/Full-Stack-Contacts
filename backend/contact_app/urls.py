from django.urls import path, include
from rest_framework.routers import DefaultRouter
from contact_app.views import SubjectViewSet, ContactViewSet

router = DefaultRouter()
router.register("subjects", SubjectViewSet, basename="subject")
router.register("contacts", ContactViewSet, basename="contact")

urlpatterns = [
    path("", include(router.urls))
]