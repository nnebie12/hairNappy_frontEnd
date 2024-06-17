document.addEventListener('DOMContentLoaded', function () {
    const token = localStorage.getItem('token');
    const menu = token ? 'menu_logged_in.html' : 'menu_logged_out.html';
    fetch(menu)
        .then(response => response.text())
        .then(data => {
            document.getElementById('menuContainer').innerHTML = data;
            if(token) {
                const logoutButton = document.getElementById('logout-button');
                logoutButton.onclick = () => {
                    const choice = confirm('Êtes-vous sûr de vouloir vous déconnecter ?');
                    if(choice) {
                        localStorage.removeItem('token');
                        window.location.href = '../View/index.html';
                    }
                }
            }
        });
});
