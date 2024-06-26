document.addEventListener('DOMContentLoaded', function() {
    const token = localStorage.getItem('token');
    const searchParams = new URLSearchParams(window.location.search);
    const salons = [
        {id:1, name:'Awaley Beauty', picture:'../assets/img9.jpg'},
        {id:2, name:'Guepratte Beauty', picture:'../assets/img2.jpg'},
        {id:3, name:'Paul Beauty', picture:'../assets/img5.jpg'},
        {id:4, name:'Tity Beauty', picture:'../assets/img8.jpg'}
    ];
    const salon = searchParams.get('salon');
    if (!token) {
        localStorage.removeItem('token')
        window.location.href = '../View/login.html';
        return;
    }
    if(!salon || !salons.some((oneSalon) => oneSalon.id == salon)) {
        alert('Vous devez sélectionner un salon pour prendre un rendez-vous.');
        window.location.href = '../index.html';
        return;
    }
    const selectedSalon = salons.find((oneSalon) => oneSalon.id == salon);
    document.getElementById('detail-name').innerHTML = selectedSalon.name;
    document.getElementById('detail-picture').src = selectedSalon.picture;
    document.getElementById('salon').value = selectedSalon.id;
});

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

document.getElementById('appointment-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
        alert('Vous devez être connecté pour prendre un rendez-vous.');
        localStorage.removeItem('token')
        window.location.href = '../View/login.html';
        return;
    }

    const formData = new FormData(event.target);
    const formObject = {};
    formData.forEach((value, key) => {
        formObject[key] = value;
    });

    fetch('http://localhost:8000/api/events', {
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
        return JSON.parse(jsonResponse);
    }))
    .then(data => {
        if (data.status === 'success') {
            document.getElementById('appointment-form').style.display = 'none';
            document.getElementById('confirmation').style.display = 'block';
            document.getElementById('form-title').style.display = 'none';
            showModal('Le rendez-vous a été pris, vous recevrez la confirmation par SMS.');
        } else {
            alert('Une erreur est survenue : ' + data.message);
        }
    })
    .catch(error => {
        alert('Une erreur est survenue : ' + error.message);
    });
});
