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

    console.log('Form submission triggered');

    const formData = new FormData(event.target);
    const formObject = {};
    formData.forEach((value, key) => {
        formObject[key] = value;
    });

    console.log('Form data:', formObject);

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
        console.log('Response received', response);
        return response.text().then(text => {
            console.log('Response text:', text);
            // Extract the JSON part from the response
            const jsonStart = text.indexOf('{');
            const jsonEnd = text.lastIndexOf('}') + 1;
            const jsonResponse = text.substring(jsonStart, jsonEnd);
            try {
                return JSON.parse(jsonResponse);
            } catch (error) {
                throw new Error('Invalid JSON: ' + jsonResponse);
            }
        });
    })
    .then(data => {
        console.log('Response data:', data);
        if (data.status === 'User created!') {
            localStorage.setItem('token', data.token);
            alert('Inscription réussie! Veuillez vous connecter ici.');
            console.log('Redirection in 3 seconds:', setTimeout);
            window.setTimeout(() => {
                window.location.href = '../View/login.html';
            }, 3000);
        } else {
            console.log('Error data:', data);
            alert('Erreur lors de l\'inscription: ' + (data.errors || ''));
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Erreur lors de l\'inscription: ' + error.message);
    });
});
