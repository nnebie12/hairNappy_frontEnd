window.addEventListener('DOMContentLoaded', function () {
    console.log('DOM fully loaded and parsed');
    fetch('menu.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('menuContainer').innerHTML = data;
            console.log('Menu loaded');

            // Après avoir chargé le menu, attachez les écouteurs d'événements
            let toggle = document.querySelector('.toggle');
            let body = document.querySelector('body');

            if (toggle) {
                console.log('Toggle button found');
                toggle.addEventListener('click', function() {
                    body.classList.toggle('open');
                    console.log('Toggle button clicked');
                });
            } else {
                console.error('Toggle button not found');
            }
        })
        .catch(error => {
            console.error('Error loading menu:', error);
        });
});
