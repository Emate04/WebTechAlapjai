document.addEventListener("DOMContentLoaded", function() {
    const searchBtn = document.getElementById("searchBtn");

    if (searchBtn) {
        searchBtn.addEventListener("click", function() {
            const searchInput = document.getElementById("searchInput").value.trim();

            if (!searchInput) {
                alert("Kérlek, adj meg egy keresőkifejezést!");
                return;
            }

            fetch(`https://api.github.com/search/users?q=${searchInput}`)
                .then(response => response.json())
                .then(data => {
                    const resultsDiv = document.getElementById("results");
                    resultsDiv.innerHTML = "";

                    if (data.items.length === 0) {
                        resultsDiv.innerHTML = "<p>Nincs találat.</p>";
                        return;
                    }

                    data.items.forEach(user => {
                        const userCard = document.createElement("div");
                        userCard.classList.add("card");
                        userCard.innerHTML = `
                            <img src="${user.avatar_url}" alt="${user.login}" class="avatar">
                            <h3><a href="user.html?id=${user.login}">${user.login}</a></h3>
                        `;
                        resultsDiv.appendChild(userCard);
                    });
                })
                .catch(error => {
                    document.getElementById("results").innerHTML = "<p>Hiba történt a keresés során.</p>";
                });
        });
    }
});
