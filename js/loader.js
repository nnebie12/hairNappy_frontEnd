document.addEventListener('DOMContentLoaded', function() {
    const loader = document.getElementById('loader');

    function showLoader() {
        loader.style.display = 'flex';
    }

    function hideLoader() {
        loader.style.display = 'none';
    }

    function showModal(message, callback) {
        const modal = document.getElementById('successModal');
        const modalMessage = document.getElementById('modalMessage');
        const closeButton = document.querySelector('.close-button');

        modalMessage.textContent = message;
        modal.style.display = 'block';

        closeButton.onclick = function() {
            modal.style.display = 'none';
            if (callback) {
                setTimeout(() => {
                    showLoader(); 
                    callback();
                }, 300); 
            }
        }

        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = 'none';
                if (callback) {
                    setTimeout(() => {
                        showLoader(); 
                        callback();
                    }, 300); 
                }
            }
        }
    }

    window.showModal = showModal;
    window.addEventListener('load', function() {
        hideLoader();
    });
});
