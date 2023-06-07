//Создание "тела" списка
const $tab = document.getElementById("tab"),
  $addForm = document.getElementById("add-form"),
  $nameInp = document.getElementById("add-form__name-inp"),
  $usernameInp = document.getElementById("add-form__username-inp"),
  $emailInp = document.getElementById("add-form__email-inp"),
  $websiteInp = document.getElementById("add-form__website-inp"),
  $table = document.createElement("table"),
  $tableHead = document.createElement("thead"),
  $tableBody = document.createElement("tbody"),
  $tableHeadtr = document.createElement("tr"),
  $tableHeadthName = document.createElement("th"),
  $tableHeadthUsername = document.createElement("th"),
  $tableHeadthEmail = document.createElement("th"),
  $tableHeadthWebsite = document.createElement("th");
$tableHeadtr.classList.add("trHead");
$tableHeadthName.classList.add("th");
$tableHeadthUsername.classList.add("th");
$tableHeadthEmail.classList.add("th");
$tableHeadthWebsite.classList.add("th");
$tableHeadthName.textContent = "Name";
$tableHeadthUsername.textContent = "Username";
$tableHeadthEmail.textContent = "Email";
$tableHeadthWebsite.textContent = "Website";

$tableHeadtr.append($tableHeadthName);
$tableHeadtr.append($tableHeadthUsername);
$tableHeadtr.append($tableHeadthEmail);
$tableHeadtr.append($tableHeadthWebsite);

$tableHead.append($tableHeadtr);
$table.append($tableHead);
$table.append($tableBody);
$tab.append($table);

let sortColumnFlag = "name"; //Переменная для работы сортировки
//Переменная в которую передаю даные после обработки fetch запроса
let state = {
  posts: [],
};
//Fetch запрос и передача данныъ в переменную
function getPosts() {
  return fetch("https://jsonplaceholder.typicode.com/users", {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((res) => res.json())
    .then((posts) => (state.posts = state.posts.concat(posts)));
}
//Функция для работы всей написанной гадости
const cons = async () => {
  await getPosts();
  await console.log(state.posts);

  await renderPost();
};
cons();
//Функция для отрисовки списка
function renderPost() {
  const fragment = document.createDocumentFragment();
  $tableBody.innerHTML = " "; //Очищение списка
  //Логика сортировки
  state.posts = state.posts.sort(function (a, b) {
    if (a[sortColumnFlag] < b[sortColumnFlag]) return -1;
  });
  //Рендер списка
  state.posts.forEach((index) => {
    const userTr = document.createElement("tr");
    userTr.classList.add(`tr-id${index.id}`);
    const name = document.createElement("td");
    name.classList.add("td");
    name.textContent = index.name;
    const userName = document.createElement("td");
    userName.classList.add("td");
    userName.textContent = index.username;
    const email = document.createElement("td");
    email.classList.add("td");
    email.textContent = index.email;
    const webSite = document.createElement("td");
    webSite.classList.add("td");
    webSite.textContent = index.website;
    const btnDel = document.createElement("button");
    btnDel.classList.add("butDelet");
    btnDel.id = `butDelet${index.id}`;
    btnDel.textContent = "X";

    userTr.appendChild(name);
    userTr.appendChild(userName);
    userTr.appendChild(email);
    userTr.appendChild(webSite);
    userTr.appendChild(btnDel);
    fragment.appendChild(userTr);
    name.addEventListener("click", () => openModal(index)); //Функция для работы модального окна
    userName.addEventListener("click", () => openModal(index));
    email.addEventListener("click", () => openModal(index));
    webSite.addEventListener("click", () => openModal(index));

    btnDel.addEventListener("click", function (e) {
      let btnDelElement = e.target;
      ell = btnDelElement.closest("tr");
      ell.parentElement.removeChild(ell);
    });
  });
  $tableBody.appendChild(fragment);
}

//работа сортировок
$tableHeadthName.addEventListener("click", function () {
  sortColumnFlag = "name";
  renderPost();
});

$tableHeadthUsername.addEventListener("click", function () {
  sortColumnFlag = "username";
  renderPost();
});

$tableHeadthEmail.addEventListener("click", function () {
  sortColumnFlag = "email";
  renderPost();
});
$tableHeadthWebsite.addEventListener("click", function () {
  sortColumnFlag = "website";
  renderPost();
});
//Модальное окно
const modalEl = document.querySelector(".modal");

function openModal(index) {
  modalEl.classList.add("modal--show");
  modalEl.innerHTML = `
  <div class="User__cards">
    <ul>
      <li>Name : ${index.name}</li>
      <li>Username : ${index.username}</li><br>
      <li>City : ${index.address.city}</li>
      <li>Street : ${index.address.street}</li><br>
      <li>Company : ${index.company.name}</li>
    </ul>
    <button type="button" class="modal__button-close">Close</button>
  </div>
`;
  const btnClose = document.querySelector(".modal__button-close"); //Работа кнопки Close
  btnClose.addEventListener("click", () => closeModal()); //Работа кнопки Close
}
//Работа кнопки Close
function closeModal() {
  modalEl.classList.remove("modal--show");
}
//Закрытие по клику в любую область
window.addEventListener("click", (e) => {
  if (e.target === modalEl) {
    closeModal();
  }
});
//Закрытие на кнопку Esc
window.addEventListener("keydown", (e) => {
  if (e.keyCode === 27) {
    modalEl.classList.remove("modal--show");
  }
});

//Добавление пользователя
$addForm.addEventListener("submit", function (event) {
  event.preventDefault();
  //Валидация формы
  // .trim() - не дает просто поставить пробел в поле ввода)))
  if ($nameInp.value.trim() == "") {
    alert("Name не введено))");
    return;
  }
  if ($usernameInp.value.trim() == "") {
    alert("Username не введен!");
    return;
  }
  if ($emailInp.value.trim() == "") {
    alert("Email не введен))");
    return;
  }
  if ($websiteInp.value.trim() == "") {
    alert("Website не введен))");
    return;
  }
  //Само добавление пользователя
  state.posts.push({
    name: $nameInp.value.trim(),
    username: $usernameInp.value.trim(),
    email: $emailInp.value.trim(),
    website: $websiteInp.value.trim(),
    address: {
      street: "Inp для этого не делал",
      city: "Inp для этого не делал",
    },
    company: {
      name: "Ну и для этого тоже))))",
    },
  });
  renderPost();
  console.log(state.posts);
});
