let createNewCategory = document.querySelector("#createNewCategory");
let addCategoryBtn = document.querySelector("#addCategoryBtn");
let categoryList = document.querySelector("#categoryList");

document.addEventListener("DOMContentLoaded", () => {
  let listCategory = [];
  addCategoryBtn.addEventListener("click", () => {
    let newCategoryName = createNewCategory.value.trim();
    if (!newCategoryName) {
      return alert("Please enter a category name!");
    }
    listCategory.push(newCategoryName);
    localStorage.setItem("categories", JSON.stringify(listCategory));
    addCategoryList();

    createNewCategory.value = "";
  });

  const savedCategories = localStorage.getItem("categories");
  if (savedCategories) {
    listCategory = JSON.parse(savedCategories);
    addCategoryList();
  }

  function addCategoryList() {
    categoryList.innerHTML = "";

    listCategory.forEach((category, index) => {
      let categoryItem = document.createElement("li");
      categoryItem.textContent = category;

      let deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.classList.add("btn", "btn-danger", "ms-2");
      deleteBtn.addEventListener("click", () => {
        listCategory.splice(index, 1);
        localStorage.setItem("categories", JSON.stringify(listCategory));
        addCategoryList();
      });

      categoryItem.append(deleteBtn);
      categoryList.append(categoryItem);
    });
  }
});
