---
layout: post
title: Leaderboard Page
type: issues
permalink: /leaderboard/
---
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Leaderboard Page</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: Arial, sans-serif;
            display: flex;
            justify-content: center;
            background-color: #121212;
            padding: 20px;
        }

        .leaderboard-container {
            max-width: 1200px;
            width: 100%;
            background-color: #121212;
            border-radius: 8px;
            padding: 20px;
            box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
        }

        .header {
            text-align: center;
            padding: 20px;
            background-color: #2a7de1;
            border-radius: 8px;
            color: #ffffff;
        }

        .header h1 {
            font-size: 2em;
        }

        /* Button Style for Team Links */
        button {
            background: #fbca1f;
            font-family: inherit;
            padding: 0.6em 1.3em;
            font-weight: 900;
            font-size: 18px;
            border: 3px solid black;
            border-radius: 0.4em;
            box-shadow: 0.1em 0.1em;
            cursor: pointer;
            width: 100%;
            text-align: left;
        }

        button:hover {
            transform: translate(-0.05em, -0.05em);
            box-shadow: 0.15em 0.15em;
        }

        button:active {
            transform: translate(0.05em, 0.05em);
            box-shadow: 0.05em 0.05em;
        }

        .stats-container {
            display: flex;
            justify-content: space-between;
            padding: 10px 0;
            color: black;
            font-weight: bold;
        }

        .team-members {
            font-size: 0.9em;
            color: #333333;
        }
    </style>
</head>
<body>

<div class="leaderboard-container">
    <div class="header">
        <h1>Leaderboard</h1>
        <p>Ranking Teams by Balance</p>
    </div>
    <div class="team-list" id="team-list">
        <!-- Team template for each leaderboard entry -->
        <template id="team-template">
            <a href="#" target="_blank"> <!-- Link placeholder -->
                <button>
                    <div class="team-card">
                        <div class="rank">#<span class="rank-number"></span> <span class="team-name"></span></div>
                        <div class="stats-container">
                            <div class="balance">Balance: <span class="balance-amount"></span></div>
                            <div class="roi">ROI: <span class="roi-percentage"></span></div>
                        </div>
                        <div class="team-members">
                            <strong>Team Members:</strong>
                            <ul class="member-list"></ul>
                        </div>
                    </div>
                </button>
            </a>
        </template>
    </div>
</div>

<script>
    // Fetch user data, group by team number, and calculate team stats
    function fetchAndDisplayLeaderboard() {
        fetch('${javaURI}/api/people')  // should be API endpoint for all people
            .then(response => {
                if (!response.ok) {
                    throw new Error("Failed to fetch user data");
                }
                return response.json();
            })
            .then(people => {
                // Group people by their team name
                const teams = people.reduce((acc, person) => {
                    const teamKey = person.team;
                    if (!acc[teamKey]) {
                        acc[teamKey] = { members: [], balance: 0 };
                    }
                    acc[teamKey].members.push(person.name);
                    acc[teamKey].balance += person.balance;
                    return acc;
                }, {});

                // Convert teams object into array and calculate ROI (example placeholder here)
                const teamsArray = Object.entries(teams).map(([teamName, teamData]) => ({
                    name: teamName,
                    balance: teamData.balance,
                    roi: ((teamData.balance / 5000) * 100).toFixed(2) + '%',  // Example ROI calculation
                    members: teamData.members,
                    link: `/leaderboard/team/${teamName}`  // Updated link structure (replace with actual endpoint as needed)
                }));

                // Sort teams by balance in descending order and display them
                const sortedTeams = teamsArray.sort((a, b) => b.balance - a.balance);
                populateLeaderboard(sortedTeams);
            })
            .catch(error => {
                console.error("Error:", error);
                document.getElementById("team-list").innerHTML = `<p class="error">${error.message}</p>`;

            });
    }

    // Populate the leaderboard with ranked teams
    function populateLeaderboard(teams) {
        const teamList = document.getElementById('team-list');
        const template = document.getElementById('team-template').content;

        // Clear any existing content
        teamList.innerHTML = '';

        teams.forEach((team, index) => {
            const teamElement = document.importNode(template, true);

            // Fill in the rank, balance, ROI, members, and link
            teamElement.querySelector('.rank-number').textContent = index + 1;
            teamElement.querySelector('.team-name').textContent = team.name;
            teamElement.querySelector('.balance-amount').textContent = `$${team.balance.toLocaleString()}`;
            teamElement.querySelector('.roi-percentage').textContent = team.roi;
            teamElement.querySelector('a').href = team.link;

            const memberList = teamElement.querySelector('.member-list');
            team.members.forEach(member => {
                const memberItem = document.createElement('li');
                memberItem.textContent = member;
                memberList.appendChild(memberItem);
            });

            // Append to leaderboard
            teamList.appendChild(teamElement);
        });
    }

    // Initialize leaderboard data fetch
    fetchAndDisplayLeaderboard();
</script>

</body>
</html>