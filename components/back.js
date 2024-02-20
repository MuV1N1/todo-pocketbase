export function back(element) {
  element.addEventListener("click", (e) => {
    e.preventDefault();
    location.href = "/index.html";
  });
}