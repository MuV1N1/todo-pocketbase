
export function setupList(element, pocketBase) {
  element.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get("createListName");
    let urlParams = new URLSearchParams(window.location.search);
    let selectedUserID = urlParams.get("selectedUserID");
    create(name, selectedUserID, pocketBase);
  });
}
async function create(name, user, pocketBase) {
  const record = await pocketBase.collection("list").create({ name: name, user: user });
  location.href = "/todo-pocketbase/index.html?selectedUserID=" + user + "selectedListID=" + record.id;
}
