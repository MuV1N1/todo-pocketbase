import PocketBase from "pocketbase";

export function setupList(element) {
  element.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get("createListName");
    create(name);
  });
}
async function create(name) {
  const pb = new PocketBase("http://45.93.251.164:8090");
  await pb.collection("list").create({ name: name });
  let recordsuf = pb.collection("list").getFullList();
  let records = await recordsuf;
  records.forEach(item => location.href="/index.html?selectedValue=" + item.id);
}
