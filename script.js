let projectMarker; // Global marker variable
let addPointMode = false; // To toggle add point mode

// Initialize the map
const map = L.map('map', {
    zoomControl: false,
    scrollWheelZoom: true,
    doubleClickZoom: false,
    boxZoom: false,
    touchZoom: false,
    preferCanvas: true
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
//L.tileLayer('https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
 //   subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
  //  attribution: '&copy; Google Maps'
//}).addTo(map);

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
        color: 'rgb(0, 0, 0)',
        opacity: .1,
        weight: 2,
        fillColor: '#36363600',
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
        weight: .5,
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
        color: 'rgb(157, 6, 218)',
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
    this.textContent = addPointMode ? 'Click on Map' : 'Add Point';
    this.style.backgroundColor = addPointMode ? '#4caf50' : '#4caf50';
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
        btn.textContent = 'Add Point';
        btn.style.backgroundColor = '#4caf50';
    }
});


async function printA4() {
    const a4Content = document.querySelector('.A4-Paper');

    try {
        // 1. Generate the canvas
        const canvas = await html2canvas(a4Content, {
            useCORS: true,
            scale: 5, // High resolution
            logging: false
        });

        // 2. Convert canvas to a Blob (Binary Large Object)
        canvas.toBlob((blob) => {
            if (blob) {
                // 3. Create a unique URL for the image file
                const url = URL.createObjectURL(blob);
                
                // 4. Open the image in a new tab
                const newTab = window.open();
                if (newTab) {
                    newTab.document.write(`
                        <html>
        <head>
            <title>Image Preview</title>
            <style>
                body {
                    margin: 0;
                    display: flex;
                    justify-content: center;
                    align-items: center; /* Vertically center if image is small */
                    background: #525659;
                    min-height: 100vh;
                    overflow: auto;
                }
                img {
                    /* Responsive constraints */
                    max-width: 95%;      /* Leave a small gap at the sides */
                    max-height: 95vh;    /* Leave a small gap at top/bottom */
                    
                    /* Prevent stretching */
                    width: auto;
                    height: auto;
                    object-fit: contain; 
                    
                    /* Aesthetics */
                    box-shadow: 0 0 20px rgba(0,0,0,0.6);
                    background-color: white; /* Behind the image in case of transparency */
                    margin: 20px;
                }
            </style>
        </head>
        <body>
            <img src="${url}" alt="A4 Map Export" />
        </body>
    </html>
                    `);
                    newTab.document.close();
                } else {
                    alert("Please allow popups to view the image.");
                }

                // Clean up the memory after a delay
                setTimeout(() => URL.revokeObjectURL(url), 10000);
            }
        }, 'image/png');

    } catch (error) {
        console.error("Error generating image preview:", error);
    }
}

async function downloadA4() {
  const a4Content = document.querySelector('.A4-Paper');

  try {
    const canvas = await html2canvas(a4Content, {
      useCORS: true,
      scale: 5,
      logging: false
    });

    canvas.toBlob((blob) => {
      if (!blob) return;

      const url = URL.createObjectURL(blob);

      // ✅ Download instead of opening new tab
      const link = document.createElement("a");
      link.href = url;
      link.download = "A4-Map.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setTimeout(() => URL.revokeObjectURL(url), 10000);
    }, "image/png");

  } catch (error) {
    console.error("Error generating image preview:", error);
  }
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
// 1. Ensure the upload pane exists (Place this near your other map.createPane calls)
if (!map.getPane("uploadPane")) {
    map.createPane("uploadPane");
    map.getPane("uploadPane").style.zIndex = 450; 
}

let uploadedLayer = null; 

// 2. Attach the event listener for the file input
document.getElementById('geojsoupload').addEventListener('change', function (e) {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.name.toLowerCase().endsWith('.geojson') && !file.name.toLowerCase().endsWith('.json')) {
        alert("Please upload a valid GeoJSON file.");
        return;
    }

    const reader = new FileReader();
    reader.onload = function (event) {
        try {
            const geoData = JSON.parse(event.target.result);

            // Remove previous uploaded layer if it exists
            if (uploadedLayer) {
                map.removeLayer(uploadedLayer);
            }

            // Add new GeoJSON layer
            uploadedLayer = L.geoJSON(geoData, {
                pane: "uploadPane",
                style: function () {
                    return {
                        color: "#000000",
                        weight: 3,
                        fillColor: "#3388ff",
                        fillOpacity: 0
                    };
                },
                pointToLayer: function (feature, latlng) {
                    return L.circleMarker(latlng, {
                        radius: 6,
                        color: "#ff0000",
                        fillColor: "#ff0000",
                        fillOpacity: 0.8
                    });
                },
                onEachFeature: function (feature, layer) {
                    if (feature.properties) {
                        const popupContent = Object.entries(feature.properties)
                            .map(([k, v]) => `<strong>${k}:</strong> ${v}`)
                            .join("<br>");
                        layer.bindPopup(popupContent);
                    }
                }
            }).addTo(map);

            // Zoom map to the uploaded data
            if (uploadedLayer.getBounds().isValid()) {
                map.fitBounds(uploadedLayer.getBounds());
            }

        } catch (err) {
            console.error("GeoJSON Parse Error:", err);
            alert("Error parsing GeoJSON: " + err.message);
        }
    };
    reader.readAsText(file);
});
