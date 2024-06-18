from rest_framework_gis import serializers
from rest_framework import serializers as serial
from .models import factoryAll


class factorySerializer(serializers.GeoFeatureModelSerializer):
    class Meta:
        model = factoryAll
        fields = ('gid','feature','division','area')
        geo_field = "geom"
