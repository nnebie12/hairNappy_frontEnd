window.addEventListener('DOMContentLoaded', function () {
    fetch('menu.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('menuContainer').innerHTML = data;
    });
});
  