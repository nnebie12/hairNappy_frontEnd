document.addEventListener('DOMContentLoaded', function() {
    const token = localStorage.getItem('token');
    if (!token) {
        alert('Vous devez être connecté pour voir votre historique des rendez-vous.');
        window.location.href = '../View/login.html';
        return;
    }

    fetch('http://localhost:8000/api/appointments', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        const appointmentsDiv = document.getElementById('appointments');
        if (data.length === 0) {
            appointmentsDiv.innerHTML = '<p>Vous n\'avez aucun rendez-vous.</p>';
        } else {
            const list = document.createElement('ul');
            data.forEach(appointment => {
                const listItem = document.createElement('li');
                listItem.innerHTML = `Date: ${appointment.date}, Heure: ${appointment.heure}, Message: ${appointment.message} `;

                const editButton = document.createElement('button');
                editButton.textContent = 'Modifier';
                editButton.onclick = () => openEditModal(appointment);

                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Supprimer';
                deleteButton.onclick = () => deleteAppointment(appointment.id);

                listItem.appendChild(editButton);
                listItem.appendChild(deleteButton);
                list.appendChild(listItem);
            });
            appointmentsDiv.appendChild(list);
        }
    })
    .catch(error => {
        console.error('Erreur:', error);
        alert('Une erreur est survenue : ' + error.message);
    });

    const modal = document.getElementById('editModal');
    const closeBtn = document.getElementsByClassName('close')[0];
    const editForm = document.getElementById('editForm');
    let currentAppointmentId;

    function openEditModal(appointment) {
        currentAppointmentId = appointment.id;
        document.getElementById('editDate').value = appointment.date;
        document.getElementById('editHeure').value = appointment.heure;
        document.getElementById('editMessage').value = appointment.message;
        modal.style.display = 'block';
    }

    closeBtn.onclick = function() {
        modal.style.display = 'none';
    }

    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    }

    editForm.onsubmit = function(event) {
        event.preventDefault();
        const newDate = document.getElementById('editDate').value;
        const newHeure = document.getElementById('editHeure').value;
        const newMessage = document.getElementById('editMessage').value;

        if (newDate && newHeure && newMessage) {
            fetch(`http://localhost:8000/api/appointments/${currentAppointmentId}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    date: newDate,
                    heure: newHeure,
                    message: newMessage
                })
            })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    alert('Rendez-vous mis à jour!');
                    window.location.reload();
                } else {
                    alert('Erreur: ' + data.message);
                }
            })
            .catch(error => {
                console.error('Erreur:', error);
                alert('Une erreur est survenue : ' + error.message);
            });
        } else {
            alert('Tous les champs sont requis pour la modification.');
        }
    }
});

function deleteAppointment(id) {
    const token = localStorage.getItem('token');
    fetch(`http://localhost:8000/api/appointments/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            alert('Rendez-vous supprimé!');
            window.location.reload();
        } else {
            alert('Erreur: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Erreur:', error);
        alert('Une erreur est survenue : ' + error.message);
    });
}
