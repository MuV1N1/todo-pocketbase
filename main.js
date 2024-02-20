import "./style/pico.min.css";
import "./style/style.css";
import { setupNote } from "./components/notes/create.js";
import modal from "./components/notes/modal.js";
import PocketBase from "pocketbase";
import { removeNote } from "./components/notes/removeNote.js";
import { updateNote } from "./components/notes/updateNote.js";
import { finishNote } from "./components/notes/finishNote.js";
import { unfinishNote } from "./components/notes/unfinishNote.js";
import { freezeNote } from "./components/notes/freeze.js";
import { unfreezeNote } from "./components/notes/unfreezeNote.js";

//Connect to PocketBase
const pb = new PocketBase("http://localhost:8090/");

//get the records

const records = await pb.collection("notes").getFullList({
  sort: "sortBottom",
});

let list = [];
// loop each item of records
records.forEach((item) => {
  //declare date's
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
const freezeDate = new Date(item.freezeDate).toLocaleString("de-DE", {
    timeZone: "Europe/Berlin",
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit",
    day: "2-digit",
    month: "short",
    year: "numeric",
  }) + " Uhr";
  if (item.deadline == "Invalid Date") {
    deadline = "No Deadline";
}
  if (deadline == "Invalid Date") deadline = date;
  
  //rerange the whole thing

  let icons = [];
  let footer = [];
  let header = [];
  let prefix = "";
  
  if(item.finished && item.freeze) return;
  if(item.finished && !item.freeze){
    prefix = "finished";
    icons.push(/*html*/`
    <i>✅</i>
    `);
    header.push(/*html*/`
    <li><button id ="${item.id}" class="deleteButton" type="button" data-tooltip="Delete the current note">✖️</button></li>
    <li><button id ="${item.id}" class="unfinishButton" type="button" data-tooltip="Mark the note as unfinished">⏳</button></li>
    `);
    footer.push(/*html*/`
    <p id="noteDeadline"><span id="deadlinePrefix">Finished: </span> ${finishedDate}</p>
    <p id="noteDate"><span id="datePrefix">Created: </span>${date}</p>
    `);
  }else if(!item.finished && !item.freeze){
    icons.push(/*html*/`
    <i>⏳</i>
    `);
    header.push(/*html*/`
    <li><button id ="${item.id}" class="finishButton" type="button" data-tooltip="Mark the note as finished">🏆</button></li>
    <li><button id ="${item.id}" class="freezeButton" type="button" data-tooltip="Mark the note as freezed">❄️</button></li>
    `);
    footer.push(/*html*/`
    <p id="noteDeadline"><span id="deadlinePrefix">Deadline: </span> ${deadline}</p>
    <p id="noteDate"><span id="datePrefix">Created: </span>${date}</p>
    `);
  }else if(item.freeze && !item.finished){
    prefix = "freeze";
    icons.push(/*html*/`
    <i>🔒</i>
    `);
    header.push(/*html*/`
    <li><button id ="${item.id}" class="deleteButton" type="button" data-tooltip="Delete the current note">✖️</button></li>
    <li><button id ="${item.id}" class="unfreezeButton" type="button" data-tooltip="Mark the note as not freezed">🔙</button></li>
    `);
    footer.push(/*html*/`
    <p id="noteDeadline"><span id="deadlinePrefix">Freezed: </span> ${freezeDate}</p>
    <p id="noteDate"><span id="datePrefix">Created: </span>${date}</p>
    `);
  }else if(!item.freeze && !item.finished){
    icons.push(/*html*/`
    <i>⏳</i>
    `);
    header.push(/*html*/`
    <li><button id ="${item.id}" class="finishButton" type="button" data-tooltip="Mark the note as finished">🏆</button></li>
    <li><button id ="${item.id}" class="freezeButton" type="button" data-tooltip="Mark the note as freezed">❄️</button></li>
    `);
    footer.push(/*html*/`
    <p id="noteDeadline"><span id="deadlinePrefix">Deadline: </span> ${deadline}</p>
    <p id="noteDate"><span id="datePrefix">Created: </span>${date}</p>
    `);
  }


  //finsih and unfinish
  // let finishLi = [];
  // let finsihDateLi = [];

  // let finishedIcon = [];
  // if (item.finished) {
  //   finishedIcon.push(/*html*/ `
  //   <i>✅</i>
  //   `);
  //   prefix = "finished";
  //   finishLi.push(/*html*/ `
  //   <li><button id ="${item.id}" class="deleteButton" type="button" data-tooltip="Delete the current note">Delete</button></li>
  //   <li><button id ="${item.id}" class="unfinishButton" type="button" data-tooltip="Mark the note as unfinished">Not Finished</button></li>
  //   `);
  //   finsihDateLi.push(/*html*/ `
  //   <p id="noteDeadline"><span id="deadlinePrefix">Finished: </span> ${finishedDate}</p>
  //   <p id="noteDate"><span id="datePrefix">Created: </span>${date}</p>
  //   `);
  // } else {
  //   finishedIcon.push(/*html*/ `
  //     <i>📋</i>
  //   `);
  //   prefix = "notFinished";
  //   finishLi.push(/*html*/ `
  //   <li><button id ="${item.id}" class="finishButton" type="button" data-tooltip="Mark the note as finished">Finish</button></li>
  //   `);
  //   finsihDateLi.push(/*html*/ `
  //   <p id="noteDeadline"><span id="deadlinePrefix">Deadline: </span> ${deadline}</p>
  //   <p id="noteDate"><span id="datePrefix">Created: </span>${date}</p>
  //   `);
  // }
  //push the modal dialog to list
  list.push(/*html*/ `
        <dialog id="${item.id}">
        <article>
          <header>
            <h3>Update</h3>
          </header>
          <form id=${item.id} class="updateNote" action=""> 
            <input type="text" class="form-control" value="${item.title}" placeholder="Title..." id="newNoteTitle" maxlength="20" name="newNoteTitle">
            <input type="text" class="form-control" value="${item.text}" placeholder="Text..." id="newNoteText" name="newNoteText">
            <input type="date"  class="form-control" value="${item.deadline}" id="newNoteDeadline..." name="newNoteDeadline">
            <button type="submit" data-tooltip="Update the note" id="${item.id}">🔄</button>
          </form>
        </article>
      </dialog>
      `);
  switch (item.created === item.updated) {
    //push the rest of the note page with buttons usw to the list
    case true:
      list.push(/*html*/ `
               <article class="noteList " id="${item.id}">
                <header class="noteListHeader">
                  <ul class="delete">
                    ${header}
                  <li>
                    <button class="updateModalButton" id="${
                      item.id
                    }" data-target="${
        item.id
      }" type="button" data-tooltip="Update the note">🔄
                  </li>
                  </ul>
                  ${icons}
                  <h5 class="noteHeader" id="${item.id}">${item.title}</h5>
                </header>
              <body>
              <p class="${prefix}" id="noteText ${item.id}">${
        item.text
      }</p>
              </body>
              <footer>
                ${footer}
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
                    ${header}
                  </li>
                  <li>
                  <button class="updateModalButton" data-target="${
                    item.id
                  }" type="button" data-tooltip="Update the note">🔄
                </li>
                  </ul>
                  ${icons}
                <h5 class="noteHeader" id="${item.id}-title">${item.title}</h5>
                
              </header>
              <body>
              <p class="${prefix}" id="noteText ${item.id}-text">${
        item.text
      }</p>
              </body>
              <footer>
                ${footer}
              </footer>
              <!--${JSON.stringify(item)}-->
            </article>
          `);
      break;
  }
});
//the create button and Heading
document.querySelector("#app").innerHTML = /*html*/ `
      
      <div>
        <section id="create">
            <h2>Note</h2>
            <button id ="createModalButton" data-target="createModal" type="button" data-tooltip="Create a new note">
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
              <input type="text" class="form-control" placeholder="Title..." id="noteTitle" name="noteTitle" maxlength="20" title="Max. 20 Chars" required>
              <input type="text" class="form-control" placeholder="Note..." id="noteText" name="noteText" required>
              <input type="date" class="form-control" id="noteDeadline" name="noteDeadline">
              <button type="submit" id="create" data-tooltip="Create a note">Create</button>
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
freezeNote(document.querySelectorAll(".freezeButton"));
unfreezeNote(document.querySelectorAll(".unfreezeButton"));
finishNote(document.querySelectorAll(".finishButton"));
unfinishNote(document.querySelectorAll(".unfinishButton"));
document.querySelectorAll(".deleteButton").forEach((element) => {
  removeNote(element);
});
updateNote(document.querySelectorAll(".updateNote"));
