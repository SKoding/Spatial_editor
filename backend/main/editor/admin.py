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

class factoryAllAdmin(LeafletGeoAdmin):
    list_display = ('feature', 'division', 'area',)
    search_fields = ('feature', 'division')
    # list_filter = ('created_at', 'updated_at')

    settings_overrides = {
         # Center the map at a specific location
        'DEFAULT_ZOOM': 12,        # Default zoom level
        'MIN_ZOOM': 3,             # Minimum zoom level
        'MAX_ZOOM': 20,            # Maximum zoom level
        'TILES': [
            ('Google Hybrid', 'http://mt0.google.com/vt/lyrs=y&hl=en&x={x}&y={y}&z={z}', {'attribution': '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}),
            ('OpenStreetMap', 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {'attribution': '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'})
        ],
    }

class kapsiwonAllAdmin(LeafletGeoAdmin):
    list_display = ('feature', 'field_code', 'area',)
    search_fields = ('feature', 'field_code')
    # list_filter = ('created_at', 'updated_at')

    settings_overrides = {
         # Center the map at a specific location
        'DEFAULT_ZOOM': 12,        # Default zoom level
        'MIN_ZOOM': 3,             # Minimum zoom level
        'MAX_ZOOM': 20,            # Maximum zoom level
        'TILES': [
            ('Google Hybrid', 'http://mt0.google.com/vt/lyrs=y&hl=en&x={x}&y={y}&z={z}', {'attribution': '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}),
            ('OpenStreetMap', 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {'attribution': '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'})
        ],
    }

class taitoAllAdmin(LeafletGeoAdmin):
    list_display = ('feature', 'field_code', 'area',)
    search_fields = ('feature', 'field_code')
    # list_filter = ('created_at', 'updated_at')

    settings_overrides = {
         # Center the map at a specific location
        'DEFAULT_ZOOM': 12,        # Default zoom level
        'MIN_ZOOM': 3,             # Minimum zoom level
        'MAX_ZOOM': 20,            # Maximum zoom level
        'TILES': [
            ('Google Hybrid', 'http://mt0.google.com/vt/lyrs=y&hl=en&x={x}&y={y}&z={z}', {'attribution': '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}),
            ('OpenStreetMap', 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {'attribution': '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}),
            ('Google Terain', 'http://mt0.google.com/vt/lyrs=p&hl=en&x={x}&y={y}&z={z}', {'attribution': '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}),
            
        ],
    }

class mokongAllAdmin(LeafletGeoAdmin):
    list_display = ('feature', 'field_code', 'area',)
    search_fields = ('feature', 'field_code')
    # list_filter = ('created_at', 'updated_at')

    settings_overrides = {
         # Center the map at a specific location
        'DEFAULT_ZOOM': 12,        # Default zoom level
        'MIN_ZOOM': 3,             # Minimum zoom level
        'MAX_ZOOM': 20,            # Maximum zoom level
        'TILES': [
            ('Google Hybrid', 'http://mt0.google.com/vt/lyrs=y&hl=en&x={x}&y={y}&z={z}', {'attribution': '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}),
            ('OpenStreetMap', 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {'attribution': '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'})
        ],
    }
admin.site.register(factoryAll, factoryAllAdmin)
admin.site.register(kapsiwonTea,kapsiwonAllAdmin)
admin.site.register(mokongTea,mokongAllAdmin)
admin.site.register(taitoTea,taitoAllAdmin)
admin.site.register(kapsiwonFeatures,LeafletGeoAdmin)
admin.site.register(taitoFeatures,LeafletGeoAdmin)
admin.site.register(mokongFeatures,LeafletGeoAdmin)
admin.site.register(mokongPoints,LeafletGeoAdmin)
admin.site.register(taitoPoints,LeafletGeoAdmin)
admin.site.register(kapsiwonPoints,LeafletGeoAdmin)