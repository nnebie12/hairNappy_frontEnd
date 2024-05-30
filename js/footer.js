window.addEventListener('DOMContentLoaded', () => {
    fetch('footer.html')
        .then(response => response.text())
        .then(footerHtml => {
            document.getElementById('footer').innerHTML = footerHtml;
        })
        .catch(error => console.error('Erreur lors du chargement du footer :', error));
});