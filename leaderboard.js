document.addEventListener("DOMContentLoaded", function () {
    const APIKEY = "65bc7e87bef88d03e0d2f577";

    fetchLeaderboard();

    function fetchLeaderboard() {
        fetch('https://fedassg-c160.restdb.io/rest/players', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-apikey': APIKEY
            },
        })
        .then(response => response.json())
        .then(players => {
            const leaderboardBody = document.getElementById('leaderboard-body');
            leaderboardBody.innerHTML = '';

            players.forEach(player => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${player.pUsername}</td>
                    <td>${player.pScore}</td>
                `;
                leaderboardBody.appendChild(row);
            });
        })
        .catch(error => console.error('Error fetching leaderboard:', error));
    }
});
