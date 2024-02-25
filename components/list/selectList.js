export function selectList(element) {
  element.addEventListener("submit", function (event) {
    event.preventDefault();
    let urlParams = new URLSearchParams(window.location.search);
    const selectedUserID = urlParams.get("selectedUserID"); 
    let selectedListID = this.select.value;
    location.href = "/todo-pocketbase/index.html?selectedUserID=" + selectedUserID + "&selectedListID=" + encodeURIComponent(selectedListID);
  });
}
