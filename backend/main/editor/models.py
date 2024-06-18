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
    