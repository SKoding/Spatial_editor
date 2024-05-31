from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework_gis.filters import GeoFilterSet
from .models import Farm
from .serializer import farmSerializer

# Create your views here.
class farmViewSet(viewsets.ModelViewSet):
    queryset = Farm.objects.all() #manager that returns queryset object same as SELECT * ALL FROM farms
    serializer_class = farmSerializer