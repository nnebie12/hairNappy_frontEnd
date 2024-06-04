document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    console.log('Form submission triggered');

    const formData = new FormData(event.target);
    const formObject = {};
    formData.forEach((value, key) => {
        formObject[key] = value;
    });

    console.log('Form data:', formObject);

    fetch('http://localhost:8000/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
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
        if (data.status === 'success') {
            localStorage.setItem('token', data.token);
            alert('Connexion réussie!');
            window.location.href = '../View/index.html';
        } else {
            console.log('Error data:', data);
            alert('Erreur de connexion: ' + (data.error || ''));
        }
    })
    .catch(error => {
        console.error('Fetch error:', error);
        alert('Erreur lors de la connexion: ' + error.message);
    });
});
