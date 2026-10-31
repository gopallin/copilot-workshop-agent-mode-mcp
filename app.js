const STORAGE_KEY = "todo-list-items";
const form = document.querySelector("#todo-form");
const input = document.querySelector("#todo-input");
const list = document.querySelector("#todo-list");
const emptyState = document.querySelector("#empty-state");
const remainingCount = document.querySelector("#remaining-count");

let todos = loadTodos();

// 儲存資料無法讀取時，改以空清單開始。
function loadTodos() {
  try {
    const storedTodos = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return Array.isArray(storedTodos)
      ? storedTodos.filter((todo) => (
        todo
        && typeof todo.id === "string"
        && typeof todo.text === "string"
        && typeof todo.completed === "boolean"
      ))
      : [];
  } catch {
    return [];
  }
}

function saveTodos() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

function renderTodos() {
  list.replaceChildren();
  emptyState.hidden = todos.length > 0;

  todos.forEach((todo) => {
    const item = document.createElement("li");
    item.className = "todo-item";
    item.classList.toggle("is-completed", todo.completed);
    item.dataset.id = todo.id;

    const checkbox = document.createElement("input");
    checkbox.className = "todo-checkbox";
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;
    checkbox.setAttribute("aria-label", `標記「${todo.text}」為已完成`);

    const text = document.createElement("span");
    text.className = "todo-text";
    text.textContent = todo.text;

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-button";
    deleteButton.type = "button";
    deleteButton.dataset.action = "delete";
    deleteButton.setAttribute("aria-label", `刪除「${todo.text}」`);
    deleteButton.textContent = "×";

    item.append(checkbox, text, deleteButton);
    list.append(item);
  });

  const remaining = todos.filter((todo) => !todo.completed).length;
  remainingCount.textContent = `未完成:${remaining} 項`;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = input.value.trim();
  if (!text) return;

  todos.push({
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    text,
    completed: false,
  });

  saveTodos();
  renderTodos();
  form.reset();
  input.focus();
});

list.addEventListener("change", (event) => {
  if (!event.target.matches(".todo-checkbox")) return;

  const item = event.target.closest(".todo-item");
  const todo = todos.find((entry) => entry.id === item.dataset.id);
  if (!todo) return;

  todo.completed = event.target.checked;
  saveTodos();
  renderTodos();
});

list.addEventListener("click", (event) => {
  const deleteButton = event.target.closest('[data-action="delete"]');
  if (!deleteButton) return;

  const item = deleteButton.closest(".todo-item");
  todos = todos.filter((todo) => todo.id !== item.dataset.id);
  saveTodos();
  renderTodos();
});

renderTodos();
