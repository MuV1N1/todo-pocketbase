import PocketBase from "pocketbase";

export function removeNote(element) {
  if(element === null) return;
  element.addEventListener("click", (e) => {
    e.preventDefault();
    deleteNote(element.id);
  });
}
async function deleteNote(id) {
  const pb = new PocketBase("http://localhost:8090/");
  await pb.collection("notes").delete(id);
  setTimeout(e =>{
    location.reload(true);
  }),3000000;
}
