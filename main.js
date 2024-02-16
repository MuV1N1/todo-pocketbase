import "./style/pico.min.css";
import "./style/style.css";
import { setupNote } from "./components/notes/create.js";
import modal from "./components/notes/modal.js";
import PocketBase from "pocketbase";
import { removeNote } from "./components/notes/removeNote.js";
import { updateNote } from "./components/notes/updateNote.js";

const pb = new PocketBase("http://localhost:8090/");
let list = [];
const records = await pb.collection("notes").getFullList({
  sort: "-created",
});
// const users = await pb.collection("users").getFullList({
//   sort: "-created",
// });
//console.log(records);
// sideing(true, "marvin.kleiner1910@gmail.com");
// function sideing(logedin, email) {
//   const userList = users.filter(e => e.email == email);
//   let userID = "";
//   userList.forEach(e => userID = e.id);
//   console.log(userID)

//   const fr = records.filter((item) => item.user == userID);
//   console.log(fr)

//   if (logedin) {
    records.forEach((item) => {
      const date =
        new Date(item.created).toLocaleString("de-DE", {
          timeZone: "Europe/Berlin",
          weekday: "long",
          hour: "2-digit",
          minute: "2-digit",
          day: "2-digit",
          month: "short",
          year: "numeric",
        }) + " Uhr";
      let deadline = new Date(item.deadline).toLocaleString("de-DE", {
        timeZone: "Europe/Berlin",
        weekday: "long",
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
      if (deadline == "Invalid Date") deadline = date;
      list.push(/*html*/ `
        <dialog id="${item.id}">
        <article>
          <header>
            <h3>Update</h3>
          </header>
          <form id=${item.id} class="updateNote" action=""> 
            <input type="text" class="form-control" value="${item.title}" placeholder="Title..." id="newNoteTitle" name="newNoteTitle">
            <input type="text" class="form-control" value="${item.text}" placeholder="Text..." id="newNoteText" name="newNoteText">
            <input type="date"  class="form-control" value="${item.deadline}" id="newNoteDeadline..." name="newNoteDeadline">
            <button type="submit" id="${item.id}">Update</button>
          </form>
        </article>
      </dialog>
      `);
      switch (item.created === item.updated) {
        case true:
          list.push(/*html*/ `
               <article class="noteList" id="${item.id}">
                <header class="noteListHeader">
                  <ul class="delete">
                  <li><button id ="${
                    item.id
                  }" class="deleteButton" type="button">Finished</button>
                  </li>
                  <li>
                    <button class="updateModalButton" id="${
                      item.id
                    }" data-target="${item.id}" type="button">Update
                  </li>
                  </ul>
                  <i class="fa-solid fa-clipboard" id="clipBoardFa"></i>
                  <h5 class="noteHeader" id="${item.id}">${item.title}</h5>
                </header>
              <body>
              <p id="noteText" id="${item.id}">${item.text}</p>
              </body>
              <footer>
                <p id="noteDeadline"><span id="deadlinePrefix">Deadline: </span> ${deadline}</p>
                <p id="noteDate"><span id="datePrefix">Created: </span>${date}</p>
                </footer>
              <!--${JSON.stringify(item)}-->
            </article>
          `);
          break;
        case false:
          list.push(/*html*/ `
              <article class="noteList" id="${item.id}">
              <header class="noteListHeader">
              <ul class="delete">
                  <li><button id ="${item.id}" class="deleteButton" name="${
            item.id
          }" type="button">Finished</button>
                  </li>
                  <li>
                  <button class="updateModalButton" data-target="${
                    item.id
                  }" type="button" >Update
                </li>
                  </ul>
              <i class="fa-solid fa-clipboard" id="clipBoardFa"></i>
                <h5 class="noteHeader" id="${item.id}-title">${item.title}</h5>
                
              </header>
              <body>
              <p id="noteText" id="${item.id}-text">${item.text}</p>
              </body>
              <footer>
                <p id="noteDeadline"><span id="deadlinePrefix">Deadline: </span> ${deadline}</p>
                <p id="noteDate"><span id="datePrefix">Created: </span>${date}</p>
                </footer>
              <!--${JSON.stringify(item)}-->
            </article>
          `);
          break;
      }
    });

    document.querySelector("#app").innerHTML = /*html*/ `
      
      <div>
        <section id="create">
            <h2>Note</h2>
            <button id ="createModalButton" data-target="createModal" type="button">
            <i class="fa-solid fa-plus" id="plusFA"></i>
            </button>
         </section>
        <div>
          ${list.join("")}
        </div>
      </div>
      <dialog id="createModal">
          <article>
            <header>
              <h3>Create new note</h3>
            </header>
            <form id="newNote" action="">
              <input type="text" class="form-control" placeholder="Title..." id="noteTitle" name="noteTitle" required>
              <input type="text" class="form-control" placeholder="Note..." id="noteText" name="noteText" required>
              <input type="date" class="form-control" id="noteDeadline" name="noteDeadline">
              <button type="submit" id="create">Create</button>
            </form>
          </article>
        </dialog>
    
    `;
    //Note Stuff
    setupNote(document.querySelector("#newNote"));

    modal(document.querySelector("#createModalButton"));
    document.querySelectorAll(".updateModalButton").forEach((element) => {
      modal(element);
    });
    document.querySelectorAll(".deleteButton").forEach((element) => {
      removeNote(element);
    });
    updateNote(document.querySelectorAll(".updateNote"));
//   } else {
    
// }
// }
// document.querySelector("#app").innerHTML = /*html*/ `
//       <div class="login">
//         <h2>Login</h2>
//         <p id="automatic">When you don't have an account, you automatically register</p>
//         <form id="loginSec" action="">
//           <input type="text" class="form-control" placeholder="E-Mail..." id="user" name="user" required>
//           <input type="password" class="form-control" placeholder="Password..." id="password" name="password" required>
//           <button type="submit" id="login" >Login</button>
//         </form>

//       <div>
//         <h2>Log in to see your notes</h2>
//       </div>
//     `;
//     login(document.querySelector("#login"));


// function login(element) {
//     element.addEventListener("submit", (e) => {
//     e.preventDefault();
//     console.log(users);
//     const formData = new FormData(e.target);
//     const email = formData.get("user");
//     const password = formData.get("password");

//     const userList = users.filter(e => e.email == email);
//     let userID = "";
//     userList.forEach(e => userID = e.id);
//     console.log(userID)
    
//     if(userList.password === password) {sideing(true, email); location.reload();}

//     pb.collection("users")
//   });
//}
