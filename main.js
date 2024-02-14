import "./style/pico.min.css";
import "./style/style.css";
import { setupNote } from "./components/create.js";
import modal from "./components/modal.js";
import PocketBase from "pocketbase";
import { removeNote } from "./components/removeNote.js";

const pb = new PocketBase("http://localhost:8090/");
let list = [];
const records = await pb.collection("notes").getFullList({
  sort: "-created",
});
console.log(records);
records.forEach((item) => {
  switch (item.created === item.updated) {
    case true:
      list.push(/*html*/ `
          <article class="noteList" id="${item.id}">
          <header>
          <button id="delete">Finished</button>
          <i class="fa-solid fa-clipboard" id="clipBoardFa"></i>
            <h5 class="noteHeader" id="${item.id}-title">${item.title}</h5>
          </header>
          <body>
          <p id="noteText" id="${item.id}-text">${item.text}</p>
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
          <article class="noteList" id="${item.id}">
          <header>
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
});

document.querySelector("#app").innerHTML = /*html*/ `
  <div>
    <section id="modal">
        <h2>Note</h2>
        <button id ="testModal" class="contrast" data-target="modal-example">
        <i class="fa-solid fa-plus" id="plusFA"> </i>
        </button>
     </section>
    <div>
      ${list.join("")}
    </div>
  </div>
  <dialog id="modal-example">
      <article>
        <header>
          <h3>Create new note</h3>
        </header>
        <form id="newNote" action="">
          <input type="text" class="form-control" placeholder="Title" id="noteTile" name="noteTitle" required>
          <input type="text" class="form-control" placeholder="Note" id="noteText" name="noteText" required>
          <button type="submit" id="create">Create</button>
        </form>
      </article>
    </dialog>
`;

setupNote(document.querySelector("#newNote"));
modal(document.querySelector("#testModal"));
removeNote(document.querySelector("#delete"));
