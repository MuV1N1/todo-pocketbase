import PocketBase from "pocketbase";

const pb = new PocketBase("https://todolis.pockethost.io/");

export async function finishNote(element) {
  element.forEach((element) => {
    finish(element);
  });
}

function finish(element) {
  element.addEventListener("click", async (e) => {
    e.preventDefault();
    const id = element.id;
    const date = new Date();
    const data = {
      finished: true,
      finishedDate: date,
      freeze: false,
      sortBottom: true,
    };
    await pb.collection("notes").update(id, data);
    location.reload(false);

  });
}
