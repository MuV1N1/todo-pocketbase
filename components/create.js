import PocketBase from 'pocketbase';

export function setupNote(element) {
  element.addEventListener("submit", (e) => {
    e.preventDefault();
  
    const formData = new FormData(event.target);
  
    const title = formData.get("noteTitle");
    const note = formData.get("noteText");
    create(title, note);
    // handle submit
  });
}
async function create(title, note) {
  const pb = new PocketBase("http://localhost:8090/");

  const data = {
    title: title,
    text: note,
  };
  const record = await pb.collection("notes").create(data);
}
