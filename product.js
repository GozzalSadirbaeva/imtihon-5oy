let productList = document.querySelector(".productList");

document.addEventListener("DOMContentLoaded", () => {
  (async function () {
    try {
      const response = await fetch("http://localhost:3000/products");
      if (!response.ok) throw new Error("Failed to fetch data");
      const datas = await response.json();
      //   console.log(datas);
      getDatas(datas);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  })();

  function getDatas(datas) {
    if (!datas || !Array.isArray(datas)) {
      console.error("Invalid data format:", datas);
      return;
    }
    productList.innerHTML = "";

    datas.forEach((product) => {
      //   console.log(product);
      // Create card container
      let card = document.createElement("div");
      card.classList.add(
        "flex",
        "flex-col",
        "items-center",
        "rounded-lg",
        "shadow-lg",
        "bg-white",
        "p-5",
        "hover:shadow-xl",
        "transition",
        "w-full"
      );
      //   card.classList.add("card", "m-3", "p-3", "shadow-lg", "border");

      // Product Image
      let img = document.createElement("img");
      img.src = product.img;
      img.alt = product.name; // Add alt text
      img.classList.add("w-full", "rounded", "mb-4", "h-40", "object-cover");

      // Product Title
      let title = document.createElement("h3");
      title.textContent = product.name;
      title.classList.add("card-title");

      // Product Description
      let text = document.createElement("p");
      text.textContent = product.description;
      text.classList.add("card-text");

      // Product Price
      let price = document.createElement("strong");
      price.textContent = `$${product.price}`;
      price.classList.add("text-success");

      // Button Container
      let btndiv = document.createElement("div");
      btndiv.classList.add("d-flex", "justify-content-between", "mt-3");

      // Like Button
      let likeBtn = document.createElement("button");
      likeBtn.textContent = "Like";
      likeBtn.classList.add("btn", "btn-primary");

      // Delete Button
      let deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.classList.add("btn", "btn-danger");

      // Append elements
      btndiv.append(likeBtn, deleteBtn);
      card.append(img, title, text, price, btndiv);
      productList.append(card);
    });
  }
});
