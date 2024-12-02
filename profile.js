let profileName = document.querySelector("#profileName");
let profileEmail = document.querySelector("#profileEmail");
let profileAddress = document.querySelector("#profileAddress");
let profilePhone = document.querySelector("#profilePhone");

let editProfileBtn = document.querySelector("#editProfileBtn");
let modalProfileName = document.querySelector("#modalProfileName");
let modalProfileEmail = document.querySelector("#modalProfileEmail");
let modalProfileAddress = document.querySelector("#modalProfileAddress");
let modalProfilePhone = document.querySelector("#modalProfilePhone");
let saveBtn = document.querySelector(".saveBtn");

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch("http://localhost:3000/profile");
    const profile = await response.json();

    // Function to display profile in main page
    function displayProfile(profile) {
      profileName.textContent = profile.name;
      profileEmail.textContent = profile.email;
      profileAddress.textContent = profile.address;
      profilePhone.textContent = profile.phone;
    }

    displayProfile(profile);

    editProfileBtn.addEventListener("click", () => {
      modalProfileName.value = profile.name;
      modalProfileEmail.value = profile.email;
      modalProfileAddress.value = profile.address;
      modalProfilePhone.value = profile.phone;
    });

    saveBtn.addEventListener("click", async () => {
      const updatedProfile = {
        name: modalProfileName.value,
        email: modalProfileEmail.value,
        address: modalProfileAddress.value,
        phone: modalProfilePhone.value,
      };

      try {
        const updateResponse = await fetch("http://localhost:3000/profile", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedProfile),
        });

        if (!updateResponse.ok) {
          throw new Error("Failed to update profile");
        }

        displayProfile(updatedProfile);

        alert("Profile updated successfully!");
      } catch (error) {
        console.error("Error updating profile:", error);
        alert("There was an error updating the profile.");
      }
    });
  } catch (error) {
    console.error("Error fetching profile data:", error);
  }
});
