import PocketBase from "pocketbase";

export function setupList(element) {
  element.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get("createListName");

    const urlParams = new URLSearchParams(window.location.search);
    const selectedUserID = urlParams.get("selectedUserID"); 

    create(name, selectedUserID);
  });
}
async function create(name, uID) {
  const pb = new PocketBase("http://localhost:8090/");
  await pb.collection("list").create({ name: name, user: uID});
  let recordsuf = pb.collection("list").getFullList();
  let records = await recordsuf;
  records.forEach(item => location.href="/index.html?selectedUserID=" + uID + "&selectedListID=" + item.id);
}
