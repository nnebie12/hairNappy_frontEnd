document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const formObject = {};
    formData.forEach((value, key) => {
        formObject[key] = value;
    });

    fetch('http://localhost:8000/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(formObject),
    })
    .then(response => {
        if (!response.ok) {
            return response.text().then(text => { throw new Error(text) });
        }
        return response.json();
    })
    .then(data => {
        if (data.status === 'success') {
            // Stocker le token JWT dans le localStorage
            localStorage.setItem('token', data.token);
            alert('Connexion réussie!');
            // Rediriger vers une page protégée ou un tableau de bord
            window.location.href = '/dashboard';
        } else {
            alert('Erreur de connexion: ' + (data.error || ''));
        }
    })
});
