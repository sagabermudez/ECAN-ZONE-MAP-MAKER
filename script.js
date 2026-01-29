let projectMarker; // Global marker variable
let addPointMode = false; // To toggle add point mode

// Initialize the map
const map = L.map('map', {
    zoomControl: false,
    scrollWheelZoom: true,
    doubleClickZoom: false,
    boxZoom: false,
    touchZoom: false
}).setView([8.856578, 117.497406], 13);

const svgDefs = document.createElementNS("http://www.w3.org/2000/svg", "defs");

const pattern = document.createElementNS("http://www.w3.org/2000/svg", "pattern");
pattern.setAttribute("id", "diagonalHatch");
pattern.setAttribute("patternUnits", "userSpaceOnUse");
pattern.setAttribute("width", "8");
pattern.setAttribute("height", "8");
pattern.setAttribute("patternTransform", "rotate(45)");

const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
rect.setAttribute("width", "8");
rect.setAttribute("height", "1");
rect.setAttribute("fill", "black");

pattern.appendChild(rect);
svgDefs.appendChild(pattern);

const svg = document.querySelector("svg");
if (svg) {
  svg.appendChild(svgDefs);
} else {
  map.getPanes().overlayPane.insertAdjacentHTML("beforeend", `<svg><defs>${svgDefs.innerHTML}</defs></svg>`);
}

// Add tile layer
L.tileLayer('', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

L.control.scale({
  metric: true,
  imperial: false,
  maxWidth: 150,
  position: 'bottomleft'
}).addTo(map);

// Move scale into custom container
setTimeout(() => {
  const scaleEl = document.querySelector('.leaflet-control-scale');
  const holder = document.getElementById('leaflet-scale-holder');

  if (scaleEl && holder) {
    holder.appendChild(scaleEl);
  }
}, 0);

// Create custom panes with specific zIndex
map.createPane('10');         // zIndex: 400 (default)
map.createPane('9');      // zIndex: 410
map.createPane('8');           // zIndex: 420
map.createPane('7');      // zIndex: 430
map.createPane('6');            // zIndex: 440
map.createPane('5');         // zIndex: 400 (default)
map.createPane('4');      // zIndex: 410
map.createPane('3');           // zIndex: 420
map.createPane('2');      // zIndex: 430
map.createPane('1');            // zIndex: 440

map.getPane('10').style.zIndex = 400;
map.getPane('9').style.zIndex = 401;
map.getPane('8').style.zIndex = 402;
map.getPane('7').style.zIndex = 403;
map.getPane('6').style.zIndex = 404;
map.getPane('5').style.zIndex = 405;
map.getPane('4').style.zIndex = 406;
map.getPane('3').style.zIndex = 407;
map.getPane('2').style.zIndex = 408;
map.getPane('1').style.zIndex = 409;

// Load GeoJSON
fetch('GeoJSON/Rizal_Boundary_4326.geojson')
  .then(res => res.json())
  .then(data => {
    L.geoJSON(data, {
      pane: '1',
      style: {
        color: '#000000ff',
        weight: 1.5,
        fillColor: '#66b3ff05',
        fillOpacity: 0.3,
      }
    }).addTo(map);
  });

  fetch('GeoJSON/Mangrove.geojson')
   .then((response) => response.json())
  .then((data) => {
    L.geoJSON(data, {
      pane: '2',
        style: {
        color: '#ff0000ff',
        weight: 2,
        fillColor: '#ff0000ff',
        fillOpacity: 0.5
      }
    }).addTo(map);
  });
  
  //fetch('GeoJSON/River.geojson')
  //.then(res => res.json())
 // .then(data => {
    //L.geoJSON(data, {
     // pane: '3',
      //style: {
      //  color: '#007BFF',
       // weight: 1,
       // fillColor: '#66b3ff05',
       // fillOpacity: 0.9
      //}
   // }).addTo(map);
  //});

  fetch('GeoJSON/ECAN Zonation/Core Zone.geojson')
  .then(res => res.json())
  .then(data => {
    L.geoJSON(data, {
      pane: '10',
      style: {
        color: '#ff0004',
        weight: 1,
        fillColor: '#ff0004',
        fillOpacity: 1
      }
    }).addTo(map);
  });

  fetch('GeoJSON/ECAN Zonation/Restricted Use Zone.geojson')
  .then(res => res.json())
  .then(data => {
    L.geoJSON(data, {
      pane: '10',
      style: {
        color: 'blue',
        weight: 1,
        fillColor: 'blue',
        fillOpacity: 1
      }
    }).addTo(map);
  });
  
  fetch('GeoJSON/ECAN Zonation/Controlled Use Zone.geojson')
  .then(res => res.json())
  .then(data => {
    L.geoJSON(data, {
      pane: '10',
      style: {
        color: '#00df00',
        weight: 1,
        fillColor: '#00df00',
        fillOpacity: 1
      }
    }).addTo(map);
  });

  fetch('GeoJSON/ECAN Zonation/Traditional Use Zone.geojson')
  .then(res => res.json())
  .then(data => {
    L.geoJSON(data, {
      pane: '10',
      style: {
        color: '#75542fff',
        weight: 1,
        fillColor: '#75542fff',
        fillOpacity: 1
      }
    }).addTo(map);
  });

  fetch('GeoJSON/ECAN Zonation/Multiple Use Zone.geojson')
  .then(res => res.json())
  .then(data => {
    L.geoJSON(data, {
      pane: '10',
      style: {
        color: 'yellow',
        weight: 1,
        fillColor: 'yellow',
        fillOpacity: 1
      }
    }).addTo(map);
  });

  fetch('GeoJSON/MMPL.geojson')
  .then(res => res.json())
  .then(data => {
    L.geoJSON(data, {
      style: {
        pane: '2',
        color: '#9d06daff',
        dashArray: '10, 7',   // ← dash length, gap length
        weight: 5,
        fillColor: '#66b3ff05',
        fillOpacity: 0.3
      }
    }).addTo(map);
  });

  //fetch('GeoJSON/CADC.geojson')
  //.then(res => res.json())
  //.then(data => {
   // L.geoJSON(data, {
     // style: {
       // pane: '2',
        //color: '#0685daff',
        //weight: 5,
        //fillColor: '#66b3ff05',
        //fillOpacity: 0.3
      //}
    //}).addTo(map);
  //});

  fetch('GeoJSON/CADT.geojson')
  .then(res => res.json())
  .then(data => {
    L.geoJSON(data, {
      pane: '2',
      style: {
        color: 'rgb(173, 0, 0)',
        weight: 5,
        dashArray: '10, 10',   // ← dash length, gap length
        fillColor: '#66b3ff05',
        fillOpacity: 0.3
      }
    }).addTo(map);
  });

// Handle the "Apply" button
function applyInput() {
    const project = document.getElementById('projectInput').value;
    const location = document.getElementById('locationInput').value;
    const lat = parseFloat(document.getElementById('latitudeInput').value);
    const lng = parseFloat(document.getElementById('longitudeInput').value);

    if (!isNaN(lat) && !isNaN(lng)) {
        map.setView([lat, lng], 13);

        // Remove existing marker
        if (projectMarker) {
            map.removeLayer(projectMarker);
        }

        // Add new marker
        projectMarker = L.circleMarker([lat, lng], {
            pane: '1',
            radius: 7,               // Size of the circle
            fillColor: "#ffffff",    // Fill color (white)
            color: "#000000",        // Border color (black)
            weight: 2,               // Border thickness
            opacity: 1,
            fillOpacity: 1
        }).addTo(map)
    }

    // Update outputs
    document.getElementById('projectOutput').textContent = ' ' + project;
    document.getElementById('locationOutput').textContent = ' ' + location;
    document.getElementById('coordinatesOutput').textContent = ` ${lat}, ${lng}`;
}

// Add Point Button Logic
document.getElementById('addPointBtn').addEventListener('click', function () {
    addPointMode = !addPointMode;
    this.textContent = addPointMode ? '✅ Click on Map' : '➕ Add Point';
    this.style.backgroundColor = addPointMode ? '#d4f1d4' : 'white';
});

// Handle map click to add point
map.on('click', function (e) {
    if (addPointMode) {
        const { lat, lng } = e.latlng;

        // Fill the input fields with clicked coordinates
        document.getElementById('latitudeInput').value = lat.toFixed(6);
        document.getElementById('longitudeInput').value = lng.toFixed(6);

        // Call applyInput to update map and fields
        applyInput();

        // Turn off add mode
        addPointMode = false;
        const btn = document.getElementById('addPointBtn');
        btn.textContent = '➕ Add Point';
        btn.style.backgroundColor = 'white';
    }
});


function printA4() {
    const a4Content = document.querySelector('.A4-Paper');
    const mapContainer = a4Content.querySelector('.leaflet-container');

    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
        <html>
        <head>
            <title>Print</title>
            <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
            <style>
                body {
                    margin: 0;
                    padding: 0;
                    background: white;
                }

                @media print {
                    body {
                        -webkit-print-color-adjust: exact;
                        print-color-adjust: exact;
                    }
                }

                ${getAllStyleRules()}
            </style>
        </head>
        <body>
            ${a4Content.outerHTML}
            <script>
                window.onload = function () {
                    window.print();
                    window.onafterprint = function () {
                        window.close();
                    }
                }
            <\/script>
        </body>
        </html>
    `);
    printWindow.document.close();
}

function getAllStyleRules() {
    let cssText = '';
    for (let sheet of document.styleSheets) {
        try {
            for (let rule of sheet.cssRules) {
                cssText += rule.cssText;
            }
        } catch (e) {
            console.warn('Stylesheet access denied: ', sheet.href);
        }
    }
    return cssText;
}

function saveAsImage() {
    const element = document.querySelector('.A4-Paper');
    const map = window.map; // Replace with your Leaflet map variable name if different

    // Wait until all tiles are loaded
    if (map._tilesToLoad > 0) {
        map.once('load', () => {
            captureWithHtml2Canvas(element);
        });
    } else {
        captureWithHtml2Canvas(element);
    }
}

