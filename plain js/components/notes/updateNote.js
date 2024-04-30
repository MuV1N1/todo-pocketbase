import PocketBase from "pocketbase";

const pb = new PocketBase("https://todolis.pockethost.io/");

export async function updateNote(element){
    element.forEach(element => {
        note(element)
    });
    
}

function note(element) {
    element.addEventListener("submit", async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
  
        const id = element.id;
        const title = formData.get("newNoteTitle");
        const text = formData.get("newNoteText");
        const deadline = formData.get("newNoteDeadline");
        
        const data = {
          title: title,
          text: text,
          deadline: deadline,
          finished: false,
          freeze: false,
          sortBottom: false,
        };
        await pb.collection('notes').update(id, data);
          location.reload(false);
      })
}