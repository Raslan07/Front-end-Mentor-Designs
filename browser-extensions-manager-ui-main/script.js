document.addEventListener("DOMContentLoaded", () => {
  const fieldExtern = document.querySelector(".field-exten"); // template
  const fieldContainer = document.querySelector("#field-container"); // container
  const title = fieldExtern.querySelector("h1");
  const para = fieldExtern.querySelector("#para");
  const image = fieldExtern.querySelector(".todo");
  const input = fieldExtern.querySelector(".inputs");
  const btn_theme = document.querySelector('#toggle-theme');

  async function fetchAPI() {
    try {
      const response = await fetch("./data.json");
      if (!response.ok) throw new Error("Failed to fetch JSON");

      const result = await response.json();
      console.log(result);

      // clear container before appending
      fieldContainer.innerHTML = "";

      result.forEach((item) => {
        // clone the template
        const clone = fieldExtern.cloneNode(true);

        // update content inside the clone
        clone.querySelector("h1").textContent = item.name;
        clone.querySelector("#para").textContent = item.description;
        clone.querySelector(".todo").src = item.logo;
        if (!item.isActive) {
            clone.querySelector(".inputs").checked = item.isActive;
        }
        
          // append to container
        fieldContainer.appendChild(clone);
      });
    } catch (error) {
      console.error(error.message);
    }
}
    fetchAPI();
});
