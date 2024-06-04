function toggleForm() {
    var type = document.getElementById('type').value;
    var proFields = document.getElementById('proFields');

    if (type === 'professionnel') {
        proFields.style.display = 'block';
    } else {
        proFields.style.display = 'none';
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
    .then(response => {
        if (!response.ok) {
            return response.text().then(text => { throw new Error(text) });
        }
        return response.json();
    })
    .then(data => {
        if (data.status === 'User created!') {
            localStorage.setItem('token', data.token);
            alert('Inscription réussie! Veuillez vous connecter ici.');
            window.setTimeout(() => {
                window.location.href = '../View/login.html';
            }, 3000); 
        } else {
            alert('Erreur lors de l\'inscription: ' + (data.errors || ''));
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});