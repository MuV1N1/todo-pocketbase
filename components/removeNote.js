import PocketBase from "pocketbase";

export function removeNote(element) {
  if(element === null) return;
  element.addEventListener("click", (e) => {
    e.preventDefault();
    console.log(element.getAttribute("name"));
    deleteNote(element.id);
  });
}
async function deleteNote(id) {
  const pb = new PocketBase("http://localhost:8090/");
  await pb.collection("notes").delete(id);
  location.reload();
}
