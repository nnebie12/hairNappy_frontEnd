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
                        alert('Connexion réussie!');
                    } else {
                        alert('Erreur de connexion: ' + (data.error || ''));
                    }
                })
                .catch(error => {
                    alert('Erreur de connexion: ' + error.message);
                });
        });