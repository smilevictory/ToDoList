const addBtn = document.querySelector(".fa-plus"); // 추가버튼
const input = document.querySelector(".footer_input"); //input 요소
const items = document.querySelector(".items"); // ul

//li 요소 생성함수
function createItem(text) {
  const itemRow = document.createElement("li");
  itemRow.className = "item";

  // 우선순위 기능 추가
  const prioritySelect = document.createElement("select");
  prioritySelect.innerHTML = `
    <option value="3">낮음</option>
    <option value="2">중간</option>
    <option value="1">높음</option>
  `;
  prioritySelect.className = "priority";

  // 우선순위 변경 시 배경색 업데이트
  prioritySelect.addEventListener("change", () => {
    updatePriorityColor(itemRow, prioritySelect.value);
    sortItems();
  });

  itemRow.innerHTML = `<span>${text}</span>
          <i class="fa-solid fa-check"></i>
          <i class="fa-solid fa-trash-can"></i>
        </li>`;
  itemRow.prepend(prioritySelect);

  // 체크버튼 클릭시 클래스 추가 이벤트
  itemRow.querySelector(".fa-check").addEventListener("click", () => {
    itemRow.classList.toggle("item_done");
  });

  //삭제 버튼 클릭시 itemRow 제거 이벤트
  itemRow
    .querySelector(".fa-trash-can")
    .addEventListener("click", () => itemRow.remove());

  //setTimeout(() => itemRow.scrollIntoView({ block: 'center' }), 0);
  requestAnimationFrame(() => itemRow.scrollIntoView({ block: "center" }));

  return itemRow;
}

// 요일별 고정 리스트 표 생성하는 버튼 기능 추가
const showWeeklyTasksBtn = document.getElementById("show-weekly-tasks");
const weeklyTasksTable = document.getElementById("weekly-tasks-table");
const weeklyTasksBody = document.getElementById("weekly-tasks-body");

const weeklyTasks = {
  월: ["운동하기"],
  화: ["책 읽기"],
  수: ["코딩테스트"],
  목: ["프로젝트 작업"],
  금: ["영화 감상"],
  토: ["정리 정돈"],
  일: ["휴식"],
};

// 요일별 할 일 표 생성 함수
function generateWeeklyTasksTable() {
  if (weeklyTasksTable.classList.contains("hidden")) {
    weeklyTasksBody.innerHTML = "";
    for (let day of ["월", "화", "수", "목", "금", "토", "일"]) {
      const td = document.createElement("td");
      td.innerHTML = weeklyTasks[day]
        .map((task) => `<li>${task}</li>`)
        .join("");
      weeklyTasksBody.appendChild(td);
    }
    weeklyTasksTable.classList.remove("hidden");
    showWeeklyTasksBtn.textContent = "📅 닫기";
  } else {
    // 표가 보일 때 -> 숨김
    weeklyTasksTable.classList.add("hidden");
    showWeeklyTasksBtn.textContent = "📅 요일별 할 일 보기";
  }
}
// 버튼 클릭 이벤트 등록
showWeeklyTasksBtn.addEventListener("click", generateWeeklyTasksTable);

// 추가함수
function onAdd() {
  const text = input.value.trim();
  if (!text) {
    input.value = "";
    input.focus();
    return;
  }

  // li생성하는 함수 - createItem(text)
  // ul에 생성값을 추가함

  // items.appendChild(createItem(text));
  const newItem = createItem(text);
  items.appendChild(newItem);
  sortItems();

  input.value = "";
  input.focus();
}

function sortItems() {
  const sortedItems = [...items.children].sort((a, b) => {
    return (
      a.querySelector(".priority").value - b.querySelector(".priority").value
    );
  });
  sortedItems.forEach((item) => items.appendChild(item));
}

// 이벤트 등록
addBtn.addEventListener("click", onAdd);
// input.addEventListener('keypress', (e) => {
//   console.log(e);
//   if (e.key === 'Enter') {
//     onAdd();
//   }
// });

input.addEventListener("keyup", (e) => e.key === "Enter" && onAdd());

// 우선순위에 따른 배경색 적용
function updatePriorityColor(item, priority) {
  item.style.backgroundColor =
    priority === "1" ? "#ffcccc" : priority === "2" ? "#ffe4b2" : "#d4f4dd"; // 빨강, 주황, 연두
}
