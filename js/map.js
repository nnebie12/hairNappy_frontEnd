// On initialise la latitude et la longitude de Paris (centre de la carte)
var lat = 48.852969;
var lon = 2.349903;
var macarte = null;

// Nous initialisons une liste de marqueurs
var villes = {
    "Paris": { "lat": 48.852969, "lon": 2.349903 },
    "Brest": { "lat": 48.383, "lon": -4.500 },
    "Quimper": { "lat": 48.000, "lon": -4.100 },
    "Bayonne": { "lat": 43.500, "lon": -1.467 },
    "Lyon": { "lat": 45.764043, "lon": 4.850000 }
};


// Fonction d'initialisation de la carte
function initMap() {
    // Créer l'objet "macarte" et l'insèrer dans l'élément HTML qui a l'ID "map"
    macarte = L.map('map').setView([lat, lon], 11);
    // Leaflet ne récupère pas les cartes (tiles) sur un serveur par défaut. Nous devons lui préciser où nous souhaitons les récupérer. Ici, openstreetmap.fr
    L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
        // Il est toujours bien de laisser le lien vers la source des données
        attribution: 'données © <a href="//osm.org/copyright">OpenStreetMap</a>/ODbL - rendu <a href="//openstreetmap.fr">OSM France</a>',
        minZoom: 1,
        maxZoom: 20
    }).addTo(macarte);

    // Nous ajoutons un marqueur
    var marker = L.marker([lat, lon]).addTo(macarte);




    // Nous parcourons la liste des villes
    for (ville in villes) {
        var marker1 = L.marker([villes[ville].lat, villes[ville].lon]).addTo(macarte);
        // Nous ajoutons la popup. A noter que son contenu (ici la variable ville) peut être du HTML
        marker1.bindPopup(ville);
           }



}
window.onload = function(){
    // Fonction d'initialisation qui s'exécute lorsque le DOM est chargé
    initMap();
};