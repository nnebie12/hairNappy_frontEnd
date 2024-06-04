document.addEventListener('DOMContentLoaded', function() {
    const token = localStorage.getItem('token');

    if (!token) {
        alert('Vous devez être connecté pour accéder à cette page.');
        window.location.href = '../View/login.html';
        return;
    }

    fetch('http://localhost:8000/api/user', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => {
        if (!response.ok) {
            return response.text().then(text => { throw new Error(text) });
        }
        return response.json();
    })
    .then(data => {
        document.getElementById('nom').innerText = data.nom;
        document.getElementById('prenom').innerText = data.prenom;
        document.getElementById('ville').innerText = data.ville;
        document.getElementById('pays').innerText = data.pays;
        document.getElementById('codePostale').innerText = data.codePostale;
        document.getElementById('email').innerText = data.email;
        document.getElementById('numeroDeTelephone').innerText = data.numeroDeTelephone;

        if (data.isProfessional) {
            document.getElementById('proFields').style.display = 'block';
            document.getElementById('entreprise').innerText = data.entreprise;
            document.getElementById('siret').innerText = data.siret;
        }
    })
    .catch(error => {
        alert('Erreur lors de la récupération des données de l\'utilisateur: ' + error.message);
    });

    document.getElementById('delete-account').addEventListener('click', function() {
        if (confirm('Êtes-vous sûr de vouloir supprimer votre compte ?')) {
            fetch('http://localhost:8000/api/user', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(response => {
                if (!response.ok) {
                    return response.text().then(text => { throw new Error(text) });
                }
                return response.json();
            })
            .then(data => {
                localStorage.removeItem('token');
                alert('Compte supprimé avec succès!');
                window.location.href = 'login.html';
            })
            .catch(error => {
                alert('Erreur de suppression du compte: ' + error.message);
            });
        }
    });
});
