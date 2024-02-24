import PocketBase from "pocketbase";

export function updateList(element) {
  element.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const newName = formData.get("renameList")

    let urlParams = new URLSearchParams(window.location.search);
    let selectedValue = urlParams.get("selectedValue");
    refactorList(selectedValue, newName);
  });
}
async function refactorList(id, newName) {
  const pb = new PocketBase("http://45.93.251.164:8090");

  const data = {
    name: newName,
  }

  await pb.collection("list").update(id, data);
  location.href = "/index.html?selectedValue=" + id;
}
