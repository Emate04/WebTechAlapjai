document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('github_token');
    const repoName = new URLSearchParams(window.location.search).get('name');
    const repoNameEl = document.getElementById('repoName');
    const starButton = document.getElementById('starButton');

    if (!repoName || !token) {
        repoNameEl.textContent = 'Hiányzó adatok!';
        return;
    }

    repoNameEl.textContent = repoName;

    const checkIfStarred = async () => {
        const res = await fetch(`https://api.github.com/user/starred/${repoName}`, {
            method: 'GET',
            headers: {
                Authorization: `token ${token}`
            }
        });
        return res.status === 204;
    };

    const updateButton = (starred) => {
        starButton.textContent = starred ? 'Kedvencekből eltávolít' : 'Kedvencnek jelöl';
        starButton.dataset.starred = starred;
    };

    const toggleStar = async () => {
        const starred = starButton.dataset.starred === 'true';
        const method = starred ? 'DELETE' : 'PUT';

        const res = await fetch(`https://api.github.com/user/starred/${repoName}`, {
            method,
            headers: {
                Authorization: `token ${token}`
            }
        });

        if (res.status === 204) {
            updateButton(!starred);
        } else {
            alert('Hiba történt a művelet során.');
        }
    };

    try {
        const isStarred = await checkIfStarred();
        updateButton(isStarred);
        starButton.addEventListener('click', toggleStar);
    } catch (err) {
        console.error('Nem sikerült lekérdezni a csillagozást.', err);
        starButton.textContent = 'Hiba';
    }
});
