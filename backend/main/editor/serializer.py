from rest_framework_gis import serializers
from rest_framework import serializers as serial
from .models import factoryAll, kapsiwonTea, kapsiwonFeatures, taitoTea, taitoFeatures, mokongTea, mokongFeatures


class factorySerializer(serializers.GeoFeatureModelSerializer):
    class Meta:
        model = factoryAll
        fields = ('gid','feature','division','area')
        geo_field = "geom"

class kapsiwonTeaSerializer(serializers.GeoFeatureModelSerializer):
    class Meta:
        model = kapsiwonTea
        fields = ('gid','feature','field_code','area')
        geo_field = "geom"

class kapsiwonFeatureSerializer(serializers.GeoFeatureModelSerializer):
    class Meta:
        model = kapsiwonFeatures
        fields = ('gid','feature','name')
        geo_field = "geom"

class taitoTeaSerializer(serializers.GeoFeatureModelSerializer):
    class Meta:
        model = taitoTea
        fields = ('gid','feature','field_code','area')
        geo_field = "geom"

class taitoFeatureSerializer(serializers.GeoFeatureModelSerializer):
    class Meta:
        model = taitoFeatures
        fields = ('gid','feature','name')
        geo_field = "geom"

class mokongTeaSerializer(serializers.GeoFeatureModelSerializer):
    class Meta:
        model = mokongTea
        fields = ('gid','feature','field_code','area')
        geo_field = "geom"

class mokongFeatureSerializer(serializers.GeoFeatureModelSerializer):
    class Meta:
        model = mokongFeatures
        fields = ('gid','feature','name')
        geo_field = "geom"