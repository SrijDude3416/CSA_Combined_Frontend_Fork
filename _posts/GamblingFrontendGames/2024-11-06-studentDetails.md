---
layout: post
title: Student Info
type: issues
permalink: /student-info
comments: false
---
<html>
<head>
  <title>Student GitHub Profile</title>
  <style>
    #details-container {
      display: flex;
      align-items: center;
      gap: 20px;
      background-color: #3a3a3a;
      border-radius: 10px;
      padding: 20px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
      max-width: 700px;
    }
    #profile-pic {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      border: 2px solid #ddd;
    }
    .details-content {
      display: flex;
      flex-direction: column;
      gap: 5px;
    }
    .details-content a {
      color: #b0d4ff;
      text-decoration: none;
    }
    .details-content p {
      margin: 2px 0;
      font-size: 16px;
    }
  </style>
</head>
<body>

<div id="details-container">
  <img id="profile-pic" src="" alt="Profile Picture">
  <div class="details-content">
    <p><strong>Username:</strong> <span id="githubUsername"></span></p>
    <p><strong>Profile URL:</strong> <a id="githubProfile" href="" target="_blank"></a></p>
    <p><strong>Issues:</strong> <span id="githubIssues"></span></p>
    <p><strong>Pull Requests:</strong> <span id="githubPulls"></span></p>
    <p><strong>Commits:</strong> <span id="githubCommits"></span></p>
    <p><strong>Public Repos:</strong> <span id="githubRepos"></span></p>
    <p><strong>Public Gists:</strong> <span id="githubGists"></span></p>
    <p><strong>Followers:</strong> <span id="githubFollowers"></span></p>
  </div>
</div>

<script>
  async function fetchStudentDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get("name");
    const course = urlParams.get("course");
    const trimester = urlParams.get("trimester");
    const period = urlParams.get("period");

    const criteriaDto = {
      name: name,
      course: course,
      trimester: parseInt(trimester),
      period: parseInt(period)
    };

    try {
      const studentResponse = await fetch("http://localhost:8181/api/students/find", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(criteriaDto)
      });

      if (!studentResponse.ok) throw new Error("Student not found");

      const student = await studentResponse.json();
      const githubUsername = student.username;
      const githubResponse = await fetch(`https://api.github.com/users/${githubUsername}`);

      if (!githubResponse.ok) throw new Error("GitHub profile not found");

      const githubData = await githubResponse.json();

      // Populate the details on the page
      document.getElementById("profile-pic").src = githubData.avatar_url;
      document.getElementById("githubUsername").innerText = githubData.login;
      document.getElementById("githubProfile").href = githubData.html_url;
      document.getElementById("githubProfile").innerText = githubData.html_url;
      document.getElementById("githubRepos").innerText = githubData.public_repos;
      document.getElementById("githubGists").innerText = githubData.public_gists;
      document.getElementById("githubFollowers").innerText = githubData.followers;

      // For additional GitHub data like issues, PRs, and commits, you might need to fetch from different API endpoints or specific repositories.
      document.getElementById("githubIssues").innerText = "15"; // Placeholder data
      document.getElementById("githubPulls").innerText = "5";   // Placeholder data
      document.getElementById("githubCommits").innerText = "517"; // Placeholder data

    } catch (error) {
      console.error("Error:", error);
      alert(error.message);
    }
  }

  window.onload = fetchStudentDetails;
</script>

</body>
</html>