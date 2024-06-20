from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import viewsets, status
from rest_framework_gis.filters import GeoFilterSet, InBBoxFilter
from .models import factoryAll, kapsiwonTea, kapsiwonFeatures,taitoTea, taitoFeatures, mokongFeatures, mokongTea
from .serializer import factorySerializer, kapsiwonTeaSerializer, kapsiwonFeatureSerializer, taitoTeaSerializer, taitoFeatureSerializer, mokongTeaSerializer, mokongFeatureSerializer

# Create your views here.

class factoryViewSet(viewsets.ModelViewSet):
    queryset = factoryAll.objects.all() #manager that returns queryset object same as SELECT * ALL FROM farms
    serializer_class = factorySerializer
    # bbox_filter_field = 'geom'
    # filter_backends = (InBBoxFilter,)  # Enable bounding box filtering
    # bbox_filter_include_overlapping = True 

class kapsiwonTeaViewSet(viewsets.ModelViewSet):
    queryset = kapsiwonTea.objects.all() #manager that returns queryset object same as SELECT * ALL FROM farms
    serializer_class = kapsiwonTeaSerializer

class kapsiwonFeatureViewSet(viewsets.ModelViewSet):
    queryset = kapsiwonFeatures.objects.all() #manager that returns queryset object same as SELECT * ALL FROM farms
    serializer_class = kapsiwonFeatureSerializer

class taitoTeaViewSet(viewsets.ModelViewSet):
    queryset = taitoTea.objects.all() #manager that returns queryset object same as SELECT * ALL FROM farms
    serializer_class = taitoTeaSerializer

class taitoFeatureViewSet(viewsets.ModelViewSet):
    queryset = taitoFeatures.objects.all() #manager that returns queryset object same as SELECT * ALL FROM farms
    serializer_class = taitoFeatureSerializer

class mokongTeaViewSet(viewsets.ModelViewSet):
    queryset = mokongTea.objects.all() #manager that returns queryset object same as SELECT * ALL FROM farms
    serializer_class = mokongTeaSerializer

class mokongFeatureViewSet(viewsets.ModelViewSet):
    queryset = mokongFeatures.objects.all() #manager that returns queryset object same as SELECT * ALL FROM farms
    serializer_class = mokongFeatureSerializer

