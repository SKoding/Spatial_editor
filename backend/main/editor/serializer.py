from rest_framework_gis import serializers
from rest_framework import serializers as serial
from .models import Farm

#Farm
class farmSerializer(serializers.GeoFeatureModelSerializer):
    class Meta:
        model = Farm
        fields = ('gid','begin')
        geo_field = "geom"
