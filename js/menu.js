window.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    const menus = token ? ['menu_logged_in.html', 'View/menu_logged_in.html'] : ['menu_logged_out.html', 'View/menu_logged_out.html'];
    menus.forEach((template) => {
        loadPartialDom(template, function(html) {
            document.getElementById('menuContainer').innerHTML = html;
            if(token) {
                const logoutButton = document.getElementById('logout-button');
                logoutButton.onclick = () => {
                    const choice = confirm('Êtes-vous sûr de vouloir vous déconnecter ?');
                    if(choice) {
                        localStorage.removeItem('token');
                        window.location.href = '../index.html';
                    }
                }
            }
        });
    })
});
