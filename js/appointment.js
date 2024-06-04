document.addEventListener('DOMContentLoaded', function() {
    const token = localStorage.getItem('token');
    if (!token) {
        alert('Vous devez être connecté pour prendre un rendez-vous.');
        window.location.href = '../View/login.html';
    }
});

document.getElementById('appointment-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
        alert('Vous devez être connecté pour prendre un rendez-vous.');
        window.location.href = '../View/login.html';
        return;
    }

    const formData = new FormData(event.target);
    const formObject = {};
    formData.forEach((value, key) => {
        formObject[key] = value;
    });

    fetch('http://localhost:8000/api/appointment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formObject)
    })
    .then(response => response.text().then(text => {
        const jsonStart = text.indexOf('{');
        const jsonEnd = text.lastIndexOf('}') + 1;
        const jsonResponse = text.substring(jsonStart, jsonEnd);
        try {
            return JSON.parse(jsonResponse);
        } catch (error) {
            throw new Error('Invalid JSON: ' + jsonResponse);
        }
    }))
    .then(data => {
        if (data.status === 'success') {
            document.getElementById('appointment-form').style.display = 'none';
            document.getElementById('confirmation').style.display = 'block';
            alert('Le rendez-vous a été pris, vous recevrez la confirmation par SMS.');
        } else {
            alert('Une erreur est survenue : ' + data.message);
        }
    })
    .catch(error => {
        console.error('Erreur:', error);
        alert('Une erreur est survenue : ' + error.message);
    });
});
