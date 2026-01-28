document.addEventListener("DOMContentLoaded", () => {
  fetch("data.json")
    .then(res => {
      if (!res.ok) throw new Error("Could not load data.json");
      return res.json();
    })
    .then(data => {
      renderIssueDate(data.issue);
      renderArticles(data.articles);
    })
    .catch(err => {
      console.error(err);
      document.getElementById("issue-date").textContent = "—";
    });
});

function renderIssueDate(issue) {
  // Build “Month Day, Year” or fallback to “Month Year”
  let parts = [];
  if (issue.month) parts.push(issue.month);
  if (issue.day)   parts.push(issue.day);
  if (issue.year)  parts.push(issue.year);
  // Join with spaces, but if day is missing it becomes “Month Year”
  const dt = parts.join(issue.day ? " " : " ");
  document.getElementById("issue-date").textContent = dt;
}

function renderArticles(articles) {
  const container = document.getElementById("articles");
  container.innerHTML = "";  // clear any placeholder

  articles.forEach(a => {
    const card = document.createElement("article");
    card.className = "card";
    card.innerHTML = `
      <img src="${a.image}" alt="${a.title}">
      <h3>${a.title}</h3>
      <p>${a.description}</p>
      <a class="read-more" href="${a.link}">Read more →</a>
    `;
    container.appendChild(card);
  });
}