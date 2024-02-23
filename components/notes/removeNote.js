import PocketBase from "pocketbase";




export function removeNote(element) {
  if (element === null) return;
  element.forEach((item) => {
    item.addEventListener("click", (e) => {
      if (
        confirm(
          "Are you sure?\
          \nWhen you DELETE this note you have NO chance to get it back!\
          \nBe realy sure if you want to delete it!"
        )
      ) {
        e.preventDefault();
        deleteNote(item.id);
      } else {
        return;
      }
    });
  });
}
async function deleteNote(id) {
  const pb = new PocketBase("http://localhost:8090");
  await pb.collection("notes").delete(id);
  location.reload(false);
}
