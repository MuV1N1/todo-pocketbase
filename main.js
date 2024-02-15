import "./style/pico.min.css";
import "./style/style.css";
import { setupNote } from "./components/create.js";
import modal from "./components/modal.js";
import PocketBase from "pocketbase";
import { removeNote } from "./components/removeNote.js";
import { updateNote } from "./components/updateNote.js";

const pb = new PocketBase("http://localhost:8090/");
let list = [];
const records = await pb.collection("notes").getFullList({
  sort: "-created",
});
console.log(records);
let recLength = 0;

records.forEach((item) => {

  switch (item.created === item.updated) {
    case true:
      list.push(/*html*/ `
      <dialog id="updateModal">
        <article>
          <header>
            <h3>Update</h3>
          </header>
          <form id="${item.id}" class="updateNote" action="">
            <input type="text" class="form-control" value="${item.title}" placeholder="Title" id="newNoteTitle" name="newNoteTitle">
            <input type="text" class="form-control" value="${item.text}" placeholder="Text" id="newNoteText" name="newNoteText">
            <button type="submit" id="update">Update</button>
          </form>
        </article>
      </dialog>
          <article class="noteList" id="${item.id}">
            <header class="noteListHeader">
              <ul class="delete">
              <li><button id ="${
                item.id
              }" class="deleteButton">Finished</button>
              </li>
              <li>
                <button class="updateButton" id="${
                  item.id
                }" data-target="updateModal">Update
              </li>
              </ul>
              <i class="fa-solid fa-clipboard" id="clipBoardFa"></i>
              <h5 class="noteHeader" id="${item.id}">${item.title}</h5>
            </header>
          <body>
          <p id="noteText" id="${item.id}">${item.text}</p>
          </body>
          <footer>
            <p id="noteDate"><span id="datePrefix">Created: </span>${new Date(
              item.created
            ).toLocaleDateString("de-DE")} um ${new Date(
        item.updated
      ).getHours()}:${new Date(item.updated).getMinutes()} Uhr</p></footer>
          <!--${JSON.stringify(item)}-->
        </article>
      `);
      break;
    case false:
      list.push(/*html*/ `
      <dialog id="updateModal">
        <article>
          <header>
            <h3>Update</h3>
          </header>
          <form id="${item.id}" class="updateNote" action="">
            <input type="text" class="form-control" placeholder="Title" value="${item.title}" id="newNoteTitle" name="newNoteTitle">
            <input type="text" class="form-control" placeholder="Text" value="${item.text}" id="newNoteText" name="newNoteText">
            <button type="submit" id="${item.id}">Update</button>
          </form>
        </article>
      </dialog>
          <article class="noteList" id="${item.id}">
          <header class="noteListHeader">
          <ul class="delete">
              <li><button id ="${
                item.id
              }" class="deleteButton" name="${item.id}">Finished</button>
              </li>
              <li>
              <button class="updateButton" id="${
                item.id
              }" data-target="updateModal">Update
            </li>
              </ul>
          <i class="fa-solid fa-clipboard" id="clipBoardFa"></i>
            <h5 class="noteHeader" id="${item.id}-title">${item.title}</h5>
            
          </header>
          <body>
          <p id="noteText" id="${item.id}-text">${item.text}</p>
          </body>
          <footer>
          <p id="noteDateUpdate"><span id="dateUpdatePrefix">Updated: </span>${new Date(
            item.updated
          ).toLocaleDateString("de-DE")} um ${new Date(
        item.updated
      ).getHours()}:${new Date(item.updated).getMinutes()} Uhr</p>
          </footer>
          <!--${JSON.stringify(item)}-->
        </article>
      `);
      break;
  }
  recLength += 1;
});

document.querySelector("#app").innerHTML = /*html*/ `
  <div>
    <section id="modal">
        <h2>Note</h2>
        <button id ="testModal" class="contrast" data-target="createModal">
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
          <input type="text" class="form-control" placeholder="Title" id="noteTitle" name="noteTitle" required>
          <input type="text" class="form-control" placeholder="Note" id="noteText" name="noteText" required>
          <button type="submit" id="create">Create</button>
        </form>
      </article>
    </dialog>
  

`;

setupNote(document.querySelector("#newNote"));


modal(document.querySelector("#testModal"));


document.querySelectorAll(".updateButton").forEach((element) => {
  modal(element);
})




document.querySelectorAll(".deleteButton").forEach((element) => {
  removeNote(element);
});


updateNote(document.querySelectorAll(".updateNote"));