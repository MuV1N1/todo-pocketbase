import PocketBase from "pocketbase";


export async function unfinishNote(element, pb) {
  element.forEach((element) => {
    unfinish(element), pb;
  });
}

function unfinish(element, pb) {
  element.addEventListener("click", async (e) => {
    e.preventDefault();
    const id = element.id;
    const data = {
      finished: false,
      finishedDate: NaN,
      finished: false,
      sortBottom: false,
    };

    await pb.collection("notes").update(id, data);
    location.reload(false);

  });
}
