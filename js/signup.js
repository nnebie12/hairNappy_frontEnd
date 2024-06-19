document.addEventListener('DOMContentLoaded', function() {
    const token = localStorage.getItem('token');
    if (token) {
        window.location.href = '../index.html';
        return;
    }
});

document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const formObject = {};
    formData.forEach((value, key) => {
        formObject[key] = value;
    });

    if (!validateEmail(formObject.email)) {
        alert('Adresse email invalide');
        return;
    }

    if (!validatePassword(formObject.password)) {
        alert('Mot de passe invalide. Il doit comporter au moins 8 caractères, une majuscule, une minuscule et un chiffre.');
        return;
    }

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

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePassword(password) {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return re.test(password);
}
