import PocketBase from 'pocketbase';

const pb = new PocketBase("http://localhost:8090/");

export async function updateNote(element){
    
    element.forEach(element => {
        test(element)
    });
    
}


function test(element) {
    element.addEventListener("submit", async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
  
        const records = await pb.collection("notes").getFullList({
          sort: "-created",
        });
    
        const title = formData.get("newNoteTitle");
        const text = formData.get("newNoteText");
    
        const id = element.id;
  
        console.log(id)
        
        const filteredRecords = records.filter((item) => item.id == id)[0];
        console.log(JSON.stringify(filteredRecords));
    
        if(filteredRecords.title == title && filteredRecords.text == text){
          return;
        }else if(filteredRecords.title != title && filteredRecords.text == text){
          await pb.collection('notes').update(id, {"title": title});
          console.log(id);
          location.reload();
        }else if(filteredRecords.title != title && filteredRecords.text != text){
          console.log(id);
          await pb.collection('notes').update(id, {"title": title, "text": text});
          location.reload();
        }else if(filteredRecords.title == title && filteredRecords.text != text){
          await pb.collection('notes').update(id, {"text": text});
          console.log(id);
          location.reload();
        }
        
      })
}