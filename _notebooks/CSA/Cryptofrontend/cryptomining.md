---
layout: post
title: Crypto Mining Simulator
type: issues
permalink: /mining/
---

<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Crypto Mining Simulator</title>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
        <style>
        /* More subtle RGB Border Animation for Dark Theme */
        @keyframes cyber-border-glow {
            0% { 
                border-color: rgba(255, 0, 0, 0.5);  /* Softer red */
                box-shadow: 0 0 10px rgba(255, 0, 0, 0.3),
                           inset 0 0 15px rgba(255, 0, 0, 0.2);
            }
            33% { 
                border-color: rgba(15, 255, 0, 0.5);  /* Softer green */
                box-shadow: 0 0 10px rgba(15, 255, 0, 0.3),
                           inset 0 0 15px rgba(15, 255, 0, 0.2);
            }
            66% { 
                border-color: rgba(0, 255, 255, 0.5);  /* Softer cyan */
                box-shadow: 0 0 10px rgba(0, 255, 255, 0.3),
                           inset 0 0 15px rgba(0, 255, 255, 0.2);
            }
            100% { 
                border-color: rgba(255, 0, 0, 0.5);  /* Back to softer red */
                box-shadow: 0 0 10px rgba(255, 0, 0, 0.3),
                           inset 0 0 15px rgba(255, 0, 0, 0.2);
            }
        }
        /* Updated Dashboard Card Styling */
        .dashboard-card {
            background: rgba(17, 24, 39, 0.95);
            border: 1.5px solid;
            border-radius: 0.75rem;
            padding: 1.25rem;
            animation: rgb-breathe 6s ease-in-out infinite;
            position: relative;
            backdrop-filter: blur(5px);
            transition: all 0.3s ease;
        }
        /* Different animation delays for wave effect */
        .dashboard-card:nth-child(1) { animation-delay: 0s; }
        .dashboard-card:nth-child(2) { animation-delay: 0.5s; }
        .dashboard-card:nth-child(3) { animation-delay: 1s; }
        .dashboard-card:nth-child(4) { animation-delay: 1.5s; }
        .dashboard-card:nth-child(5) { animation-delay: 2s; }
        /* Card title styling */
        .dashboard-card h2 {
            color: white;
            font-size: 0.9rem;
            font-weight: bold;
            margin-bottom: 1rem;
            text-transform: uppercase;
            letter-spacing: 1px;
            text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
        }
        /* Stats styling */
        .stat-label {
            color: #9ca3af;
            font-size: 0.875rem;
            margin-bottom: 0.25rem;
        }
        .stat-value {
            color: white;
            font-size: 1rem;
            font-weight: bold;
            text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
        }
        /* Hover effect */
        .dashboard-card:hover {
            transform: translateY(-2px) scale(1.01);
            animation-play-state: paused;
            border-color: rgba(255, 255, 255, 0.5);
            box-shadow: 0 0 20px rgba(255, 255, 255, 0.2),
                        inset 0 0 25px rgba(255, 255, 255, 0.1);
        }
        /* Add corner accents */
        .dashboard-card::before,
        .dashboard-card::after {
            content: '';
            position: absolute;
            width: 10px;
            height: 10px;
            border: 2px solid currentColor;
            animation: cyber-border-glow 3s linear infinite;
        }
        .dashboard-card::before {
            top: -2px;
            left: -2px;
            border-right: 0;
            border-bottom: 0;
        }
        .dashboard-card::after {
            bottom: -2px;
            right: -2px;
            border-left: 0;
            border-top: 0;
        }
        .chart-container {
            @apply bg-gray-800 rounded-lg p-4 mt-4;
            height: 300px;
        }
        .gpu-shop-modal {
            position: fixed;
            inset: 0;  /* Same as top:0, right:0, bottom:0, left:0 */
            background-color: rgba(0, 0, 0, 0.75);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 50;
        }
        .gpu-shop-content {
            background-color: #1f2937; /* Dark gray background */
            width: 90%;
            max-width: 900px;
            max-height: 80vh;  /* 80% of viewport height */
            border-radius: 0.5rem;
            padding: 1.5rem;
            position: relative;
        }
        .gpu-list-container {
            overflow-y: auto;
            max-height: calc(80vh - 4rem); /* Account for header */
            padding-right: 1rem;
            /* Scrollbar styling */
            scrollbar-width: thin;
            scrollbar-color: #4b5563 #1f2937;
        }
        /* Webkit scrollbar styling */
        .gpu-list-container::-webkit-scrollbar {
            width: 8px;
        }
        .gpu-list-container::-webkit-scrollbar-track {
            background: #1f2937;
        }
        .gpu-list-container::-webkit-scrollbar-thumb {
            background-color: #4b5563;
            border-radius: 4px;
        }
        /* Add to your existing styles */
        .dashboard-card.mt-8 {
            background-color: rgba(17, 24, 39, 0.95); /* Darker background */
            border: 2px solid;
            border-radius: 0.75rem;
            padding: 1.25rem;
            animation: cyber-border-glow 3s linear infinite;
            position: relative;
            backdrop-filter: blur(5px);
        }
        .dashboard-card.mt-8 h2 {
            color: white;
            font-size: 1rem;
            font-weight: bold;
            margin-bottom: 1rem;
            text-transform: uppercase;
            letter-spacing: 1px;
            text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
        }
        .dashboard-card.mt-8 .guide-step {
            color: #9ca3af;
            font-size: 0.875rem;
            margin-bottom: 0.25rem;
        }
        .dashboard-card.mt-8 .guide-step h3 {
            color: #00ff00;
            font-size: 1rem;
            font-weight: bold;
            margin-bottom: 0.5rem;
            text-transform: uppercase;
            letter-spacing: 1px;
            text-shadow: 0 0 10px rgba(0, 255, 0, 0.5);
        }
        .dashboard-card.mt-8 .guide-step p {
            color: white;
            font-size: 1rem;
            font-weight: bold;
            text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
        }
        .dashboard-card.mt-8 .guide-step ul {
            list-style-type: none;
            padding-left: 0;
        }
        .dashboard-card.mt-8 .guide-step ul li {
            color: white;
            font-size: 1rem;
            font-weight: bold;
            text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
        }
        .dashboard-card.mt-8 .guide-step ul li span {
            color: #00ff00;
            font-size: 1rem;
            font-weight: bold;
            text-shadow: 0 0 10px rgba(0, 255, 0, 0.5);
        }
        /* RGB Breathing Animation */
        @keyframes rgb-breathe {
            0% {
                border-color: rgba(255, 0, 0, 0.4);
                box-shadow: 0 0 15px rgba(255, 0, 0, 0.2),
                           inset 0 0 20px rgba(255, 0, 0, 0.1);
                transform: scale(1);
            }
            25% {
                border-color: rgba(255, 0, 255, 0.4);
                box-shadow: 0 0 15px rgba(255, 0, 255, 0.2),
                           inset 0 0 20px rgba(255, 0, 255, 0.1);
                transform: scale(1.002);
            }
            50% {
                border-color: rgba(0, 0, 255, 0.4);
                box-shadow: 0 0 15px rgba(0, 0, 255, 0.2),
                           inset 0 0 20px rgba(0, 0, 255, 0.1);
                transform: scale(1);
            }
            75% {
                border-color: rgba(0, 255, 0, 0.4);
                box-shadow: 0 0 15px rgba(0, 255, 0, 0.2),
                           inset 0 0 20px rgba(0, 255, 0, 0.1);
                transform: scale(1.002);
            }
            100% {
                border-color: rgba(255, 0, 0, 0.4);
                box-shadow: 0 0 15px rgba(255, 0, 0, 0.2),
                           inset 0 0 20px rgba(255, 0, 0, 0.1);
                transform: scale(1);
            }
        }
        /* GPU Card Base Style */
        .gpu-card {
            transition: all 0.3s ease;
            border: 2px solid transparent;
            background: rgba(17, 24, 39, 0.95);
        }
        /* Starter GPU - Green glow */
        .gpu-card.starter:hover {
            transform: translateY(-5px);
            box-shadow: 0 0 15px rgba(0, 255, 0, 0.3);
            border-color: rgba(0, 255, 0, 0.5);
        }
        /* Budget GPU - Blue glow */
        .gpu-card.budget:hover {
            transform: translateY(-5px);
            box-shadow: 0 0 15px rgba(0, 128, 255, 0.3);
            border-color: rgba(0, 128, 255, 0.5);
        }
        /* Mid-Range GPU - Purple glow */
        .gpu-card.mid-range:hover {
            transform: translateY(-5px);
            box-shadow: 0 0 15px rgba(147, 51, 234, 0.3);
            border-color: rgba(147, 51, 234, 0.5);
        }
        /* High-End GPU - Orange glow */
        .gpu-card.high-end:hover {
            transform: translateY(-5px);
            box-shadow: 0 0 15px rgba(255, 165, 0, 0.3);
            border-color: rgba(255, 165, 0, 0.5);
        }
        /* Premium GPU - Red glow */
        .gpu-card.premium:hover {
            transform: translateY(-5px);
            box-shadow: 0 0 15px rgba(255, 0, 0, 0.3);
            border-color: rgba(255, 0, 0, 0.5);
        }
        /* GPU Card Hover Effects - Updated structure */
        .gpu-card {
            background: rgba(26, 31, 46, 0.95);
            border-radius: 0.5rem;
            padding: 1rem;
            transition: all 0.3s ease;
            border: 2px solid transparent;
        }
        /* Free Starter GPU */
        .gpu-card:has(h3:contains("NVIDIA GeForce GT 1030")):hover {
            transform: translateY(-5px);
            box-shadow: 0 0 20px rgba(34, 197, 94, 0.3); /* Green glow */
            border-color: rgba(34, 197, 94, 0.5);
        }
        /* Budget GPUs */
        .gpu-card:has(h3[class*="text-blue-400"]):hover {
            transform: translateY(-5px);
            box-shadow: 0 0 20px rgba(59, 130, 246, 0.3); /* Blue glow */
            border-color: rgba(59, 130, 246, 0.5);
        }
        /* Mid-Range GPUs */
        .gpu-card:has(h3[class*="text-purple-400"]):hover {
            transform: translateY(-5px);
            box-shadow: 0 0 20px rgba(147, 51, 234, 0.3); /* Purple glow */
            border-color: rgba(147, 51, 234, 0.5);
        }
        /* High-End GPUs */
        .gpu-card:has(h3[class*="text-orange-400"]):hover {
            transform: translateY(-5px);
            box-shadow: 0 0 20px rgba(251, 146, 60, 0.3); /* Orange glow */
            border-color: rgba(251, 146, 60, 0.5);
        }
        /* Premium GPUs */
        .gpu-card:has(h3[class*="text-red-400"]):hover {
            transform: translateY(-5px);
            box-shadow: 0 0 20px rgba(239, 68, 68, 0.3); /* Red glow */
            border-color: rgba(239, 68, 68, 0.5);
        }
        /* Add glass effect */
        .gpu-card {
            backdrop-filter: blur(5px);
            -webkit-backdrop-filter: blur(5px);
        }
        /* Smooth transitions */
        .gpu-card {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        /* Add subtle animation on hover */
        .gpu-card:hover {
            transform: translateY(-5px) scale(1.02);
        }
        .gpu-inventory-item {
            transition: all 0.3s ease;
        }
        .gpu-inventory-item:hover {
            transform: translateX(5px);
            box-shadow: 0 0 10px rgba(0, 255, 255, 0.2);
        }
        .gpu-inventory-item button {
            transition: all 0.2s ease;
        }
        .gpu-inventory-item button:hover {
            transform: scale(1.05);
        }
    </style>
</head>
<body class="bg-gray-900 text-white min-h-screen p-6">
        <div class="container mx-auto">
        <!-- Main Dashboard -->
        <div class="grid grid-cols-3 gap-4 mb-4">
            <!-- NiceHash Market -->
            <div class="dashboard-card">
                <h2>NiceHash Market</h2>
                <div class="grid gap-2">
                    <div>
                        <div class="stat-label">NICE Price</div>
                        <div class="stat-value" id="nice-price">$0.00</div>
                    </div>
                    <div>
                        <div class="stat-label">24h Change</div>
                        <div class="stat-value" id="nice-change">0.00%</div>
                    </div>
                </div>
            </div>
            <!-- Ethereum Market -->
            <div class="dashboard-card">
                <h2>Ethereum Market</h2>
                <div class="grid gap-2">
                    <div>
                        <div class="stat-label">ETH Price</div>
                        <div class="stat-value" id="eth-price">$0.00</div>
                    </div>
                    <div>
                        <div class="stat-label">24h Change</div>
                        <div class="stat-value" id="eth-change">0.00%</div>
                    </div>
                </div>
            </div>
            <!-- F2Pool Market -->
            <div class="dashboard-card">
                <h2>F2Pool Market</h2>
                <div class="grid gap-2">
                    <div>
                        <div class="stat-label">F2P Price</div>
                        <div class="stat-value" id="f2p-price">$0.00</div>
                    </div>
                    <div>
                        <div class="stat-label">24h Change</div>
                        <div class="stat-value" id="f2p-change">0.00%</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            <!-- Wallet -->
            <div class="dashboard-card">
                <h2>Wallet</h2>
                <div class="grid gap-2">
                    <div>
                        <div class="stat-label">BTC Balance</div>
                        <div class="stat-value" id="btc-balance">0.00000000</div>
                    </div>
                    <div>
                        <div class="stat-label">Pending BTC</div>
                        <div class="stat-value text-yellow-400" id="pending-balance">0.00000000</div>
                    </div>
                    <div>
                        <div class="stat-label">USD Value</div>
                        <div class="stat-value" id="usd-value">$0.00</div>
                    </div>
                    <div>
                        <div class="stat-label" id="pool-info">Min. Payout: 0.001 BTC</div>
                    </div>
                </div>
            </div>
            <!-- Mining Stats -->
            <div class="dashboard-card">
                <h2>Mining Stats</h2>
                <div class="grid gap-2">
                    <div>
                        <div class="stat-label">Hashrate</div>
                        <div class="stat-value" id="hashrate">0 MH/s</div>
                    </div>
                    <div>
                        <div class="stat-label">Shares</div>
                        <div class="stat-value" id="shares">0</div>
                    </div>
                </div>
            </div>
            <!-- Hardware -->
            <div class="dashboard-card">
                <h2>Hardware</h2>
                <div class="grid gap-2">
                    <div>
                        <div class="stat-label">Current GPU</div>
                        <div class="stat-value text-blue-400" id="current-gpu">No GPU</div>
                    </div>
                    <div>
                        <div class="stat-label">GPU Temperature</div>
                        <div class="stat-value" id="gpu-temp">0°C</div>
                    </div>
                    <div>
                        <div class="stat-label">Power Draw</div>
                        <div class="stat-value" id="power-draw">0W</div>
                    </div>
                </div>
            </div>
            <!-- Profitability -->
            <div class="dashboard-card">
                <h2>Profitability</h2>
                <div class="grid gap-2">
                    <div>
                        <div class="stat-label">24h Revenue</div>
                        <div class="stat-value" id="daily-revenue">$0.00</div>
                    </div>
                    <div>
                        <div class="stat-label">Power Cost</div>
                        <div class="stat-value text-red-400" id="power-cost">$0.00</div>
                    </div>
                </div>
            </div>
            <!-- Bitcoin Market -->
            <div class="dashboard-card">
                <h2>Bitcoin Market</h2>
                <div class="grid gap-2">
                    <div>
                        <div class="stat-label">BTC Price</div>
                        <div class="stat-value" id="btc-price">$0.00</div>
                    </div>
                    <div>
                        <div class="stat-label">24h Change</div>
                        <div class="stat-value" id="btc-change">0.00%</div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Mining Controls -->
        <div class="dashboard-card mt-4">
            <div class="flex justify-between items-center">
                <button id="start-mining" class="bg-green-500 hover:bg-green-600 px-4 py-2 rounded">
                    Start Mining
                </button>
                <select id="pool-selection" class="bg-gray-700 rounded px-4 py-2">
                    <option value="nicehash">NiceHash (2% fee, 4hr payout)</option>
                    <option value="ethermine">Ethermine (1% fee, 24hr payout)</option>
                    <option value="f2pool">F2Pool (2.5% fee, 12hr payout)</option>
                    <option value="bitcoin">Bitcoin (3% fee, 1hr payout)</option>
                </select>
                <button id="gpu-shop" class="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded">
                    GPU Shop
                </button>
            </div>
        </div>
        <!-- Performance Charts -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div class="chart-container">
                <canvas id="hashrate-chart"></canvas>
            </div>
            <div class="chart-container">
                <canvas id="profit-chart"></canvas>
            </div>
        </div>
        <!-- GPU Inventory -->
        <div class="dashboard-card mt-4">
            <div id="gpu-inventory" class="gpu-inventory">
                <!-- GPU inventory will be populated here -->
            </div>
        </div>
        <div class="dashboard-card mt-8">
            <h2 class="text-xl font-bold mb-4">Quick Start Guide</h2>
            <div class="space-y-4 text-gray-300">
                <div class="guide-step">
                    <h3 class="text-green-400 font-bold mb-2">1. Get Your First GPU 🎮</h3>
                    <p>• Click the "GPU Shop" button to open the store</p>
                    <p>• Start with the free GT 1030 - perfect for beginners!</p>
                </div>
                <div class="guide-step">
                    <h3 class="text-green-400 font-bold mb-2">2. Choose a Mining Pool 🌐</h3>
                    <p>• Mining pools combine the power of many miners to find Bitcoin blocks faster</p>
                    <p>• Available pools:</p>
                    <ul class="list-disc list-inside ml-4 mt-2 space-y-1">
                        <li><span class="text-white">NiceHash:</span> 2% fee, 4hr payout - Good for beginners, quick payments</li>
                        <li><span class="text-white">Ethermine:</span> 1% fee, 24hr payout - Lower fees, longer wait</li>
                        <li><span class="text-white">F2Pool:</span> 2.5% fee, 12hr payout - Balance of wait time and fees</li>
                        <li><span class="text-white">Bitcoin Pool:</span> 3% fee, 1hr payout - Fastest payouts, higher fees</li>
                    </ul>
                </div>
                <div class="guide-step">
                    <h3 class="text-green-400 font-bold mb-2">3. Start Mining ⛏️</h3>
                    <p>• Click the "Start Mining" button to begin</p>
                    <p>• Watch your hashrate (mining speed) in the charts</p>
                    <p>• Mining earns you Bitcoin (BTC) over time</p>
                    <p>• Shares show successful contributions to your pool</p>
                </div>
                <div class="guide-step">
                    <h3 class="text-green-400 font-bold mb-2">4. Understanding Your Dashboard 📊</h3>
                    <ul class="list-disc list-inside space-y-2">
                        <li><span class="text-white">Wallet:</span> Shows your BTC balance and its USD value</li>
                        <li><span class="text-white">Mining Stats:</span> Your mining speed (hashrate) and successful shares</li>
                        <li><span class="text-white">Hardware:</span> Your GPU model, temperature, and power usage</li>
                        <li><span class="text-white">Profitability:</span> Your earnings and power costs</li>
                        <li><span class="text-white">Bitcoin Market:</span> Current BTC price and market changes</li>
                    </ul>
                </div>
                <div class="guide-step">
                    <h3 class="text-green-400 font-bold mb-2">5. Upgrade Strategy 📈</h3>
                    <p>• Save your mining profits to buy better GPUs</p>
                    <p>• Better GPUs = Higher hashrate = More Bitcoin</p>
                    <p>• Watch your power costs - efficiency matters!</p>
                </div>
                <div class="guide-step mt-4">
                    <h3 class="text-yellow-400 font-bold mb-2">Pro Tips 💡</h3>
                    <ul class="list-disc list-inside space-y-2">
                        <li>Check GPU efficiency (MH/W) when buying new cards</li>
                        <li>Monitor your daily revenue vs power costs</li>
                        <li>More expensive GPUs usually have better efficiency</li>
                        <li>The Bitcoin price affects your USD profits</li>
                        <li>Different pools have different advantages:</li>
                        <ul class="list-circle list-inside ml-4 text-sm">
                            <li>New miners: Start with NiceHash for frequent payouts</li>
                            <li>Experienced miners: Try Ethermine for lower fees</li>
                            <li>Consider switching pools as your operation grows</li>
                        </ul>
                    </ul>
                </div>
                <div class="guide-step mt-4">
                    <h3 class="text-blue-400 font-bold mb-2">Common Terms 📚</h3>
                    <ul class="list-disc list-inside space-y-2">
                        <li><span class="text-white">Hashrate:</span> Your mining speed - higher is better (measured in MH/s)</li>
                        <li><span class="text-white">Shares:</span> Proof of your mining work submitted to the pool</li>
                        <li><span class="text-white">Power Draw:</span> Electricity used by your GPU (measured in Watts)</li>
                        <li><span class="text-white">Efficiency:</span> Hashrate per Watt (MH/W) - higher means more profitable</li>
                        <li><span class="text-white">Pool Fee:</span> Percentage taken by the mining pool for their service</li>
                    </ul>
                </div>
                <div class="guide-step mt-4">
                    <h3 class="text-purple-400 font-bold mb-2">Troubleshooting 🔧</h3>
                    <ul class="list-disc list-inside space-y-2">
                        <li><span class="text-white">No Profits?</span> Check if mining is actually started and GPU is working</li>
                        <li><span class="text-white">Low Hashrate?</span> Your GPU might be too basic - consider upgrading</li>
                        <li><span class="text-white">High Power Costs?</span> Look for more efficient GPUs or lower electricity rates</li>
                        <li><span class="text-white">No Shares?</span> Make sure your mining pool connection is stable</li>
                    </ul>
                </div>
                <div class="guide-step mt-4">
                    <h3 class="text-orange-400 font-bold mb-2">FAQ ❓</h3>
                    <div class="space-y-3">
                        <div>
                            <p class="text-white">Q: How long until I make profit?</p>
                            <p>A: Depends on your GPU, electricity cost, and Bitcoin price. Better GPUs = faster profits!</p>
                        </div>
                        <div>
                            <p class="text-white">Q: Which GPU should I buy first?</p>
                            <p>A: Start with the free GT 1030, save up for a mid-range GPU like the GTX 1660 SUPER</p>
                        </div>
                        <div>
                            <p class="text-white">Q: Why do pool fees matter?</p>
                            <p>A: Lower fees mean you keep more of your mining rewards, but might have longer payout times</p>
                        </div>
                        <div>
                            <p class="text-white">Q: Which pool should I choose?</p>
                            <p>A: For beginners: NiceHash (quick payouts) or Ethermine (low fees). Advanced miners: Bitcoin Pool (fastest payouts) or F2Pool (balanced)</p>
                        </div>
                        <div>
                            <p class="text-white">Q: When should I upgrade my GPU?</p>
                            <p>A: When your daily profits are enough to afford a better GPU within a reasonable time</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- GPU Shop Modal -->
    <div id="gpu-shop-modal" class="fixed inset-0 bg-black bg-opacity-50 hidden z-50">
        <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                    bg-gray-800 rounded-lg p-6 w-11/12 max-w-4xl max-h-[80vh] overflow-hidden">
            <div class="flex justify-between items-center mb-4">
                <h2 class="text-2xl font-bold">GPU Shop</h2>
                <button id="close-shop" class="text-gray-400 hover:text-white text-3xl">&times;</button>
            </div>
            <div class="overflow-y-auto pr-2" style="max-height: calc(80vh - 100px);">
                <div id="gpu-list" class="grid gap-4">
                    <!-- GPUs will be inserted here -->
                </div>
            </div>
        </div>
    </div>
    <script type="module">
        // At the start of your script tag, add this line to make buyGpu globally available
        window.buyGpu = async function(gpuId) {
            try {
                const options = {
                    ...fetchOptions,
                    method: 'POST',
                    cache: 'no-cache'
                };
                const response = await fetch(`${javaURI}/api/mining/gpu/buy/${gpuId}`, options);
                const result = await response.json();
                if (result.success) {
                    showNotification(result.message);
                    await loadGPUs();
                    await updateMiningStats();
                }
            } catch (error) {
                console.error('Error buying GPU:', error);
                showNotification('Error buying GPU: ' + error.message);
            }
        }
        import { login, javaURI, fetchOptions } from '{{ site.baseurl }}/assets/js/api/config.js'; //imports config.js
        let hashrateChart, profitChart;
        let updateInterval;
        // Initialize charts and setup
        document.addEventListener('DOMContentLoaded', async () => {
            initializeCharts();
            setupEventListeners();
            await updateMarketPrices();
            await loadGPUs();
            startPeriodicUpdates();
        });
        function initializeCharts() {
            const chartConfig = {
                type: 'line',
                options: {
                    responsive: true,
                    animation: false,
                    scales: {
                        x: {
                            grid: { color: 'rgba(255, 255, 255, 0.1)' }
                        },
                        y: {
                            grid: { color: 'rgba(255, 255, 255, 0.1)' }
                        }
                    },
                    plugins: {
                        legend: {
                            labels: { color: 'rgba(255, 255, 255, 0.9)' }
                        }
                    }
                }
            };
            hashrateChart = new Chart(
                document.getElementById('hashrate-chart').getContext('2d'),
                {
                    ...chartConfig,
                    data: {
                        labels: [],
                        datasets: [{
                            label: 'Hashrate (MH/s)',
                            data: [],
                            borderColor: '#b144ff',
                            backgroundColor: 'rgba(177, 68, 255, 0.2)',
                            borderWidth: 3,
                            fill: true
                        }]
                    }
                }
            );
            profitChart = new Chart(
                document.getElementById('profit-chart').getContext('2d'),
                {
                    ...chartConfig,
                    data: {
                        labels: [],
                        datasets: [{
                            label: 'Profit (USD)',
                            data: [],
                            borderColor: '#BE0102',
                            backgroundColor: 'rgba(190, 1, 2, 0.2)',
                            borderWidth: 3,
                            fill: true
                        }]
                    }
                }
            );
        }
        function setupEventListeners() {
            document.getElementById('start-mining').addEventListener('click', toggleMining);
            document.getElementById('gpu-shop').addEventListener('click', openGpuShop);
            document.getElementById('pool-selection').addEventListener('change', switchPool);
        }
        async function startPeriodicUpdates() {
            updateInterval = setInterval(async () => {
                await updateMarketPrices();
                await updateMiningStats();
            }, 5000);
        }
        // API Calls
        async function updateMarketPrices() {
            try {
                const options = {
                    ...fetchOptions,
                    method: 'GET',
                    cache: 'no-cache'
                };
                const response = await fetch(`${javaURI}/api/mining/market`, options);
                const markets = await response.json();
                updateMarketDisplay(markets);
            } catch (error) {
                console.error('Error fetching market prices:', error);
            }
        }
        async function loadGPUs() {
            try {
                const options = {
                    ...fetchOptions,
                    method: 'GET',
                    cache: 'no-cache'
                };
                const response = await fetch(`${javaURI}/api/mining/shop`, options);
                const gpus = await response.json();
                renderGpuShop(gpus);
            } catch (error) {
                console.error('Error loading GPUs:', error);
            }
        }
        async function toggleMining() {
            try {
                const options = {
                    ...fetchOptions,
                    method: 'POST',
                    cache: 'no-cache'
                };
                const response = await fetch(`${javaURI}/api/mining/toggle`, options);
                const result = await response.json();
                updateMiningButton(result.active);
            } catch (error) {
                console.error('Error toggling mining:', error);
            }
        }
        async function buyGpu(gpuId) {
            try {
                const options = {
                    ...fetchOptions,
                    method: 'POST',
                    cache: 'no-cache'
                };
                const response = await fetch(`${javaURI}/api/mining/gpu/buy/${gpuId}`, options);
                const result = await response.json();
                if (result.success) {
                    showNotification(result.message);
                    await loadGPUs();
                    await updateMiningStats();
                }
            } catch (error) {
                console.error('Error buying GPU:', error);
            }
        }
        async function switchPool(event) {
            try {
                const options = {
                    ...fetchOptions,
                    method: 'POST',
                    cache: 'no-cache',
                    body: JSON.stringify({ pool: event.target.value })
                };
                const response = await fetch(`${javaURI}/api/mining/pool`, options);
                const result = await response.json();
                if (result.success) {
                    showNotification(`Switched to ${event.target.value}`);
                }
            } catch (error) {
                console.error('Error switching pool:', error);
            }
        }
        async function updateMiningStats() {
            try {
                const options = {
                    ...fetchOptions,
                    method: 'GET',
                    cache: 'no-cache'
                };
                const response = await fetch(`${javaURI}/api/mining/stats`, options);
                const stats = await response.json();
                updateDisplay(stats);
                updateCharts(stats);
            } catch (error) {
                console.error('Error updating mining stats:', error);
            }
        }
        // UI Updates
        function updateDisplay(stats) {
            if (!stats) return; // Guard clause for undefined stats
            document.getElementById('btc-balance').textContent = (stats.btcBalance || 0).toFixed(8);
            document.getElementById('pending-balance').textContent = (stats.pendingBalance || 0).toFixed(8);
            document.getElementById('usd-value').textContent = `$${(stats.usdBalance || 0).toFixed(2)}`;
            document.getElementById('hashrate').textContent = `${(stats.hashrate || 0).toFixed(2)} MH/s`;
            document.getElementById('shares').textContent = stats.shares || 0;
            document.getElementById('gpu-temp').textContent = `${(stats.temperature || 0).toFixed(1)}°C`;
            document.getElementById('power-draw').textContent = `${(stats.powerDraw || 0).toFixed(0)}W`;
            document.getElementById('daily-revenue').textContent = `$${(stats.dailyRevenue || 0).toFixed(2)}`;
            document.getElementById('power-cost').textContent = `$${(stats.powerCost || 0).toFixed(2)}`;
        }
        function updateCharts(stats) {
            const now = new Date().toLocaleTimeString();
            // Update hashrate chart
            hashrateChart.data.labels.push(now);
            hashrateChart.data.datasets[0].data.push(stats.hashrate);
            // Update profit chart
            profitChart.data.labels.push(now);
            profitChart.data.datasets[0].data.push(stats.profit);
            // Keep only last 10 points
            if (hashrateChart.data.labels.length > 10) {
                hashrateChart.data.labels.shift();
                hashrateChart.data.datasets[0].data.shift();
                profitChart.data.labels.shift();
                profitChart.data.datasets[0].data.shift();
            }
            hashrateChart.update();
            profitChart.update();
        }
        function updateMiningButton(isActive) {
            const button = document.getElementById('start-mining');
            if (isActive) {
                button.textContent = 'Stop Mining';
                button.className = 'bg-red-500 hover:bg-red-600 px-4 py-2 rounded';
            } else {
                button.textContent = 'Start Mining';
                button.className = 'bg-green-500 hover:bg-green-600 px-4 py-2 rounded';
            }
        }
        function renderGpuShop(gpus) {
            const gpuListElement = document.getElementById('gpu-list');
            gpuListElement.innerHTML = '';
            // Group GPUs by category
            const categories = {
                'Free Starter GPU': gpus.filter(gpu => gpu.price === 0),
                'Budget GPUs ($50-500)': gpus.filter(gpu => gpu.price > 0 && gpu.price <= 500),
                'Mid-Range GPUs ($500-1500)': gpus.filter(gpu => gpu.price > 500 && gpu.price <= 1500),
                'High-End GPUs ($1500-3000)': gpus.filter(gpu => gpu.price > 1500 && gpu.price <= 3000),
                'Premium GPUs ($3000+)': gpus.filter(gpu => gpu.price > 3000)
            };
            Object.entries(categories).forEach(([category, categoryGpus]) => {
                if (categoryGpus.length === 0) return;
                const categoryHeader = document.createElement('div');
                categoryHeader.className = `text-xl font-bold mb-4 mt-6 ${getCategoryColor(category)}`;
                categoryHeader.textContent = category;
                gpuListElement.appendChild(categoryHeader);
                categoryGpus.forEach(gpu => {
                    const gpuCard = createGpuCard(gpu, category);
                    gpuListElement.appendChild(gpuCard);
                });
            });
        }
        function createGpuCard(gpu, category) {
            const card = document.createElement('div');
            card.className = `gpu-card mb-4 ${getCategoryClass(category)}`;
            // Calculate daily estimates
            const dailyRevenue = gpu.hashRate * 86400 / (1e12); // Simplified calculation for demo
            const dailyPowerCost = (gpu.powerConsumption * 24) / 1000 * 0.12; // Assuming $0.12 per kWh
            const dailyProfit = dailyRevenue - dailyPowerCost;
            const roi = gpu.price / dailyProfit;
            card.innerHTML = `
                <div class="flex justify-between items-start">
                    <div class="flex-1">
                        <h3 class="text-lg font-bold ${getCategoryColor(category)}">${gpu.name}</h3>
                        <div class="grid grid-cols-2 gap-4 mt-2">
                            <div class="text-sm">
                                <p class="text-gray-400">Performance</p>
                                <p class="text-white">⚡ ${gpu.hashRate} MH/s</p>
                                <p class="text-white">🔌 ${gpu.powerConsumption}W</p>
                                <p class="text-white">🌡️ ${gpu.temperature}°C</p>
                            </div>
                            <div class="text-sm">
                                <p class="text-gray-400">Daily Estimates</p>
                                <p class="text-green-400">💰 $${dailyRevenue.toFixed(2)}</p>
                                <p class="text-red-400">💡 -$${dailyPowerCost.toFixed(2)}</p>
                                <p class="text-blue-400">📈 $${dailyProfit.toFixed(2)}</p>
                            </div>
                        </div>
                        <div class="mt-2 text-sm">
                            <p class="text-gray-400">Efficiency: ${gpu.efficiency.toFixed(3)} MH/W</p>
                            <p class="text-gray-400">ROI: ${roi.toFixed(1)} days</p>
                        </div>
                    </div>
                    <div class="text-right ml-4">
                        <p class="text-xl font-bold ${getCategoryColor(category)}">
                            ${gpu.price === 0 ? 'FREE' : '$' + gpu.price.toLocaleString()}
                        </p>
                        <button onclick="window.buyGpu(${gpu.id})" 
                                class="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded mt-2">
                            ${gpu.price === 0 ? 'Get Free' : 'Buy'}
                        </button>
                    </div>
                </div>
            `;
            return card;
        }
        function showNotification(message) {
            const notification = document.createElement('div');
            notification.className = 'fixed bottom-4 right-4 bg-gray-800 text-white px-4 py-2 rounded shadow-lg transition-opacity duration-500';
            notification.textContent = message;
            document.body.appendChild(notification);
            setTimeout(() => {
                notification.style.opacity = '0';
                setTimeout(() => notification.remove(), 500);
            }, 3000);
        }
        // Utility functions
        function getCategoryColor(category) {
            const colors = {
                'Free Starter GPU': 'text-green-400',
                'Budget GPUs ($50-500)': 'text-blue-400',
                'Mid-Range GPUs ($500-1500)': 'text-purple-400',
                'High-End GPUs ($1500-3000)': 'text-orange-400',
                'Premium GPUs ($3000+)': 'text-red-400'
            };
            return colors[category] || 'text-white';
        }
        function getCategoryClass(category) {
            const classes = {
                'Free Starter GPU': 'starter',
                'Budget GPUs ($50-500)': 'budget',
                'Mid-Range GPUs ($500-1500)': 'mid-range',
                'High-End GPUs ($1500-3000)': 'high-end',
                'Premium GPUs ($3000+)': 'premium'
            };
            return classes[category] || '';
        }
        function openGpuShop() {
            const modal = document.getElementById('gpu-shop-modal');
            modal.classList.remove('hidden');
        }
        // Add close shop functionality
        document.getElementById('close-shop').addEventListener('click', () => {
            const modal = document.getElementById('gpu-shop-modal');
            modal.classList.add('hidden');
        });
        // Close modal when clicking outside
        document.getElementById('gpu-shop-modal').addEventListener('click', (e) => {
            if (e.target.id === 'gpu-shop-modal') {
                e.target.classList.add('hidden');
            }
        });
        // Define all functions first
        function updateMarketDisplay(markets) {
            if (!markets) return; // Guard clause
            const elements = {
                'nice-price': markets.nicehash,
                'nice-change': markets.nicehashChange,
                'eth-price': markets.ethereum,
                'eth-change': markets.ethereumChange,
                'f2p-price': markets.f2pool,
                'f2p-change': markets.f2poolChange,
                'btc-price': markets.bitcoin,
                'btc-change': markets.bitcoinChange
            };
            for (const [id, value] of Object.entries(elements)) {
                const element = document.getElementById(id);
                if (element) {
                    element.textContent = id.includes('price') ? 
                        `$${(value || 0).toFixed(2)}` : 
                        `${(value || 0).toFixed(2)}%`;
                }
            }
        }
    </script>
</body>
</html>