"use strict";
const addTodoA1 = document.querySelector(".add-todo-a1");
const addTodoA2 = document.querySelector(".add-todo-a2");
const addTodoFormA1 = document.querySelector(".add-todo-a1 .form");
const addTodoFormA2 = document.querySelector(".add-todo-a2 .form");
const tableTodosA1 = document.querySelector(".table-a1");
const tableTodosA2 = document.querySelector(".table-a2");
const editModal = document.querySelector(".edit-modal");
const editModalForm = document.querySelector(".edit-modal .form");
const btnAdd = document.querySelector(".btn-add");
const plansA1 = document.querySelector(".buttonA1");
const plansA2 = document.querySelector(".buttonA2");
let id;
let countA1 = 0;
let countA2 = 0;

// Create element and render Trečiadienis ----------------------------------
const renderTodoA1 = (doc) => {
  const tr = `
    <tr data-id='${doc.id}'>
      <td>${doc.data().todo}</td>
      <th>
      <button class="btn btn-edit">Edit</button>
      <button class="btn btn-delete">Del</button>
      </th>
    </tr>
  `;
  tableTodosA1.insertAdjacentHTML("beforeend", tr);
  // Click edit to-do
  const btnEdit = document.querySelector(`[data-id='${doc.id}'] .btn-edit`);
  btnEdit.addEventListener("click", () => {
    editModal.classList.add("modal-show");
    id = doc.id;
    editModalForm.todo.value = doc.data().todo;
  });
  // Click delete to-do
  const btnDelete = document.querySelector(`[data-id='${doc.id}'] .btn-delete`);
  btnDelete.addEventListener("click", () => {
    var result = confirm("Want to delete?");
    if (result) {
      db.collection("a1").doc(`${doc.id}`).delete();
    }
  });
};
// // Real time listener.
db.collection("a1").onSnapshot((snapshot) => {
  snapshot.docChanges().forEach((change) => {
    if (change.type === "added") {
      renderTodoA1(change.doc);
      countA1++;
      document.getElementById("countA1").innerHTML = countA1;
    }
    if (change.type === "removed") {
      let tr = document.querySelector(`[data-id='${change.doc.id}']`);
      let tbody = tr.parentElement;
      tableTodosA1.removeChild(tbody);
      countA1--;
      document.getElementById("countA1").innerHTML = countA1;
    }
    if (change.type === "modified") {
      let tr = document.querySelector(`[data-id='${change.doc.id}']`);
      let tbody = tr.parentElement;
      tableTodosA1.removeChild(tbody);
      renderTodoA1(change.doc);
    }
  });
});
addTodoFormA1.addEventListener("submit", (e) => {
  e.preventDefault();
  db.collection("a1").add({
    todo: addTodoFormA1.todo.value,
  });
  addTodoFormA1.todo.value = "";
});
// Click submit in edit to-do
editModalForm.addEventListener("submit", (e) => {
  e.preventDefault();
  db.collection("a1").doc(id).update({
    todo: editModalForm.todo.value,
  });
  editModal.classList.remove("modal-show");
});

window.addEventListener("click", (e) => {
  if (e.target === addTodoA1) {
    addModal.classList.remove("modal-show");
  }
  if (e.target === editModal) {
    editModal.classList.remove("modal-show");
  }
});

// Create element and render Ketvirtadienis ----------------------------------

const renderTodoA2 = (doc) => {
  const tr = `
    <tr data-id='${doc.id}'>
      <td>${doc.data().todo}</td>
      <th>
      <button class="btn btn-edit">Edit</button>
      <button class="btn btn-delete">Del</button>
      </th>
    </tr>
  `;
  tableTodosA2.insertAdjacentHTML("beforeend", tr);
  // Click edit to-do
  const btnEdit = document.querySelector(`[data-id='${doc.id}'] .btn-edit`);
  btnEdit.addEventListener("click", () => {
    editModal.classList.add("modal-show");
    id = doc.id;
    editModalForm.todo.value = doc.data().todo;
  });
  // Click delete to-do
  const btnDelete = document.querySelector(`[data-id='${doc.id}'] .btn-delete`);
  btnDelete.addEventListener("click", () => {
    var result = confirm("Want to delete?");
    if (result) {
      db.collection("a2").doc(`${doc.id}`).delete();
    }
  });
};
// // Real time listener.
db.collection("a2").onSnapshot((snapshot) => {
  snapshot.docChanges().forEach((change) => {
    if (change.type === "added") {
      renderTodoA2(change.doc);
      countA2++;
      document.getElementById("countA2").innerHTML = countA2;
    }
    if (change.type === "removed") {
      let tr = document.querySelector(`[data-id='${change.doc.id}']`);
      let tbody = tr.parentElement;
      tableTodosA2.removeChild(tbody);
      countA2--;
      document.getElementById("countA2").innerHTML = countA2;
    }
    if (change.type === "modified") {
      let tr = document.querySelector(`[data-id='${change.doc.id}']`);
      let tbody = tr.parentElement;
      tableTodosA2.removeChild(tbody);
      renderTodoA2(change.doc);
    }
  });
});
addTodoFormA2.addEventListener("submit", (e) => {
  e.preventDefault();
  db.collection("a2").add({
    todo: addTodoFormA2.todo.value,
  });
  addTodoFormA2.todo.value = "";
});
// Click submit in edit to-do
editModalForm.addEventListener("submit", (e) => {
  e.preventDefault();
  db.collection("a2").doc(id).update({
    todo: editModalForm.todo.value,
  });
  editModal.classList.remove("modal-show");
});

window.addEventListener("click", (e) => {
  if (e.target === addTodoA2) {
    addModal.classList.remove("modal-show");
  }
  if (e.target === editModal) {
    editModal.classList.remove("modal-show");
  }
});

// ----------------------------------------------------------------------------

document.addEventListener("keydown", (event) => {
  if (event.code === "Escape" || event.code === 27) {
    editModal.classList.remove("modal-show");
  }
});
function close_modal() {
  editModal.classList.remove("modal-show");
}
