import PocketBase from "pocketbase";

const pb = new PocketBase("http://45.93.251.164:8090");

export async function freezeNote(element) {
  element.forEach((element) => {
    freeze(element);
  });
}

function freeze(element) {
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
