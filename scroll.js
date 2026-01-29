const btn = document.getElementById("backToTop");
window.addEventListener("scroll", () => {
  btn.classList.toggle("show", window.scrollY > 200);
});
btn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});