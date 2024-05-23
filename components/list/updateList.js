import PocketBase from "pocketbase";

export function updateList(element, pb) {
  element.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const newName = formData.get("renameList")

    let urlParams = new URLSearchParams(window.location.search);
    let selectedValue = urlParams.get("selectedValue");
    refactorList(selectedValue, newName, pb);
  });
}
async function refactorList(id, newName, pb) {
  const data = {
    name: newName,
  }

  await pb.collection("list").update(id, data);
  location.href = "/todo-pocketbase/index.html?selectedValue=" + id;
}
