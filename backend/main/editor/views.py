from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import viewsets, status
from rest_framework_gis.filters import GeoFilterSet, InBBoxFilter
from .models import factoryAll
from .serializer import factorySerializer

# Create your views here.

class factoryViewSet(viewsets.ModelViewSet):
    queryset = factoryAll.objects.all() #manager that returns queryset object same as SELECT * ALL FROM farms
    serializer_class = factorySerializer
    # bbox_filter_field = 'geom'
    # filter_backends = (InBBoxFilter,)  # Enable bounding box filtering
    # bbox_filter_include_overlapping = True 
