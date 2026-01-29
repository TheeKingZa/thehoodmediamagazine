document.addEventListener("DOMContentLoaded", () => {
  fetch("data.json")
    .then(r => r.ok ? r.json() : Promise.reject("Failed to load data.json"))
    .then(data => {
      renderGrid("services-container", data.services, "name", "description", "image", "link", "Learn more →");
      renderArticles("articles-container", data.articles);
    })
    .catch(console.error);
});

function renderGrid(containerId, items, titleKey, descKey, imgKey, linkKey, linkText) {
  const c = document.getElementById(containerId);
  c.innerHTML = "";
  items.forEach(item => {
    const card = document.createElement("article");
    card.className = "card";
    card.innerHTML = `
      <img src="${item[imgKey]}" alt="${item[titleKey]}">
      <h3>${item[titleKey]}</h3>
      <p>${item[descKey]}</p>
      <a href="${item[linkKey]}">${linkText}</a>
    `;
    c.appendChild(card);
  });
}

function renderArticles(containerId, articles) {
  const c = document.getElementById(containerId);
  c.innerHTML = "";
  articles.forEach(a => {
    let dateHtml = "";
    if (a.date && a.date.month && a.date.year) {
      dateHtml = `<span class="article-date">${a.date.month} ${a.date.year}</span>`;
    }
    const card = document.createElement("article");
    card.className = "card";
    card.innerHTML = `
      <img src="${a.image}" alt="${a.title}">
      <h3>${a.title}</h3>
      ${dateHtml}
      <p>${a.description}</p>
      <a href="${a.link}">Read more →</a>
    `;
    c.appendChild(card);
  });
}