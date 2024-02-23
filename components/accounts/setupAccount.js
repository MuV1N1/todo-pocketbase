import PocketBase from "./pocketbase.es.mjs";



const pb = new PocketBase("https://remember-ring.pockethost.io/");
const users = await pb.collection("users").getFullList({
  sort: "-created",
});

export function setupAccount(element) {
  element.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get("createAccountName");
    const email = formData.get("createAccountEmail");
    const password = formData.get("createAccountPassword");
    const confirmPassword = formData.get("createAccountConfirmPassword");
    create(name.replaceAll(" ", ""), email.toLocaleLowerCase(), password, confirmPassword);
  });
}

async function create(name, email, password, confirmPassword) {
  
  if (password === confirmPassword) {
    const data = {
      username: name,
      email: email,
      password: password,
      passwordConfirm: confirmPassword,
      emailVisibility: true,
    };
    try{
      const record = await pb.collection('users').create(data);
      location.href = "/index.html?selectedUserID=" + record.id;
    }catch(err){
      alert("Account already exists with that email address, or name! Please login or use a different email address.");
    }
  } else {
    alert("Passwords do not match");
  }
}
