import PocketBase from 'pocketbase';

export function setupNote(element) {
  element.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
  
    const title = formData.get("noteTitle");
    const note = formData.get("noteText");
    const date = formData.get("noteDeadline");
    
    create(title, note, date);
    // handle submit
  });
}
async function create(title, note, date) {
  const pb = new PocketBase("http://localhost:8090/");

  const data = {
    title: title,
    text: note,
    deadline: date,
    finished: false,
    freeze: false,
  };
  
  await pb.collection("notes").create(data);
  location.reload(false);

}
