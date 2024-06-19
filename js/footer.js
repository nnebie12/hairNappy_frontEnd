window.addEventListener('DOMContentLoaded', () => {
    ['footer.html', 'View/footer.html'].forEach((template) => {
        loadPartialDom(template, function(html) {
            document.getElementById('footer').innerHTML = html;
        });
    })
});