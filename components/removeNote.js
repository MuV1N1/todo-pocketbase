import PocketBase from 'pocketbase';

export function removeNote(element) {
  element.addEventListener("delete", (e) => {
    e.preventDefault();
    create(e.target);
    // handle submit
  });
}
async function create(item) {
  const pb = new PocketBase("http://localhost:8090/");
  await pb.collection("notes").delete(item);
  location.reload();
}
