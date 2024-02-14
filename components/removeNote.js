import PocketBase from 'pocketbase';

export function removeNote(element, item) {
  element.addEventListener("delete", (e) => {
    e.preventDefault();
    create(title, note);
    // handle submit
  });
}
async function create(item) {
  const pb = new PocketBase("http://localhost:8090/");
  await pb.collection("notes").delete(item.id);
  location.reload();
}
