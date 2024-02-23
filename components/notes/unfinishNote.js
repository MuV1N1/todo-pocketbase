import PocketBase from "pocketbase";




const pb = new PocketBase("http://127.0.0.1:8090");

export async function unfinishNote(element) {
  element.forEach((element) => {
    unfinish(element);
  });
}

function unfinish(element) {
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
