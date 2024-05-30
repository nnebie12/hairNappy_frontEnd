// Obtenez l'icône de localisation
var locationIcon = document.querySelector('.location-icon');

// Obtenez la modal
var modal = document.getElementById("myModal");

// Obtenez le bouton pour fermer la modal
var closeBtn = document.querySelector('.close');

// Lorsque l'utilisateur clique sur l'icône de localisation, ouvrez la modal
locationIcon.addEventListener('click', function() {
    modal.style.display = "block";
});

// Lorsque l'utilisateur clique sur le bouton de fermeture, fermez la modal
closeBtn.addEventListener('click', function() {
    modal.style.display = "none";
});

// Fermez également la modal si l'utilisateur clique en dehors de celle-ci
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};