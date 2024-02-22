import PocketBase from "pocketbase";
const pb = new PocketBase("http://45.93.251.164:8090/");
export function removeList(element) {
  element.addEventListener("click", (e) => {
    e.preventDefault();
    deleteList();
  });
}
async function deleteList() {
  let urlParams = new URLSearchParams(window.location.search);
  let selectedValue = urlParams.get("selectedValue");
  if (selectedValue == undefined) selectedValue = urlParams.get("select");

  if (
    confirm(
      "When You delete the note list you'l never get it back! All your notes will be gone!"
    )
  ) {
    let records = await pb.collection("notes").getFullList();

    records.forEach(async (record) => {
      if (record.list == selectedValue) {
        await pb.collection("notes").delete(record.id);
      }
    });

    await pb.collection("list").delete(selectedValue);
    location.href = "/index.html";
  }
}
