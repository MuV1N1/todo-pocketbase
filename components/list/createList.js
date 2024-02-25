import PocketBase from "pocketbase";

export function setupList(element) {
  element.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get("createListName");
    let urlParams = new URLSearchParams(window.location.search);
    let selectedUserID = urlParams.get("selectedUserID");
    create(name, selectedUserID);
  });
}
async function create(name, user) {
  const pb = new PocketBase("https://todolis.pockethost.io/");
  const record = await pb.collection("list").create({ name: name, user: user });
  location.href = "/todo-pocketbase/index.html?selectedUserID=" + user + "selectedListID=" + record.id;
}
