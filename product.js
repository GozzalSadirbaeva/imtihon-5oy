let productList = document.querySelector(".productList");

document.addEventListener("DOMContentLoaded", () => {
  function getDatas(datas) {
    productList.innerHTML = "";
    datas.forEach((product) => {
      let card = document.createElement("div");
      let img = document.createElement("img");
      let title = document.createElement("h3");
      let text = document.createElement("p");
      let price = document.createElement("strong");
      let btndiv = document.createElement("div");
      let likeBtn = document.createElement("button");
      let deleteBtn = document.createElement("button");
    });
  }
});
