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
            alert('Inscription réussie!');
        } else {
            alert('Erreur lors de l\'inscription: ' + (data.error || ''));
        }
    })
    .catch(error => {
        alert('Erreur lors de l\'inscription: ' + error.message);
    });
});