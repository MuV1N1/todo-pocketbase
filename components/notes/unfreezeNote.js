import PocketBase from "pocketbase";

const pb = new PocketBase("http://localhost:8090/");

export async function unfreezeNote(element) {
  element.forEach((element) => {
    unfreeze(element);
  });
}

function unfreeze(element) {
  element.addEventListener("click", async (e) => {
    e.preventDefault();
    const id = element.id;
    const data = {
      finished: false,
      freezeDate: NaN,
      freeze: false,
      sortBottom: false,
    };

    await pb.collection("notes").update(id, data);
    location.reload(false);

  });
}
