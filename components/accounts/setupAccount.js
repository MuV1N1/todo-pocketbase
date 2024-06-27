
export async function setupAccount(element, pocketBase) {
  const users = await pocketBase.collection("users").getFullList({
    sort: "-created",
  });
  element.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get("createAccountName");
    const email = formData.get("createAccountEmail");
    const password = formData.get("createAccountPassword");
    const confirmPassword = formData.get("createAccountConfirmPassword");
    create(name.replaceAll(" ", ""), email.toLocaleLowerCase(), password, confirmPassword, pocketBase);
  });
}

async function create(name, email, password, confirmPassword, pb) {
  
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
      document.cookie = "id=" + record.id;
      location.href = "/todo-pocketbase/index.html?selectedUserID=" + record.id;
    }catch(err){
      alert("Account already exists with that email address, or name! Please login or use a different email address.");
    }
  } else {
    alert("Passwords do not match");
  }
}
