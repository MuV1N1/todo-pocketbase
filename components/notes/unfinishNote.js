import PocketBase from "pocketbase";

const pb = new PocketBase("http://localhost:8090/");

export async function unfinishNote(element) {
  element.forEach((element) => {
    unfinish(element);
  });
}

function unfinish(element) {
  element.addEventListener("click", async (e) => {
    e.preventDefault();
    console.log("This is a test");
    const id = element.id;
    const data = {
      finished: false,
      finishedDate: NaN
    };

    await pb.collection("notes").update(id, data);
    setTimeout((e) => {
      location.reload(true);
    }),
      3000000;
  });
}
