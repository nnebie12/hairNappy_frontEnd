function showModal(message, callback) {
    const modal = document.getElementById('successModal');
    const modalMessage = document.getElementById('modalMessage');
    const closeButton = document.querySelector('.close-button');

    modalMessage.textContent = message;
    modal.style.display = 'block';

    closeButton.onclick = function() {
        modal.style.display = 'none';
        if (callback) {
            callback();
        }
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
            if (callback) {
                callback();
            }
        }
    }
}

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
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formObject),
    })
    .then(response => response.text().then(text => {
        const jsonStart = text.indexOf('{');
        const jsonEnd = text.lastIndexOf('}') + 1;
        const jsonResponse = text.substring(jsonStart, jsonEnd);
        return JSON.parse(jsonResponse);
    }))
    .then(data => {
        if (data.status === 'success') {
            localStorage.setItem('token', data.token);
            showModal('Connexion réussie!', () => {
                window.location.href = '../View/index.html';
            });
        } else {
            alert('Erreur de connexion: ' + (data.error || ''));
        }
    })
    .catch(error => {
        alert('Erreur lors de la connexion: ' + error.message);
    });
});
