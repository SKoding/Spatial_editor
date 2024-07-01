// utils.js

export function convertToKML(data) {
  let kml = `<?xml version="1.0" encoding="UTF-8"?>
  <kml xmlns="http://www.opengis.net/kml/2.2">
    <Document>
      ${data.features.map((feature, index) => {
        const coordinates = feature.geometry.coordinates.flat(2).map(coords => coords.join(',')).join(' ');
        return `
          <Placemark>
            <name>Feature ${index + 1}</name>
            <Polygon>
              <outerBoundaryIs>
                <LinearRing>
                  <coordinates>${coordinates}</coordinates>
                </LinearRing>
              </outerBoundaryIs>
            </Polygon>
          </Placemark>
        `;
      }).join('')}
    </Document>
  </kml>`;

  return kml;
}
