import PocketBase from "pocketbase";

const pb = new PocketBase("http://localhost:8090/");

export async function updateNoteList(elements) {
    elements.forEach((element) => {
        let selectElement = element.querySelector('select[id="selectNewList"]');
        if (selectElement) {
          let selectedValue = selectElement.value;
          note(element ,selectedValue);
        } else {
          return;
        }
    });
}

function note(element, value) {
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
