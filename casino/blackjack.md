---
layout: post
title: Blackjack Game
permalink: /casino/blackjack
---

  <title>Blackjack Game</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      background-color: #1e1e1e;
      color: #ffffff;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      margin: 0;
    }
    .container {
      max-width: 700px;
      text-align: center;
      background-color: #2b2b2b;
      padding: 40px;
      border-radius: 15px;
      box-shadow: 0 15px 35px rgba(0, 0, 0, 0.5);
    }
    h1 {
      font-size: 2.5rem;
      font-weight: 600;
      color: #f39c12;
    }
    label, .result, .error {
      display: block;
      margin: 15px 0;
      font-size: 1.1rem;
      color: #bdc3c7;
    }
    input[type="text"], input[type="number"], input[type="range"], button {
      width: 100%;
      padding: 12px;
      margin-top: 10px;
      font-size: 1rem;
      border-radius: 8px;
      border: none;
      outline: none;
    }
    input[type="text"], input[type="number"], input[type="range"] {
      background-color: #333;
      color: #fff;
      border: 1px solid #555;
    }
    button {
      background-color: #f39c12;
      color: #1e1e1e;
      cursor: pointer;
      font-weight: 600;
      transition: all 0.3s ease;
    }
    button:hover {
      background-color: #e67e22;
    }
    .hand {
      display: flex;
      justify-content: center;
      gap: 12px;
      margin-top: 20px;
    }
    .card {
      width: 60px;
      height: 90px;
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      padding: 5px;
      font-size: 1.2rem;
      color: #333;
      position: relative;
    }
    .card.red {
      color: #e74c3c;
    }
    .card .top-left, .card .bottom-right {
      font-size: 0.8rem;
      position: absolute;
    }
    .card .top-left {
      top: 5px;
      left: 5px;
    }
    .card .bottom-right {
      bottom: 5px;
      right: 5px;
      transform: rotate(180deg);
    }
    .card .suit {
      font-size: 1.5rem;
    }
    .error {
      color: #e74c3c;
    }
    #betAmountDisplay {
      font-size: 1.2rem;
      color: #f39c12;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Blackjack Game</h1>
    <!--username-->
    <label for="username">Enter your username:</label>
    <input type="text" id="username" placeholder="Username">
    <!--bet-->
    <label for="betAmountSlider">Set your bet:</label>
    <div>
      <input type="range" id="betAmountSlider" min="1000" max="1000000" step="100" value="1000" 
             oninput="updateBetAmount(this.value)">
      <span id="betAmountDisplay">$1000</span>
    </div>
    <input type="hidden" id="betAmount" value="1000">
    <!--start game + buttons-->
    <button onclick="startGame()">Start Game</button>
    <button id="hit-btn" onclick="hit()" disabled>Hit</button>
    <button id="stand-btn" onclick="stand()" disabled>Stand</button>
    <button onclick="exitGame()">Exit</button>
    <!--hands-->
    <div class="hand-section">
      <h3>Dealer's Hand</h3>
      <div id="dealer-hand" class="hand"></div>

      <h3>Your Hand</h3>
      <div id="player-hand" class="hand"></div>
    </div>

    <div id="result" class="result"></div>
    <div id="error" class="error"></div>
  </div>

  <script>
    const baseUrl = 'http://localhost:8085/api/casino/blackjack';
    let username = "";

    function updateBetAmount(value) {
      document.getElementById("betAmountDisplay").innerText = `$${value}`;
      document.getElementById("betAmount").value = value;
    }

    async function startGame() {
      username = document.getElementById("username").value;
      const betAmount = document.getElementById("betAmount").value;

      document.getElementById("error").innerText = "";
      document.getElementById("result").innerText = "";

      if (!username || !betAmount) {
        document.getElementById("error").innerText = "Username and Bet Amount are required.";
        return;
      }

      try {
        const response = await fetch(`${baseUrl}/start`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, betAmount: parseFloat(betAmount) })
        });

        if (!response.ok) throw new Error("Failed to start game");

        const gameData = await response.json();
        updateUI(gameData, hideDealerCard = true);

        document.getElementById("hit-btn").disabled = false;
        document.getElementById("stand-btn").disabled = false;
      } catch (error) {
        document.getElementById("error").innerText = `Error: ${error.message}`;
      }
    }

    async function hit() {
      try {
        const response = await fetch(`${baseUrl}/hit`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username })
        });

        const gameData = await handleResponse(response);
        updateUI(gameData, hideDealerCard = true);

        if (gameData.gameStateMap.playerScore > 21) {
          document.getElementById("result").innerText = "Bust! You lose.";
          endGame();
        }
      } catch (error) {
        document.getElementById("error").innerText = `Error: ${error.message}`;
      }
    }

    async function stand() {
      try {
        const response = await fetch(`${baseUrl}/stand`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username })
        });

        const gameData = await handleResponse(response);
        updateUI(gameData, hideDealerCard = false);

        const resultMessage = gameData.gameStateMap.result === "WIN" ? "You win!" : "You lose.";
        document.getElementById("result").innerText = `Result: ${resultMessage}`;
        endGame();
      } catch (error) {
        document.getElementById("error").innerText = `Error: ${error.message}`;
      }
    }

    async function handleResponse(response) {
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        if (data.message) throw new Error(data.message);
        return data;
      } else {
        throw new Error(await response.text());
      }
    }

    function updateUI(gameData, hideDealerCard = false) {
      displayHand("dealer-hand", gameData.gameStateMap.dealerHand, hideDealerCard);
      displayHand("player-hand", gameData.gameStateMap.playerHand);
    }

    function displayHand(handId, hand, hideDealerCard = false) {
      const handContainer = document.getElementById(handId);
      handContainer.innerHTML = "";
      hand.forEach((card, index) => {
        const rank = card.slice(0, -1);
        const suit = card.slice(-1);
        const suitSymbol = getSuitSymbol(suit);
        const isRed = (suit === "H" || suit === "D");

        const cardDiv = document.createElement("div");
        cardDiv.classList.add("card");
        if (isRed) cardDiv.classList.add("red");

        if (handId === "dealer-hand" && hideDealerCard && index === 1) {
          cardDiv.innerHTML = `<div class="suit">?</div>`;
          cardDiv.style.backgroundColor = "#444";
        } else {
          cardDiv.innerHTML = `
            <div class="top-left">${rank}<br>${suitSymbol}</div>
            <div class="suit">${suitSymbol}</div>
            <div class="bottom-right">${rank}<br>${suitSymbol}</div>
          `;
        }
        handContainer.appendChild(cardDiv);
      });
    }

    function getSuitSymbol(suit) {
      switch (suit) {
        case "H": return "♥";
        case "D": return "♦";
        case "S": return "♠";
        case "C": return "♣";
        default: return "";
      }
    }

    function exitGame() {
      document.getElementById("dealer-hand").innerHTML = '';
      document.getElementById("player-hand").innerHTML = '';
      document.getElementById("result").innerText = "";
      document.getElementById("error").innerText = "";
      document.getElementById("hit-btn").disabled = true;
      document.getElementById("stand-btn").disabled = true;
      document.getElementById("username").value = "";
      document.getElementById("betAmount").value = "1000";
      document.getElementById("betAmountSlider").value = "1000";
      document.getElementById("betAmountDisplay").innerText = "$1000";
    }

    function endGame() {
      document.getElementById("hit-btn").disabled = true;
      document.getElementById("stand-btn").disabled = true;
    }
  </script>
</body>