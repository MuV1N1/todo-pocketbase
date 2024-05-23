
import { setupNote } from "/components/notes/create.js";
import modal from "./components/modal.js";
import { removeNote } from "./components/notes/removeNote.js";
import PocketBase from 'pocketbase';
import { updateNote } from "./components/notes/updateNote.js";
import { finishNote } from "./components/notes/finishNote.js";
import { unfinishNote } from "./components/notes/unfinishNote.js";
import { freezeNote } from "./components/notes/freeze.js";
import { unfreezeNote } from "./components/notes/unfreezeNote.js";
import { selectList } from "./components/list/selectList.js";
import { updateNoteList } from "./components/list/updateNoteList.js";
import { setupList } from "./components/list/createList.js";
import { removeList } from "./components/list/removeList.js";
import { updateList } from "./components/list/updateList.js";
import { overDeadline } from "./components/validateDate.js";
import { setupAccount } from "./components/accounts/setupAccount.js";
import { loginAccount } from "./components/accounts/loginAccount.js";
import { logoutAccount } from "./components/accounts/logoutAccount.js";
import { move } from "./components/progressBar.js";

//Connect to PocketBase

const pb = new PocketBase("https://todolis.pockethost.io/");

//get the records

let urlParams = new URLSearchParams(window.location.search);
let selectedUserID = urlParams.get("selectedUserID");
let selectedListID = urlParams.get("selectedListID");
let selectedListName = null;
const recordsUf = await pb.collection("notes").getFullList({
  sort: "sortBottom",
});
const noteListsUf = await pb.collection("list").getFullList({
  sort: "updated",
});

let records = [];
let list = [];
let listNoteLi = [];
let noteLists = [];
let accountName = "";
let progressTotal = 0;
let progressFinished = 0;
let createButtonTooltip = "";
if (selectedUserID !== null) {
  noteLists = noteListsUf.filter((item) => item.user === selectedUserID);
  records = recordsUf.filter((item) => item.list === selectedListID);

  const users = await pb.collection("users").getOne(selectedUserID, {});
  accountName = users.username;

  if (selectedListID !== null) {
    const currentList = await pb.collection("list").getOne(selectedListID, {});
    selectedListName = currentList.name;
  }
  records.forEach((item) => {
    if (item.finished) progressFinished++;
    progressTotal++;
  });
  noteLists.forEach((item) => {
    listNoteLi.push(/*html*/ `
    <option value="${item.id}">${item.name}</option>
`);
  });
  //loop each item of records
  records.forEach((item) => {
    //declare date's
    const currentDate = new Date().toLocaleString("de-DE", {
      timeZone: "Europe/Berlin",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    const currentDeadline = new Date(item.deadline).toLocaleString("de-DE", {
      timeZone: "Europe/Berlin",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
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
    const deadline = new Date(item.deadline).toLocaleString("de-DE", {
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
    const freezeDate =
      new Date(item.freezeDate).toLocaleString("de-DE", {
        timeZone: "Europe/Berlin",
        weekday: "long",
        hour: "2-digit",
        minute: "2-digit",
        day: "2-digit",
        month: "short",
        year: "numeric",
      }) + " Uhr";
    const updatedDate =
      new Date(item.updated).toLocaleString("de-DE", {
        timeZone: "Europe/Berlin",
        weekday: "long",
        hour: "2-digit",
        minute: "2-digit",
        day: "2-digit",
        month: "short",
        year: "numeric",
      }) + " Uhr";

    //rerange the whole thing

    let icons = [];
    let footer = [];
    let header = [];
    let prefix = "";
    let createdOrUpdated = [];
    let deadlineTime = "";
    let deadlineTooltip = "";

    if (overDeadline(item.deadline)) {
      deadlineTime = "no";
      deadlineTooltip = "The deadline you've set";
    } else {
      deadlineTime = "deadlineIsOver";
      deadlineTooltip =
        "Your time is over set a new deadline or mark the note as finsihed";
    }
    if (item.finished && item.freeze) return;
    switch (item.created === item.updated) {
      case true:
        createdOrUpdated.push(/*html*/ `
      <p id="noteDate"><span id="datePrefix">Created: </span>${date}</p>
      `);
        break;
      case false:
        createdOrUpdated.push(/*html*/ `
        <p id="noteDate"><span id="datePrefix">Updated: </span>${updatedDate}</p>
      `);
        break;
    }
    if (item.finished && !item.freeze) {
      prefix = "finished";
      icons.push(/*html*/ `
    <i class="fa-solid fa-square-check" id="headerPrefixCheck"></i>
    `);
      header.push(/*html*/ `
    <li><button id ="${item.id}" class="deleteButton" type="button" data-tooltip="Delete the current note"><i class="fa-solid fa-triangle-exclamation"></i></button></li>
    <li><button id ="${item.id}" class="unfinishButton" type="button" data-tooltip="Mark the note as unfinished"><i class="fa-solid fa-hourglass-start"></i></button></li>
    `);
      footer.push(/*html*/ `
    <p id="noteDeadline"><span id="deadlinePrefix">Finished: </span> ${finishedDate}</p>
    ${createdOrUpdated}
    `);
    } else if (!item.finished && !item.freeze) {
      icons.push(/*html*/ `
    <i class="fa-solid fa-hourglass-start" id="headerPrefixHourglassStart"></i>
    `);
      header.push(/*html*/ `
    <li><button id ="${item.id}" class="finishButton" type="button" data-tooltip="Mark the note as finished"><i class="fa-solid fa-trophy"></i></button></li>
    <li><button id ="${item.id}" class="freezeButton" type="button" data-tooltip="Mark the note as freezed"><i class="fa-solid fa-snowflake"></i></button></li>
    `);
      footer.push(/*html*/ `
    <p id="noteDeadline"><span id="deadlinePrefix" data-tooltip="${deadlineTooltip}">Deadline: </span><span id="${deadlineTime}" data-tooltip="${deadlineTooltip}"> ${deadline}</span></p>
    ${createdOrUpdated}
    `);
    } else if (item.freeze && !item.finished) {
      prefix = "freeze";
      icons.push(/*html*/ `
    <i class="fa-solid fa-lock" id="headerPrefixLock"></i>
    `);
      header.push(/*html*/ `
    <li><button id ="${item.id}" class="deleteButton" type="button" data-tooltip="Delete the current note"><i class="fa-solid fa-triangle-exclamation"></i></button></li>
    <li><button id ="${item.id}" class="unfreezeButton" type="button" data-tooltip="Mark the note as not freezed"><i class="fa-solid fa-backward"></i></button></li>
    `);
      footer.push(/*html*/ `
    <p id="noteDeadline"><span id="deadlinePrefix">Freezed: </span> ${freezeDate}</p>
    ${createdOrUpdated}
    `);
    } else if (!item.freeze && !item.finished) {
      icons.push(/*html*/ `
    <i class="fa-solid fa-hourglass-start" id="headerPrefixHourglassStart"></i>
    `);
      header.push(/*html*/ `
    <li><button id ="${item.id}" class="finishButton" type="button" data-tooltip="Mark the note as finished"><i class="fa-solid fa-trophy"></i></button></li>
    <li><button id ="${item.id}" class="freezeButton" type="button" data-tooltip="Mark the note as freezed"><i class="fa-solid fa-snowflake"></i></button></li>
    `);
      footer.push(/*html*/ `
    <p id="noteDeadline"><span id="deadlinePrefix">Deadline: </span><span id="${deadlineTime}"> ${deadline}</span></p>
    ${createdOrUpdated}
    `);
    }

    list.push(/*html*/ `
        <dialog id="${item.id}">
        <article>
          <header>
            <h3>Update</h3>
          </header>
          <form id=${item.id} class="updateNote" action=""> 
          <label for="newNoteTitle">Title </label><input type="text" class="form-control" value="${item.title}" placeholder="Title..." id="newNoteTitle" maxlength="20" name="newNoteTitle">
          <label for="newNoteText">Text </label><input type="text" class="form-control" value="${item.text}" placeholder="Text..." id="newNoteText" name="newNoteText">
          <label for="newNoteDeadline">Deadline </label><input type="date"  class="form-control" value="${item.deadline}" id="newNoteDeadline..." name="newNoteDeadline" required>
            <button type="submit" data-tooltip="Update the note" id="${item.id}"><i class="fa-solid fa-retweet"></i></button>
          </form>
        </article>
      </dialog>
      <dialog id="${item.id}-">
        <article>
          <header>
            <h3>Update</h3>
          </header>
          <form id="${item.id}-" class="updateNoteList" action=""> 
            <select name="selectNewList" aria-label="Select" id="selectNewList"required>
              <option selected disabled value="">${selectedListName}</option>
              ${listNoteLi}
            </select>
            <button type="submit" data-tooltip="Update the note list" id="${item.id}"><i class="fa-solid fa-retweet"></i></button>
          </form>
        </article>
      </dialog>
      `);
    switch (item.created === item.updated) {
      //push the rest of the note page with buttons and so on to the list
      case true:
        list.push(/*html*/ `
               <article class="noteList " id="${item.id}">
                <header class="noteListHeader">
                  <ul class="delete">
                    ${header}
                  <li>
                    <button class="updateModalButton" id="${item.id}" data-target="${item.id}" type="button" data-tooltip="Update the note"><i class="fa-solid fa-retweet"></i>
                  </li>
                  <li>
                  <button class="cahngeListModalButton" data-target="${item.id}-" type="button" data-tooltip="Change the current List of he modal"><i class="fa-solid fa-arrow-right-arrow-left"></i>
                </li>
                  </ul>
                  ${icons}
                  <h5 class="noteHeader" id="${item.id}">${item.title}</h5>
                </header>
              <body>
              <p class="${prefix}" id="noteText ${item.id}">${item.text}</p>
              </body>
              <footer>
                ${footer}
              </footer>
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
                  <button class="updateModalButton" data-target="${item.id}" type="button" data-tooltip="Update the note"><i class="fa-solid fa-retweet"></i>
                </li>
                <li>
                  <button class="cahngeListModalButton" data-target="${item.id}-" type="button" data-tooltip="Change the current List of he modal"><i class="fa-solid fa-arrow-right-arrow-left"></i>
                </li>
              </ul>
                  ${icons}
                <h5 class="noteHeader" id="${item.id}-title">${item.title}</h5>
                
              </header>
              <body>
              <p class="${prefix}" id="noteText ${item.id}-text">${item.text}</p>
              </body>
              <footer>
                ${footer}
              </footer>
            </article>
          `);
        break;
    }
  });

  let manageListModal = [];

  manageListModal.push(/*html*/ `
 
 `);

  //All of the Header with the buttons
  //Code for the Modals
  if (selectedListName == null){ 
    createButtonTooltip = "Disabled";
    selectedListName = "Select your list";
}else{
  createButtonTooltip = "Create a new note";
}

  let createButton = [];
  if (selectedListID == null) createButton.push(/*html*/ ``);
  document.querySelector("#app").innerHTML = /*html*/ `
      
      <div class="topBar">
        <section id="createS">
          <h2>Welcome Back:<br><span id="accountNameH1">${accountName}</span></h2>
          <button type="button" id="logOut" data-tooltip="Logout of your Account"><i class="fa-solid fa-arrow-right-from-bracket"></i></button>
          <h2>${selectedListName}</h2>
          <ul id="startList">
          <li id="startItem">
            <button id="switchList" type="button" data-target="selectListModal" data-tooltip="Switch between your list">${selectedListName}</button>
          </li>
          <li id="startItem">
            <button id ="createNote" data-target="createModal" type="button" data-tooltip="${createButtonTooltip}"><i class="fa-solid fa-plus" id="plusFA"></i></button>
          </li>  
          <li id="startItem">
            <button id="manageList" data-target="manageLisModal" type="button" data-tooltip="Manage your lists"><i class="fa-solid fa-gear"></i></button>   
          </li>   
          </ul>
          <div id="myProgress"><div id="myBar"></div></div>
          </button>
        </section>
        
      <div>
          ${list.join("")}
        </div>
      </div>
      <dialog id="selectListModal">
      <article>
        <header>
          <h1>Select List</h1>
        </header>
        <form id="selectListForm">
          <select name="select" aria-label="Select" id="select"required>
            <option selected disabled value="">Select List</option>
            ${listNoteLi}
          </select>
          <button type="submit" class="submitButton">Submit</button>
        </form>
      </article>
      </dialog>
      <dialog id="createModal">
          <article>
            <header>
              <h3>Create new note</h3>
            </header>
            <form id="newNote" action="">
              <label for="noteTitle">Title</label><input type="text" class="form-control form-input" placeholder="Title..." id="noteTitle" name="noteTitle" maxlength="20" title="Max. 20 Chars" required>
              <label for="noteText">Note</label><input type="text" class="form-control" placeholder="Note..." id="noteText" name="noteText" required>
              <label for="noteDeadline">Deadline</label><input type="date" class="form-control" id="noteDeadline" name="noteDeadline" required>
              <button type="submit" id="create" data-tooltip="Create a note">Create</button>
            </form>
          </article>
        </dialog>    
        <dialog id="manageLisModal">
          <article>
            <header>
              <h3>Managae your lists</h3>
            </header>
            <form id="manageListForm" action="">
              <button type="button" id="createList" data-target="createListModal" data-tooltip="Create a list">Create new</button>
              <button type="button" id="deleteList" data-target="deleteListModal" data-tooltip="Delete the current list">Delete current</button>
              <button type="button" id="updateList" data-target="updateListModal" data-tooltip="update the current list">Update current</button>
            </form>
          </article>
        </dialog>
        <dialog id="createListModal">
   <article>
     <header>
       <h3>Create new list</h3>
     </header>
     <form id="newNoteList" action="">
      <label for="createListName">List name</label><input type="text" class="form-control" id="createListName" name="createListName" placeholder="Name...">
       <button type="submit" id="createListButton" data-tooltip="Create a List">Create</button>
    </form>
</article>
 </dialog>
 <dialog id="updateListModal">
   <article>
     <header>
      <h3>Update</h3>
    </header>
     <form id="updateNoteList" action="">
     <label for="updateList">New list name</label><input type="text" class="form-control" id="updateList" name="updateList" placeholder="New Name...">
      <button type="submit" id="create" data-tooltip="Create a List">Create</button>
    </form>
   </article>
 </dialog>  
    `;
  //Modals
  let modalButtonList = [
    "#switchList",
    "#manageList",
    "#createList",
    "#updateList",
  ];

  if(selectedListName != "Select your list") {
    modalButtonList.push("#createNote");
    
  }

  modalButtonList.forEach((element) => modal(document.querySelector(element)));
  document
    .querySelectorAll(".updateModalButton")
    .forEach((element) => modal(element));
  document
    .querySelectorAll(".cahngeListModalButton")
    .forEach((element) => modal(element));

  //Setup the notes and Lists
  setupNote(document.querySelector("#newNote"), selectedListID, selectedUserID, pb);
  setupList(document.querySelector("#newNoteList"). pb);

  //Update the notes and lists
  updateList(document.querySelector("#updateNoteList"), pb);
  updateNote(document.querySelectorAll(".updateNote"), pb);
  updateNoteList(document.querySelectorAll(".updateNoteList"), pb);

  //Select the list
  selectList(document.querySelector("#selectListForm"));

  //Freeze and Finish the notes
  freezeNote(document.querySelectorAll(".freezeButton"), pb);
  unfreezeNote(document.querySelectorAll(".unfreezeButton"), pb);
  finishNote(document.querySelectorAll(".finishButton"), pb);
  unfinishNote(document.querySelectorAll(".unfinishButton"),pb);

  //Remove the notes and lists
  removeNote(document.querySelectorAll(".deleteButton")), pb;
  removeList(document.querySelector("#deleteList"), pb);
  logoutAccount(document.querySelector("#logOut"), pb);

  //progressBar
  if(selectedListName != "Select your list"){
    move(document.querySelector("#myBar"), progressFinished, progressTotal)
  }else{
    document.querySelector("#myProgress").style.display = "none";
  }
} else {
  document.querySelector("#app").innerHTML = /*html*/ `
    <h1>You are not signed in!</h1>
    <h4>Please sign in to see your notes and lists</h4>
    <div class="topBar">
        <section id="createS">
        <ul id="startList">
          <li id="startItem">
            <button id ="createAccountButton" data-target="createAccountModal" type="button" data-tooltip="Register"><i class="fa-solid fa-plus"></i></button>
          </li>  
          <li id="startItem">
            <button id="loginAccountButton" data-target="loginAccountModal" type="button" data-tooltip="Login to your Account"><i class="fa-solid fa-right-to-bracket"></i></button>   
          </li>   
          </ul>
        </section>
      <div>
    <dialog id="createAccountModal">
      <article>
        <header>
          <h3>Register</h3>
        </header>
        <form id="createAccountForm" action="">
          <label for="createAccountEmail">Email </label><input type="email" class="form-control" id="createAccountEmail" name="createAccountEmail" placeholder="Email..."  required>
          <label for="createAccountName">Username </label><input type="text" class="form-control" id="createAccountName" name="createAccountName" placeholder="Name..." required>
          <label for="createAccountPassword">Password </label><input type="password" class="form-control" id="createAccountPassword" name="createAccountPassword" placeholder="Password..." min-length="8" max-length="72" required>
          <label for="createAccountPasswordRepeat">Repeat Password </label><input type="password" class="form-control" id="createAccountPasswordRepeat" name="createAccountConfirmPassword" placeholder="Repeat Password..." min-length="8" max-length="72" required>
          <button type="submit" id="register" data-tooltip="Register a new Account">Register</button>
        </form>
      </article>
    </dialog>
    <dialog id="loginAccountModal">
      <article>
        <header>
          <h3>Login</h3>
        </header>
        <form id="loginAccountForm" action="">
        <label for="loginAccountEmail">Email </label><input type="email" class="form-control" id="loginAccountEmail" name="loginEmail" placeholder="Your account email" required>
        <label for="loginAccountPassword">Password </label><input type="password" class="form-control" id="loginAccountPassword" name="loginPassword" placeholder="Your password" required>
        <button type="submit" id="create" data-tooltip="Login to your Account">Login</button>
        </form>
      </article>
    </dialog>
  `;
  let modalButtonList = ["#createAccountButton", "#loginAccountButton"];
  modalButtonList.forEach((element) => modal(document.querySelector(element)));
  setupAccount(document.querySelector("#createAccountForm"), pb);
  loginAccount(document.querySelector("#loginAccountForm"), pb);
}
