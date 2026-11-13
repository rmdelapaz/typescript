// Real answers of shoreline-api, saved once (GET /api/sites/pelican-point, /driftwood-cove, /seal-rock)
export const pelicanPoint = {
  "id": "pelican-point",
  "name": "Pelican Point Beach",
  "town": "Port Marisol",
  "terrain": "sand",
  "accessible": true,
  "latitude": 36.9512,
  "longitude": -122.0461,
  "parking": "Free lot at the end of Pelican Point Road (40 spaces).",
  "description": "A long sandy beach below the bluffs. Busy in summer, so food wrappers and bottle caps pile up near the stairs.",
  "image": {
    "url": "http://localhost:4000/images/sites/pelican-point.jpg",
    "alt": "A wide sandy beach below tall bluffs, with a wooden staircase down the cliff and calm blue water.",
    "width": 1200,
    "height": 675
  }
}

export const driftwoodCove = {
  "id": "driftwood-cove",
  "name": "Driftwood Cove",
  "town": "Port Marisol",
  "terrain": "mixed",
  "accessible": false,
  "latitude": 36.9387,
  "longitude": -122.0219,
  "parking": "Street parking on Cove Lane; arrive early.",
  "description": "A small cove where winter storms leave driftwood, rope and fishing gear tangled at the tide line.",
  "image": {
    "url": "http://localhost:4000/images/sites/driftwood-cove.jpg",
    "alt": "A small curved cove with pale sand, gray driftwood logs along the tide line and dark rocks at each end.",
    "width": 1200,
    "height": 675
  }
}

export const siteNotFound = {
  "error": "not_found",
  "message": "No site with that id."
}
