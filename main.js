import './style/pico.min.css'
import './style/style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './components/counter.js'
import { setupNote } from './components/create.js'

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
    <form id="newNote" action="">
      <button type="submit" id="create">Create</button>
      <input type="text" class="form-control" placeholder="Title" id="noteTile" name="noteTitle">
      <input type="text" class="form-control" placeholder="Note" id="noteText" name="noteText">
    </form>
  </div>
`

setupCounter(document.querySelector('#counter'))
setupNote(document.querySelector('#newNote'))
