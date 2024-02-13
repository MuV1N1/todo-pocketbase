import './style/pico.min.css'
import './style/style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './components/counter.js'
import { setupNote } from './components/create.js'
import modal from './components/modal.js'

import PocketBase from 'pocketbase';

const pb = new PocketBase('http://localhost:8090/');

const records = await pb.collection('notes').getFullList({
  sort: '-created',
});
console.log(records);
let list = [];
records.forEach(item => list.push(/*html*/`
  <article>
    <h5>${item.title}</h5>
    <p>${item.text}</p>
    <p>${new Date(item.created).toLocaleDateString("de-DE")}</p>
    ${JSON.stringify(item)}
  </article>
`));
document.querySelector('#app').innerHTML = /*html*/`
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
    </a>
    <h1>Hello Vite!</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite logo to learn more
    </p>
    
    <section id="modal">
        <h2>Note</h2>
        <button id ="testModal" class="contrast" data-target="modal-example" onclick="toggleModal(event)">
          Create new note
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
          <input type="text" class="form-control" placeholder="Title" id="noteTile" name="noteTitle">
          <input type="text" class="form-control" placeholder="Note" id="noteText" name="noteText">
          <button type="submit" id="create">Create</button>
        </form>
      </article>
    </dialog>
`

setupCounter(document.querySelector('#counter'))
setupNote(document.querySelector('#newNote'))
modal(document.querySelector('#testModal'));