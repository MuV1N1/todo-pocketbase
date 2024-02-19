import PocketBase from "pocketbase";

export function removeNote(element) {
  if (element === null) return;
  element.addEventListener("click", (e) => {
    if (
      confirm(
        "Are you sure?\
        \nWhen you DELETE this note you have NO chance to get it back!\
        \nBe Realy sure if you want to delete it!"
      )
    ) {
      e.preventDefault();
      deleteNote(element.id);
    } else {
      setTimeout((e) => {
        location.reload(true);
      }),
        3000000;
    }
  });
}
async function deleteNote(id) {
  const pb = new PocketBase("http://localhost:8090/");
  await pb.collection("notes").delete(id);
  setTimeout((e) => {
    location.reload(true);
  }),
    3000000;
}
