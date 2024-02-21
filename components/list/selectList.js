export function selectList(element) {
  element.addEventListener("submit", function (event) {
    event.preventDefault();
    let selectedValue = this.select.value;
    location.href = "/index.html?selectedValue=" + encodeURIComponent(selectedValue);
  });
}
