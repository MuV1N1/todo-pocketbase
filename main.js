import "./style/pico.min.css";
import "./style/style.css";
import { setupNote } from "./components/notes/create.js";
import modal from "./components/notes/modal.js";
import PocketBase from "pocketbase";
import { removeNote } from "./components/notes/removeNote.js";
import { updateNote } from "./components/notes/updateNote.js";
import { finishNote } from "./components/notes/finishNote.js";
import { unfinishNote } from "./components/notes/unfinishNote.js";

const pb = new PocketBase("http://localhost:8090/");
let list = [];
const records = await pb.collection("notes").getFullList({
  sort: "-created",
  sort: "deadline",
  sort: "finished",
});
// console.log(records)
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
  const finishedDate =
    new Date(item.finishedDate).toLocaleString("de-DE", {
      timeZone: "Europe/Berlin",
      weekday: "long",
      hour: "2-digit",
      minute: "2-digit",
      day: "2-digit",
      month: "short",
      year: "numeric",
    }) + " Uhr";

  if (deadline == "Invalid Date") deadline = date;
  let finishLi = [];
  let finsihDateLi = [];
  let finishedClass = "";
  let finishedIcon = [];
  if (item.finished) {
    finishedIcon.push(/*html*/ `
      <i class="fa-regular fa-square-check"></i>
    `);
    finishedClass = "finished";
    finishLi.push(/*html*/ `
    <li><button id ="${item.id}" class="deleteButton" type="button">Delete</button></li>
    <li><button id ="${item.id}" class="unfinishButton" type="button">Unfinish</button></li>
    `);
    finsihDateLi.push(/*html*/ `
    <p id="noteDeadline"><span id="deadlinePrefix">Finished: </span> ${finishedDate}</p>
    <p id="noteDate"><span id="datePrefix">Created: </span>${date}</p>
    `);
  } else {
    finishedIcon.push(/*html*/ `
      <i class="fa-regular fa-clipboard"></i>
    `);
    finishedClass = "notFinished";
    finishLi.push(/*html*/ `
    <li><button id ="${item.id}" class="finishButton" type="button">Finish</button></li>
    `);
    finsihDateLi.push(/*html*/ `
    <p id="noteDeadline"><span id="deadlinePrefix">Deadline: </span> ${deadline}</p>
    <p id="noteDate"><span id="datePrefix">Created: </span>${date}</p>
    `);
  }

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
               <article class="noteList ${finishedClass}" id="${item.id}">
                <header class="noteListHeader">
                  <ul class="delete">
                    ${finishLi}
                  <li>
                    <button class="updateModalButton" id="${
                      item.id
                    }" data-target="${item.id}" type="button">Update
                  </li>
                  </ul>
                  ${finishedIcon}
                  <h5 class="noteHeader" id="${item.id}">${item.title}</h5>
                </header>
              <body>
              <p id="noteText" id="${item.id}">${item.text}</p>
              </body>
              <footer>
                ${finsihDateLi}
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
                  <li>
                    ${finishLi}
                  </li>
                  <li>
                  <button class="updateModalButton" data-target="${
                    item.id
                  }" type="button" >Update
                </li>
                  </ul>
                  ${finishedIcon}
                <h5 class="noteHeader" id="${item.id}-title">${item.title}</h5>
                
              </header>
              <body>
              <p id="noteText" id="${item.id}-text">${item.text}</p>
              </body>
              <footer>
                ${finsihDateLi}
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
finishNote(document.querySelectorAll(".finishButton"));
unfinishNote(document.querySelectorAll(".unfinishButton"));
document.querySelectorAll(".deleteButton").forEach((element) => {
  removeNote(element);
});
updateNote(document.querySelectorAll(".updateNote"));
