import PocketBase from "./pocketbase.es.mjs";



export function loginAccount(element) {
  element.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("loginEmail");
    const password = formData.get("loginPassword");
    login(email.toLowerCase(), password);
  });
}
async function login(email, password) {
  const pb = new PocketBase("https://remember-ring.pockethost.io/");

  try{
  const authData = await pb
    .collection("users")
    .authWithPassword(email, password);
    
    location.href = "/index.html?selectedUserID=" + authData.record.id;
  
  }catch(err){
    alert("Invalid email or password");
  }
}
