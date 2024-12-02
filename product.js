let productList = document.querySelector(".productList");
let searchInput = document.querySelector("#searchInput");
let addProductBtn = document.querySelector(".addProductBtn");
let pro_name = document.querySelector("#pro_name");
let pro_info = document.querySelector("#pro_info");
let pro_price = document.querySelector("#pro_price");
let img_url = document.querySelector("#img_url");

document.addEventListener("DOMContentLoaded", () => {
  let allProducts = [];

  (async function () {
    try {
      const response = await fetch("http://localhost:3000/products");
      if (!response.ok) throw new Error("Failed to fetch data");
      const datas = await response.json();
      allProducts = datas;
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
    productList.classList.add("flex", "gap-4");

    datas.forEach((product) => {
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

      let img = document.createElement("img");
      img.src = product.img;
      img.alt = product.name;
      img.classList.add("w-full", "rounded", "mb-4", "h-40", "object-cover");

      let title = document.createElement("h3");
      title.textContent = product.name;
      title.classList.add("card-title");

      let text = document.createElement("p");
      text.textContent = product.description;
      text.classList.add("card-text");

      let price = document.createElement("strong");
      price.textContent = `$${product.price}`;
      price.classList.add("text-success");

      let btndiv = document.createElement("div");
      btndiv.classList.add(
        "d-flex",
        "justify-content-between",
        "mt-3",
        "gap-2"
      );

      let likeBtn = document.createElement("button");
      likeBtn.textContent = "Like";
      likeBtn.classList.add("btn", "btn-primary");
      likeBtn.addEventListener("click", () => {
        likeBtn.textContent = "Liked";
      });

      let deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.classList.add("btn", "btn-danger");

      deleteBtn.addEventListener("click", () => {
        allProducts = allProducts.filter((p) => p !== product);
        getDatas(allProducts);
        console.log(`Deleted product: ${product.name}`);
      });

      btndiv.append(likeBtn, deleteBtn);
      card.append(img, title, text, price, btndiv);
      productList.append(card);
    });
  }

  searchInput.addEventListener("input", (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredProducts = allProducts.filter((product) =>
      product.name.toLowerCase().includes(searchTerm)
    );
    getDatas(filteredProducts);
  });

  addProductBtn.addEventListener("click", (e) => {
    e.preventDefault();

    let nameValue = pro_name.value.trim();
    let infoValue = pro_info.value.trim();
    let priceValue = parseFloat(pro_price.value.trim());
    let imageUrlValue = img_url.value.trim();

    if (
      !nameValue ||
      !infoValue ||
      isNaN(priceValue) ||
      priceValue <= 0 ||
      !imageUrlValue.startsWith("http")
    ) {
      return alert("Please fill in all fields correctly!");
    }

    let newProduct = {
      img: imageUrlValue,
      name: nameValue,
      description: infoValue,
      price: priceValue,
    };

    allProducts.push(newProduct);
    localStorage.setItem("products", JSON.stringify(allProducts));
    getDatas(allProducts);

    pro_name.value = "";
    pro_info.value = "";
    pro_price.value = "";
    img_url.value = "";

    console.log("New product added:", newProduct);
  });
});
