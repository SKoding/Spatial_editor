# widgets.py
# Edit as 2D and save as 3D
from django.contrib.gis.geos import GEOSGeometry
from leaflet.forms.widgets import LeafletWidget

class Leaflet3DGeoAdmin(LeafletWidget):
    def format_value(self, value):
        if value and isinstance(value, GEOSGeometry):
            # Convert 3D/4D geometry to 2D for visualization
            value_2d = value.clone()
            value_2d.coord_dim = 2
            return super().format_value(value_2d)
        return super().format_value(value)

    def value_from_datadict(self, data, files, name):
        value = super().value_from_datadict(data, files, name)
        if value:
            # Convert the geometry back to 3D with Z values set to 0
            geom = GEOSGeometry(value)
            geom.coord_dim = 3
            return geom
        return value
