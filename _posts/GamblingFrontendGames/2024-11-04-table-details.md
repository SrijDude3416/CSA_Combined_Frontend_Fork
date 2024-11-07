---
layout: post
title: Table Details
type: issues
permalink: /tabledetails
comments: false
---
<style>
  h2 {
      color: white;
  }
  #student-cards-container {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 20px;
      margin-top: 20px;
      justify-content: center;
  }
  .student-card {
      background-color: #fff;
      border: 1px solid #ddd;
      border-radius: 5px;
      padding: 20px;
      width: 280px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      text-align: center; /* Center text in the card */
      display: flex;
      flex-direction: column;
      align-items: center; /* Center content horizontally */
  }
  .student-card h3 {
      margin: 10px 0;
      font-size: 20px;
      color: black;
  }
  .student-card p {
      margin: 5px 0;
      font-size: 16px;
      color: black;
  }
  .student-image {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      margin-bottom: 10px;
  }
  .delete-button {
      margin-top: 10px;
      padding: 8px 12px;
      background-color: #ff4d4d;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
  }
  .create-button {
      margin: 20px auto;
      padding: 10px 30px;
      background-color: #007BFF;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      display: block;
      font-size: 16px;
      font-weight: bold;
  }
</style>
<body>

  <h2>Students in Table</h2>
  <div id="student-cards-container"></div>
  <button class="create-button" onclick="createStudent()">Create Student</button>

  <script>
    document.addEventListener("DOMContentLoaded", function() {
      const urlParams = new URLSearchParams(window.location.search);
      const tableNumber = urlParams.get('table');

      if (tableNumber) {
        fetch("http://127.0.0.1:8181/api/students/find-team", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            course: "CSA",
            trimester: 1,
            period: 3,
            table: parseInt(tableNumber)
          })
        })
        .then(response => {
          if (!response.ok) throw new Error("Network response was not ok");
          return response.json();
        })
        .then(data => {
          const container = document.getElementById("student-cards-container");
          container.innerHTML = "";
          data.forEach(student => {
            const card = document.createElement("div");
            card.className = "student-card";
            
            // Fetch GitHub profile picture
            fetch(`https://api.github.com/users/${student.username}`)
              .then(response => response.json())
              .then(githubData => {
                const imageUrl = githubData.avatar_url || "default-image-url.jpg"; // fallback image if not found
                card.innerHTML = `
                  <img src="${imageUrl}" alt="${student.username}'s Profile Picture" class="student-image">
                  <h3>${student.name}</h3>
                  <p>Username: ${student.username}</p>
                  <p>Table Number: ${student.tableNumber}</p>
                  <p>Course: ${student.course}</p>
                  <p>Trimester: ${student.trimester}</p>
                  <p>Period: ${student.period}</p>
                  <p>Tasks: ${student.tasks.join(", ")}</p>
                  <button class="delete-button" onclick="deleteStudent('${student.username}')">Delete</button>
                `;
              })
              .catch(error => {
                console.error("GitHub profile fetch error:", error);
                card.innerHTML = `
                  <img src="default-image-url.jpg" alt="Default Profile Picture" class="student-image">
                  <h3>${student.name}</h3>
                  <p>Username: ${student.username}</p>
                  <p>Table Number: ${student.tableNumber}</p>
                  <p>Course: ${student.course}</p>
                  <p>Trimester: ${student.trimester}</p>
                  <p>Period: ${student.period}</p>
                  <p>Tasks: ${student.tasks.join(", ")}</p>
                  <button class="delete-button" onclick="deleteStudent('${student.username}')">Delete</button>
                `;
              });
            container.appendChild(card);
          });
        })
        .catch(error => console.error("There was a problem with the fetch operation:", error));
      } else {
        document.getElementById("student-cards-container").innerHTML = "<p>No table selected.</p>";
      }
    });

    function deleteStudent(username) {
      fetch(`http://127.0.0.1:8181/api/students/delete?username=${encodeURIComponent(username)}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        mode: "cors"
      })
      .then(response => {
        if (!response.ok) throw new Error("Failed to delete student with username: " + username);
        return response.text();
      })
      .then(message => {
        console.log(message);
        alert(message);
        location.reload();
      })
      .catch(error => console.error("There was a problem with the delete operation:", error));
    }

    function createStudent() {
      const name = prompt("Enter student name:");
      const username = prompt("Enter student username:");
      const tableNumber = prompt("Enter table number:");
      const course = "CSA";
      const trimester = 1;
      const period = 3;
      const tasks = []; // Initial empty tasks

      if (name && username && tableNumber) {
        fetch("http://127.0.0.1:8181/api/students/create", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: name,
            username: username,
            tableNumber: parseInt(tableNumber),
            course: course,
            trimester: trimester,
            period: period,
            tasks: tasks
          })
        })
        .then(response => {
          if (!response.ok) throw new Error("Failed to create student");
          return response.json();
        })
        .then(student => {
          alert("Student created successfully!");
          location.reload();
        })
        .catch(error => console.error("There was a problem with the create operation:", error));
      } else {
        alert("Please fill in all fields to create a student.");
      }
    }
  </script>
</body>