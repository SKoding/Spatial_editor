from django.db import models
from django.contrib.gis.db import models as gis_models
from django.utils.translation import gettext_lazy as _

# Create your models here.
# Create your models here.
class Farm(gis_models.Model):
    gid = models.IntegerField(unique=True, primary_key=True)
    begin = models.CharField(_('location'),max_length=24)
    geom = gis_models.MultiPolygonField(srid=4326)

    class Meta:
        db_table = 'farms'
        managed = False
        verbose_name =('Farm')
        verbose_name_plural = ('Farms') 
    
    def __str__(self):
        """Return string representation."""
        return self.begin

