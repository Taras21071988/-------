//Создание таблицы
const $tab = document.getElementById("tab"),
  $table = document.createElement("table"),
  $tableHead = document.createElement("thead"),
  $tableBody = document.createElement("tbody"),
  $tableHeadtr = document.createElement("tr"),
  $tableHeadthName = document.createElement("th"),
  $tableHeadthUsername = document.createElement("th"),
  $tableHeadthEmail = document.createElement("th"),
  $tableHeadthWebsite = document.createElement("th");
$tableHeadtr.classList.add("trHead");
$tableBody.classList.add("tbody");
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
let sortColumnFlag = "name";
//Получение данных
const url = "https://jsonplaceholder.typicode.com/users";

getResorse(url);

async function getResorse(url) {
  const resp = await fetch(url);
  const respData = await resp.json();

  render(respData);
}
//Рендер и сортировка таблицы
function render(data) {
  $tableBody.innerHTML = " "; //Очистка перед отрисовкой при сортировки

  //Сортировка
  data = data.sort(function (a, b) {
    if (a[sortColumnFlag] < b[sortColumnFlag]) return -1;
  });
  //
  //Рендер таблицы
  data.forEach((post) => {
    const userTr = document.createElement("tr");
    userTr.classList.add("tr");
    userTr.innerHTML = `
      <td class="td__name">${post.name}</td>
      <td class="td__username">${post.username}</td>
      <td class="td__email">${post.email}</td>
      <td class="td__website">${post.website}</td>
    `;
    userTr.addEventListener("click", () => openModal(post.id));
    $tableBody.appendChild(userTr);
  });
}
//Работа сортировки
$tableHeadthName.addEventListener("click", function () {
  sortColumnFlag = "name";
  getResorse(url);
});

$tableHeadthUsername.addEventListener("click", function () {
  sortColumnFlag = "username";
  getResorse(url);
});

$tableHeadthEmail.addEventListener("click", function () {
  sortColumnFlag = "email";
  getResorse(url);
});
$tableHeadthWebsite.addEventListener("click", function () {
  sortColumnFlag = "website";
  getResorse(url);
});

//Модальное окно

const modalEl = document.querySelector(".modal");

async function openModal(id) {
  const resp = await fetch(url);
  const respData = await resp.json();
  // console.log(respData);
  // console.log(id);

  modalEl.classList.add("modal--show");
  modalEl.innerHTML = `
  <div class="User__cards">
    <ul>
      <li>Name : ${respData[id - 1].name}</li>
      <li>Username : ${respData[id - 1].username}</li><br>
      <li>City : ${respData[id - 1].address.city}</li>
      <li>Street : ${respData[id - 1].address.street}</li><br>
      <li>Company : ${respData[id - 1].company.name}</li>
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
