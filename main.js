const form = document.getElementById("form");
const error = document.querySelector(".error");
const lists = document.querySelector(".lists");
let data = JSON.parse(localStorage.getItem("todo")) || [];

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let text = form.text.value;
  if (!validateInput(text)) return;

  data = [
    ...data,
    { text, time: getTime(), editTime: "", id: Date.now() },
  ];

  addTodo();
  localStorage.setItem("todo", JSON.stringify(data));
  form.text.value = "";
});

function addTodo() {
  lists.innerHTML = "";
  data.forEach((value) => {
    const list = document.createElement("div");
    list.classList.add("list");
    list.innerHTML = `
      <span>${value.text}</span>
      <div class="icons">
        <i class="fa-solid fa-pen-to-square"></i>
        <i id="${value.id}" class="fa-solid fa-trash"></i>
      </div>
      <div class="time">${value.time}</div>
    `;
    lists.append(list);
  });
}

function validateInput(text) {
  if (text.trim() === "") {
    error.style.display = "block";
    return false;
  } else {
    error.style.display = "none";
    return true;
  }
}

function getTime() {
  const date = new Date();
  const hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
  const minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
  const seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
  return `${hours}:${minutes}:${seconds}`;
}

lists.addEventListener("click", (e) => {
  if (e.target.classList.contains("fa-trash")) {
    deleteData(e.target.id);
  }
});

function deleteData(id) {
  data = data.filter((value) => value.id !== +id);
  addTodo();
  localStorage.setItem("todo", JSON.stringify(data));
}

addTodo();