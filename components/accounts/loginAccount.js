import PocketBase from "pocketbase";

export function loginAccount(element, pocketBase) {
  element.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("loginEmail");
    const password = formData.get("loginPassword");
    login(email.toLowerCase(), password);
  });
}
async function login(email, password) {

  try{
  const data = await pb
    .collection("users")
    .authWithPassword(email, password);
    
    document.cookie = "id=" + data.id; 

    location.href = "/todo-pocketbase/index.html?selectedUserID=" + data.record.id;
  
  }catch(err){
    alert("Invalid email or password");
  }
}
