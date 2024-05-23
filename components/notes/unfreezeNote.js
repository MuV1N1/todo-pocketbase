export async function unfreezeNote(element, pb) {
  element.forEach((element) => {
    unfreeze(element, pb);
  });
}

function unfreeze(element, pb) {
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
