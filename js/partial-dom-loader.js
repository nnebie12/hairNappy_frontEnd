const loadPartialDom = (template, closure) => {
    fetch(template)
        .then(response => {
            return response.status === 200 ? response.text() : null;
        })
        .then((html) => {
            if(html) { closure(html); }
        })
        .catch(error => console.error('Erreur lors du chargement du footer :', error));
};