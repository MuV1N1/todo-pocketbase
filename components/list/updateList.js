import PocketBase from "pocketbase";

export function updateList(element) {
  element.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const newName = formData.get("updateList")

    let urlParams = new URLSearchParams(window.location.search);
    let selectedListID = urlParams.get("selectedListID");
    let selectedUserID = urlParams.get("selectedUserID");
    refactorList(selectedListID, newName, selectedUserID);
  });
}
async function refactorList(id, newName, uID) {
  const pb = new PocketBase("http://localhost:8090/");

  const data = {
    name: newName,
  }

  await pb.collection("list").update(id, data);
  location.href = "/index.html?selectedUserID=" + uID + "&selectedListID=" + id;
}
