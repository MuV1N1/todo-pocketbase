import PocketBase from "pocketbase";

export function removeList(element) {
  element.addEventListener("submit", (e) => {
    if (confirm("")) {
      e.preventDefault();
      let urlParams = new URLSearchParams(window.location.search);
      let selectedValue = urlParams.get("select");
      deleteList(selectedValue);
    }
  });
}
async function deleteList(id) {
  console.log(id);
  const pb = new PocketBase("http://localhost:8090/");
  await pb.collection("list").delete(id);
  location.href = "/index.html";
}
