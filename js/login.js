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
        document.getElementById('userId').value = data.id;
        document.getElementById('nom').value = data.nom;
        document.getElementById('prenom').value = data.prenom;
        document.getElementById('ville').value = data.ville;
        document.getElementById('pays').value = data.pays;
        document.getElementById('codePostale').value = data.codePostale;
        document.getElementById('email').value = data.email;
        document.getElementById('numeroDeTelephone').value = data.numeroDeTelephone;

        if (data.isProfessional) {
            document.getElementById('proFields').style.display = 'block';
            document.getElementById('entreprise').value = data.entreprise;
            document.getElementById('siret').value = data.siret;
        }
    })
    .catch(error => {
        alert('Erreur lors de la récupération des données de l\'utilisateur: ' + error.message);
    });

    document.getElementById('account-form').addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const formObject = {};
        formData.forEach((value, key) => {
            formObject[key] = value;
        });

        fetch('http://localhost:8000/api/user', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(formObject)
        })
        .then(response => {
            if (!response.ok) {
                return response.text().then(text => { throw new Error(text) });
            }
            return response.json();
        })
        .then(data => {
            alert('Compte mis à jour avec succès!');
        })
        .catch(error => {
            alert('Erreur de mise à jour du compte: ' + error.message);
        });
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
