import PocketBase from "pocketbase";


export async function updateNoteList(elements, pb) {
    elements.forEach((element) => {
        let selectElement = element.querySelector('select[id="selectNewList"]');
        if (selectElement) {
          let selectedListID = selectElement.value;
          note(element ,selectedListID, pb);
        } else {
          return;
        }
    });
}

function note(element, value, pb) {
  element.addEventListener("submit", async (e) => {
    e.preventDefault();
    const id = element.id;
    let nid = "";
    nid = id.replace("-", "")
    const data = {
      list: value,
    };

    await pb.collection("notes").update(nid, data);
    location.reload(false);
  });
}
