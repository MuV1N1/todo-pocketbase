import PocketBase from "pocketbase";
import "./style/pico.min.css";
import "./style/style.css";
import { selectList } from "./components/list/selectList";
import modal from "./components/notes/modal";

const pb = new PocketBase("http://localhost:8090/");

const noteLists = await pb.collection("list").getFullList({
  sort: "created",
});

//   let element = document.querySelector("#app");
//   let options = [];
//   let name = [];
//   let list = [];
//   noteLists.forEach((item) => {
//     list.push(/*html*/`

//     <form id="${name}">

//     `);
//     name.push(item.name);
//     options.push(/*html*/ `
//           <option value="${item.name}" >${item.name}</option>
//       `);
//   });
//   element.innerHTML = /*html*/ `
//     <h1>Select notelist</h1>
//     ${list}
//     <select name="select" aria-label="Select" required>
//     <option selected disabled value="">Select Note</option>
//       ${options}
//     </select>
//     <button type="submit" class="submitButton">Submit</button>
//     </form>
//     `;
//   selectList(document.querySelector(".submitButton"), document.querySelectorAll("option"));

//restart the whole code!
let list = [];

noteLists.forEach((item) => {

    list.push(/*html*/ `
        <option value="${item.id}">${item.name}</option>
    `)

});

document.querySelector("#app").innerHTML = /*html*/ `

    <dialog id="selectListModal">
    
      <article>
        <header>
          <h1>Select List</h1>
        </header>
        <form id="selectListForm">
          <select name="select" aria-label="Select" required>
            <option selected disabled value="">Select Note</option>
            ${list}
          </select>
          <button type="submit" class="submitButton">Submit</button>
        </form>
      </article>

    </dialog>

    <button type="button" id="selectList" data-target="selectListModal" class="button">Select List</button>
  `;
modal(document.querySelector("#selectList"));
selectList(document.querySelector("#selectListForm"));