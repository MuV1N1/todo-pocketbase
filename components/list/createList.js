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
  const pb = new PocketBase("https://remember-ring.pockethost.io/");
  await pb.collection("list").create({ name: name });
  let recordsuf = pb.collection("list").getFullList();
  let records = await recordsuf;
  records.forEach(item => location.href="/index.html?selectedValue=" + item.id);
}
