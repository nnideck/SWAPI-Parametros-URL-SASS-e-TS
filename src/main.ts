const inputPlanet = document.querySelector("#planet") as HTMLInputElement;
const APIbase: string = "https://swapi.dev/api/";

function searchPlanet() {
  window.location.href = `planet-detail.html?search=${inputPlanet.value}`;
}

inputPlanet.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    searchPlanet();
  } else {
    return false;
  }
});
