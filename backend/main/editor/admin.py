from django.contrib import admin
#from django.contrib.gis import admin as gisAdmin
from .models import Farm
#Using Leaflet because OSMGeoadmin refused
from leaflet.admin import LeafletGeoAdmin
from leaflet_admin_list.admin import LeafletAdminListMixin


# Register your models here.
# class farmAdmin(LeafletGeoAdminMixin, admin.StackedInline):
#     list_display = ('gid','begin',)
#     search_fields = ('begin',)
#     ordering = ('gid',)

admin.site.register(Farm,LeafletGeoAdmin)