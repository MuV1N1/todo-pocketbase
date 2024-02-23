import PocketBase from "pocketbase";




export function setupNote(element, list) {

  element.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
  
    const title = formData.get("noteTitle");
    const note = formData.get("noteText");
    const date = formData.get("noteDeadline");
    
    create(title, note, date, list);
    // handle submit
  });
}
async function create(title, note, date, list) {
  const pb = new PocketBase("http://localhost:8090");

  if(list !== null){
    const data = {
      title: title,
      text: note,
      deadline: date,
      finished: false,
      freeze: false,
      sortBottom: false,
      list: list,
    };
    
    await pb.collection("notes").create(data);
    location.reload(false);
  } 
  

}
