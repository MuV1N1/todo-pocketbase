import PocketBase from "pocketbase";


export async function freezeNote(element, pb) {
  element.forEach((element) => {
    freeze(element, pb);
  });
}

function freeze(element, pb) {
  element.addEventListener("click", async (e) => {

    e.preventDefault();
    const id = element.id;
    const date = new Date();
    const data = {
      finished: false,
      freezeDate: date,
      freeze: true,
      sortBottom: true,
    };
    await pb.collection("notes").update(id, data);
    location.reload(false);

  });
}
