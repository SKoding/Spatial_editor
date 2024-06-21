from django.db import models
from django.contrib.gis.db import models as gis_models
from django.utils.translation import gettext_lazy as _


# Create your models here.
    
class factoryAll(gis_models.Model):
    gid = models.IntegerField(unique=True, primary_key=True)
    feature = models.CharField(_('feature'),max_length=24)
    division = models.CharField(_('division'),max_length=24)
    area =models.IntegerField()
    geom = gis_models.MultiPolygonField(srid=4326)

    class Meta:
        db_table = 'data_all'
        managed = False
        verbose_name =('Factory')
        verbose_name_plural = ('Factories') 
    
    def __str__(self):
        """Return string representation."""
        return self.division
    
class kapsiwonTea(gis_models.Model):
    gid = models.IntegerField(unique=True, primary_key=True)
    feature = models.CharField(_('feature'),max_length=24)
    field_code = models.CharField(_('division'),max_length=24)
    area =models.IntegerField()
    geom = gis_models.MultiPolygonField(srid=4326)

    class Meta:
        db_table = 'kapsiwon'
        managed = False
        verbose_name =('Kapsiwon Tea Plantation')
        verbose_name_plural = ('Kapsiwon Tea PLantations') 
    
    def __str__(self):
        """Return string representation."""
        return self.field_code
    
class kapsiwonFeatures(gis_models.Model):
    gid = models.IntegerField(unique=True, primary_key=True)
    feature = models.CharField(_('feature'),max_length=24)
    name = models.CharField(_('division'),max_length=24)
    geom = gis_models.MultiPolygonField(srid=4326)

    class Meta:
        db_table = 'kapsiwon_features'
        managed = False
        verbose_name =('Kapsiwon Features') 
    
    def __str__(self):
        """Return string representation."""
        return self.name

class kapsiwonPoints(gis_models.Model):
    gid = models.IntegerField(unique=True, primary_key=True)
    feature = models.CharField(_('feature'),max_length=24)
    name = models.CharField(_('division'),max_length=24)
    geom = gis_models.MultiPolygonField(srid=4326)

    class Meta:
        db_table = 'kapsiwon_points'
        managed = False
        verbose_name =('Kapsiwon Points') 
    
    def __str__(self):
        """Return string representation."""
        return self.name
    
class taitoTea(gis_models.Model):
    gid = models.IntegerField(unique=True, primary_key=True)
    feature = models.CharField(_('feature'),max_length=24)
    field_code = models.CharField(_('division'),max_length=24)
    area =models.IntegerField()
    geom = gis_models.MultiPolygonField(srid=4326)

    class Meta:
        db_table = 'taito'
        managed = False
        verbose_name =('Taito Tea Plantation')
        verbose_name_plural = ('Taito Tea PLantations') 
    
    def __str__(self):
        """Return string representation."""
        return self.field_code
    
class taitoFeatures(gis_models.Model):
    gid = models.IntegerField(unique=True, primary_key=True)
    feature = models.CharField(_('feature'),max_length=24)
    name = models.CharField(_('division'),max_length=24)
    geom = gis_models.MultiPolygonField(srid=4326)

    class Meta:
        db_table = 'taito_features'
        managed = False
        verbose_name =('Taito Features') 
    
    def __str__(self):
        """Return string representation."""
        return self.name
    
class taitoPoints(gis_models.Model):
    gid = models.IntegerField(unique=True, primary_key=True)
    feature = models.CharField(_('feature'),max_length=24)
    name = models.CharField(_('division'),max_length=24)
    geom = gis_models.MultiPolygonField(srid=4326)

    class Meta:
        db_table = 'taito_points'
        managed = False
        verbose_name =('Taito Points') 
    
    def __str__(self):
        """Return string representation."""
        return self.name

class mokongTea(gis_models.Model):
    gid = models.IntegerField(unique=True, primary_key=True)
    feature = models.CharField(_('feature'),max_length=24)
    field_code = models.CharField(_('division'),max_length=24)
    area =models.IntegerField()
    geom = gis_models.MultiPolygonField(srid=4326)

    class Meta:
        db_table = 'mokong'
        managed = False
        verbose_name =('Mokong Tea Plantation')
        verbose_name_plural = ('Mokong Tea PLantations') 
    
    def __str__(self):
        """Return string representation."""
        return self.field_code
    
class mokongFeatures(gis_models.Model):
    gid = models.IntegerField(unique=True, primary_key=True)
    feature = models.CharField(_('feature'),max_length=24)
    name = models.CharField(_('division'),max_length=24)
    geom = gis_models.MultiPolygonField(srid=4326)

    class Meta:
        db_table = 'mokong_features'
        managed = False
        verbose_name =('Taito Features') 
    
    def __str__(self):
        """Return string representation."""
        return self.name
    
class mokongPoints(gis_models.Model):
    gid = models.IntegerField(unique=True, primary_key=True)
    feature = models.CharField(_('feature'),max_length=24)
    name = models.CharField(_('division'),max_length=24)
    geom = gis_models.MultiPolygonField(srid=4326)

    class Meta:
        db_table = 'mokong_points'
        managed = False
        verbose_name =('Mokong Points') 
    
    def __str__(self):
        """Return string representation."""
        return self.name