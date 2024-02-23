import PocketBase from "pocketbase";

const pb = new PocketBase("https://remember-ring.pockethost.io//");

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
