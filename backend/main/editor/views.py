from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import viewsets, status
from rest_framework_gis.filters import GeoFilterSet, InBBoxFilter
from .models import factoryAll, kapsiwonTea, kapsiwonFeatures,taitoTea, taitoFeatures, mokongFeatures, mokongTea, mokongPoints, kapsiwonPoints, taitoPoints
from .serializer import factorySerializer, kapsiwonTeaSerializer, kapsiwonFeatureSerializer, taitoTeaSerializer, taitoFeatureSerializer, mokongTeaSerializer, mokongFeatureSerializer, mokongPointSerializer,kapsiwonPointSerializer, taitoPointSerializer
# Handle PDF print
import requests
from django.http import HttpResponse
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

class kapsiwonPointViewSet(viewsets.ModelViewSet):
    queryset = kapsiwonPoints.objects.all() #manager that returns queryset object same as SELECT * ALL FROM farms
    serializer_class = kapsiwonPointSerializer

class taitoTeaViewSet(viewsets.ModelViewSet):
    queryset = taitoTea.objects.all() #manager that returns queryset object same as SELECT * ALL FROM farms
    serializer_class = taitoTeaSerializer

class taitoFeatureViewSet(viewsets.ModelViewSet):
    queryset = taitoFeatures.objects.all() #manager that returns queryset object same as SELECT * ALL FROM farms
    serializer_class = taitoFeatureSerializer

class taitoPointViewSet(viewsets.ModelViewSet):
    queryset = taitoPoints.objects.all() #manager that returns queryset object same as SELECT * ALL FROM farms
    serializer_class = taitoPointSerializer

class mokongTeaViewSet(viewsets.ModelViewSet):
    queryset = mokongTea.objects.all() #manager that returns queryset object same as SELECT * ALL FROM farms
    serializer_class = mokongTeaSerializer

class mokongFeatureViewSet(viewsets.ModelViewSet):
    queryset = mokongFeatures.objects.all() #manager that returns queryset object same as SELECT * ALL FROM farms
    serializer_class = mokongFeatureSerializer

class mokongPointViewSet(viewsets.ModelViewSet):
    queryset = mokongPoints.objects.all() #manager that returns queryset object same as SELECT * ALL FROM farms
    serializer_class = mokongPointSerializer

# Map Printing
def print_map(request):
    qgis_server_url = 'http://nandi.tea/'
    params = {
        'SERVICE': 'WMS',
        'VERSION': '1.3.0',
        'REQUEST': 'GetPrint',
        'TEMPLATE': 'YourTemplateName',
        'MAP': '/path/to/your/project.qgz',
        'FORMAT': 'pdf'
    }
    response = requests.get(qgis_server_url, params=params)
    if response.status_code == 200:
        pdf_content = response.content
        return HttpResponse(pdf_content, content_type='application/pdf')
    else:
        return HttpResponse('Failed to generate map', status=500)



