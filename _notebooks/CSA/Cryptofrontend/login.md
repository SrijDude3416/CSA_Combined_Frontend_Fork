---
layout: post
title: Login Page
type: issues
permalink: /login/
---
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Authentication</title>
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
        }
        /* Container */
        .auth-container {
            display: flex;
            background-color: #fff;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            overflow: hidden;
            width: 600px;
        }
        /* Form Wrapper */
        .form-wrapper {
            padding: 2rem;
            width: 50%;
        }
        /* Form Titles */
        h2 {
            font-size: 1.5rem;
            color: #333;
            margin-bottom: 1rem;
        }
        /* Form Inputs */
        label {
            display: block;
            margin-top: 1rem;
            font-weight: bold;
            color: #555;
        }
        input {
            width: 100%;
            padding: 8px;
            margin-top: 5px;
            border: 1px solid #ddd;
            border-radius: 4px;
            font-size: 1rem;
            color: #333;
        }
        /* Submit Buttons */
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
        /* Error and Success Messages */
        .message {
            color: red;
            font-size: 0.9rem;
            margin-top: 10px;
        }
        .success {
            color: green;
        }
    </style>
</head>
<body>
    <div class="auth-container">
        <!-- Login Form -->
        <div class="form-wrapper" id="loginSection">
            <h2>Login</h2>
            <form id="loginForm">
                <label for="loginEmail">Email:</label>
                <input type="email" id="loginEmail" required>
                <label for="loginPassword">Password:</label>
                <input type="password" id="loginPassword" required>
                <button type="submit">Login</button>
                <p id="loginMessage" class="message"></p>
            </form>
        </div>
        <!-- Signup Form -->
        <div class="form-wrapper" id="signupSection">
            <h2>Sign Up</h2>
            <form id="signupForm">
                <label for="signupName">Name:</label>
                <input type="text" id="signupName" required>
                <label for="signupEmail">Email:</label>
                <input type="email" id="signupEmail" required>
                <label for="signupPassword">Password:</label>
                <input type="password" id="signupPassword" required>
                <label for="signupDob">Date of Birth (MM-DD-YYYY):</label>
                <input type="text" id="signupDob" required>
                <button type="submit">Sign Up</button>
                <p id="signupMessage" class="message"></p>
            </form>
        </div>
    </div>
    <script>
        // Define fetchOptions inline
        const fetchOptions = {
            method: 'GET',
            mode: 'cors',
            cache: 'default',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'X-Origin': 'client'
            },
        };
        
        // Re-define the login function here
        function login(options) {
            const requestOptions = {
                ...fetchOptions,
                method: options.method,
                body: JSON.stringify(options.body)
            };
            document.getElementById(options.message).textContent = "";
            fetch(options.URL, requestOptions)
            .then(response => {
                if (!response.ok) {
                    const errorMsg = 'Login error: ' + response.status;
                    console.log(errorMsg);
                    document.getElementById(options.message).textContent = errorMsg;
                    return;
                }
                // Store email in localStorage upon successful login
                localStorage.setItem("userEmail", options.body.email);
                options.callback();
            })
            .catch(error => {
                console.log('Possible CORS or Service Down error: ' + error);
                document.getElementById(options.message).textContent = 'Possible CORS or service down error: ' + error;
            });
        }

        // Function to handle login
        document.getElementById("loginForm").addEventListener("submit", function (e) {
            e.preventDefault();
            const loginURL = "http://localhost:4100/authenticate";
            login({
                URL: loginURL,
                method: "POST",
                body: {
                    email: document.getElementById("loginEmail").value,
                    password: document.getElementById("loginPassword").value
                },
                message: "loginMessage",
                callback: () => {
                    document.getElementById("loginMessage").classList.add("success");
                    document.getElementById("loginMessage").textContent = "Login successful!";
                    setTimeout(() => window.location.href = "/CollegeAppFrontend/teams/", 1000);  // Redirect to /teams on success
                }
            });
        });

        // Function to handle signup
        document.getElementById("signupForm").addEventListener("submit", function (e) {
            e.preventDefault();
            const signupURL = "http://127.0.0.1:4100/api/person/create";
            fetch(signupURL, {
                ...fetchOptions,
                method: "POST",
                body: JSON.stringify({
                    email: document.getElementById("signupEmail").value,
                    password: document.getElementById("signupPassword").value,
                    name: document.getElementById("signupName").value,
                    dob: document.getElementById("signupDob").value
                })
            })
            .then(response => {
                if (response.ok) {
                    // Store email in localStorage upon successful signup
                    localStorage.setItem("userEmail", document.getElementById("signupEmail").value);
                    document.getElementById("signupMessage").classList.add("success");
                    document.getElementById("signupMessage").textContent = "Signup successful! Redirecting...";
                    setTimeout(() => window.location.href = "/CollegeAppFrontend/teams", 1000);  // Redirect to /teams on success
                } else {
                    return response.json().then(data => {
                        throw new Error(data.message || "Signup failed.");
                    });
                }
            })
            .catch(error => {
                document.getElementById("signupMessage").textContent = error.message;
            });
        });
    </script>
</body>
</html>
