import PocketBase from "pocketbase";

export function removeList(element, pb) {
  element.addEventListener("click", (e) => {
    e.preventDefault();
    deleteList(pb);
  });
}
async function deleteList(pb) {
  let urlParams = new URLSearchParams(window.location.search);
  let selectedListID = urlParams.get("selectedListID");
  if (selectedListID == undefined) selectedListID = urlParams.get("select");
  let selectedUserID = urlParams.get("selectedUserID");

  if (
    confirm(
      "When You delete the note list you'l never get it back! All your notes of this list will be gone!"
    )
  ) {
    let records = await pb.collection("notes").getFullList();

    records.forEach(async (record) => {
      if (record.list == selectedListID) {
        await pb.collection("notes").delete(record.id);
      }
    });

    await pb.collection("list").delete(selectedListID);
    location.href = "/todo-pocketbase/index.html?selectedUserID=" + selectedUserID;
  }
}
