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

document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const formObject = {};
    formData.forEach((value, key) => {
        formObject[key] = value;
    });

    if (formObject.password !== formObject.verifyPassword) {
        alert("Les mots de passe ne correspondent pas");
        return;
    }

    delete formObject.verifyPassword;

    fetch('http://localhost:8000/api/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
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
        if (data.status === 'User created!') {
            localStorage.setItem('token', data.token);
            showModal('Inscription réussie! Veuillez vous connecter ici.', () => {
                window.location.href = '../View/login.html';
            });
        } else {
            alert('Erreur lors de l\'inscription: ' + (data.errors || ''));
        }
    })
    .catch(error => {
        alert('Erreur lors de l\'inscription: ' + error.message);
    });
});

function toggleForm() {
    var type = document.getElementById('type').value;
    var proFields = document.getElementById('proFields');

    if (type === 'professionnel') {
        proFields.style.display = 'block';
    } else {
        proFields.style.display = 'none';
    }
}
