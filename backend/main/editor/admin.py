from django.contrib import admin
#from django.contrib.gis import admin as gisAdmin
from .models import factoryAll, kapsiwonTea, kapsiwonFeatures, taitoTea, taitoFeatures, mokongTea, mokongFeatures, kapsiwonPoints, taitoPoints, mokongPoints
#Using Leaflet because OSMGeoadmin refused
from leaflet.admin import LeafletGeoAdmin
from leaflet_admin_list.admin import LeafletAdminListMixin


# Register your models here.
# class farmAdmin(LeafletGeoAdminMixin, admin.StackedInline):
#     list_display = ('gid','begin',)
#     search_fields = ('begin',)
#     ordering = ('gid',)
admin.site.register(factoryAll,LeafletGeoAdmin)
admin.site.register(kapsiwonTea,LeafletGeoAdmin)
admin.site.register(kapsiwonFeatures,LeafletGeoAdmin)
admin.site.register(taitoTea,LeafletGeoAdmin)
admin.site.register(taitoFeatures,LeafletGeoAdmin)
admin.site.register(mokongTea,LeafletGeoAdmin)
admin.site.register(mokongFeatures,LeafletGeoAdmin)
admin.site.register(mokongPoints,LeafletGeoAdmin)
admin.site.register(taitoPoints,LeafletGeoAdmin)
admin.site.register(kapsiwonPoints,LeafletGeoAdmin)