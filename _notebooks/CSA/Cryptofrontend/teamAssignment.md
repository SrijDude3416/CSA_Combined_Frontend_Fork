---
layout: post
title: Team Assignment
permalink: /teams/
---
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Team Assignment</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <style>
        /* Global Styles */
        body {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            font-family: Arial, sans-serif;
            background-color: #F0F4F8;
            flex-direction: column;
        }
        /* Navbar */
        .navbar {
            width: 100%;
            background-color: #333;
            color: #fff;
            display: flex;
            justify-content: space-between;
            padding: 1rem;
            font-size: 1.2rem; /* Larger text */
            margin-bottom: 1rem;
            text-align: center;
        }
        .navbar .links {
            display: flex;
            gap: 2rem;
        }
        .navbar .links a {
            color: #fff;
            text-decoration: none;
            font-weight: bold;
        }
        .navbar .links a:hover {
            color: #ddd;
        }
        .balance {
            font-weight: bold;
        }
        /* Main Container */
        .team-container {
            display: flex;
            flex-direction: column;
            background-color: #fff;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            padding: 2rem;
            width: 400px;
            text-align: center;
            color: #333;
        }
        /* Form Elements */
        label, input, button, p {
            margin-top: 1rem;
            font-size: 1rem;
            color: #333;
        }
        input {
            width: 100%;
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 4px;
            font-size: 1rem;
            color: #333;
        }
        button {
            margin-top: 1.5rem;
            width: 100%;
            padding: 10px;
            font-size: 1rem;
            color: #fff;
            background-color: #007BFF;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            transition: background-color 0.3s ease;
        }
        button:hover {
            background-color: #0056B3;
        }
        /* Message Styles */
        .message {
            margin-top: 1rem;
            font-size: 0.9rem;
        }
        .success {
            color: green;
        }
        .error {
            color: red;
        }
    </style>
</head>
<body>
    <!-- Navbar with links to other pages -->
    <div class="navbar">
        <div class="links">
            <a href="/CollegeAppFrontend/portfolio" id="portfolioLink">Investing Portfolio</a>
            <a href="/CollegeAppFrontend/mining" id="miningLink">Crypto Mining</a>
            <a href="/CollegeAppFrontend/team" id="TeamLink">Team Stats</a>
            <a href="/CollegeAppFrontend/leaderboard" id="leaderboardLink">Leaderboard</a>
        </div>

        <div class="balance">
            Balance: $<span id="balanceDisplay">0.00</span>
        </div>
    </div>
    <div class="team-container">
        <h2>Assign Team</h2>
        <form id="assignTeamForm">
            <label for="teamNumber">Enter Team Number (1-6):</label>
            <input type="number" id="teamNumber" min="1" max="6" required placeholder="Enter a number between 1 and 6">
            <button type="submit">Join Team</button>
            <p id="teamMessage" class="message"></p>
        </form>
    </div>

    <script>
        // Initialize or retrieve balance from local storage
        let balance = localStorage.getItem("userBalance");
        if (!balance) {
            balance = 5000.0; // Default balance
            localStorage.setItem("userBalance", balance);
        }
        document.getElementById("balanceDisplay").textContent = parseFloat(balance).toFixed(2);

        // Team Assignment Form
        document.getElementById("assignTeamForm").addEventListener("submit", function (e) {
            e.preventDefault();
            
            const teamNumber = document.getElementById("teamNumber").value;
            const email = localStorage.getItem("userEmail"); // Retrieve email stored as userEmail

            if (!email || !teamNumber) {
                document.getElementById("teamMessage").textContent = "Please provide both email and team number.";
                return;
            }

            const assignTeamURL = `http://127.0.0.1:4100/api/person/team?email=${email}`;
            fetch(assignTeamURL, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ team: `Team ${teamNumber}` })  // Convert team number to a string like "Team 1"
            })
            .then(response => {
                if (response.ok) {
                    document.getElementById("teamMessage").classList.add("success");
                    document.getElementById("teamMessage").textContent = "Team assigned successfully!";
                } else {
                    return response.json().then(data => {
                        throw new Error(data.message || "Failed to assign team.");
                    });
                }
            })
            .catch(error => {
                document.getElementById("teamMessage").classList.add("error");
                document.getElementById("teamMessage").textContent = error.message;
            });
        });
    </script>
</body>
</html>
