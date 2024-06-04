function toggleForm() {
    var type = document.getElementById('type').value;
    var proFields = document.getElementById('proFields');

    if (type === 'professionnel') {
        proFields.style.display = 'block';
    } else {
        proFields.style.display = 'none';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const token = localStorage.getItem('token');

    if (!token) {
        alert('Vous devez être connecté pour accéder à cette page.');
        window.location.href = '../View/login.html';
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
