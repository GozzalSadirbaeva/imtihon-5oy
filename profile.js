let profileName = document.querySelector("#profileName");
let profileEmail = document.querySelector("#profileEmail");
let profileAddress = document.querySelector("#profileAddress");
let profilePhone = document.querySelector("#profilePhone");

let editProfileBtn = document.querySelector("#editProfileBtn");
let modalProfileName = document.querySelector("#modalProfileName");
let modalProfileEmail = document.querySelector("#modalProfileEmail");
let modalProfileAddress = document.querySelector("#modalProfileAddress");
let modalProfilePhone = document.querySelector("#modalProfilePhone");

document.addEventListener("DOMContentLoaded", async () => {
  const response = await fetch("http://localhost:3000/profile");
  const profile = await response.json();

  function displayProfile(profile) {
    profileName.textContent = profile.name;
    profileEmail.textContent = profile.email;
    profileAddress.textContent = profile.address;
    profilePhone.textContent = profile.phone;
  }
  displayProfile(profile);

  editProfileBtn.addEventListener("click", () => {
    modalProfileName.textContent = profile.name;
    modalProfileEmail.textContent = profile.email;
    modalProfileAddress.textContent = profile.address;
    modalProfilePhone.textContent = profile.phone;
  });
});
