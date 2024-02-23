import { IPlanets } from "./types";

const ulItens = document.querySelector(".ulItens");
const listDetails = document.querySelector(".div-details");

let planetsList: IPlanets[] = [];

function populateItens(list: IPlanets[]) {
  if (list) {
    for (const obj of list) {
      const li = document.createElement("li");
      li.innerHTML = `<a class="p-1 rounded" href="#simple-list-item-${obj.name}">
          ${obj.name}
        </a>`;
      ulItens?.appendChild(li);
    }
  }
}

function populateText(list: IPlanets[]) {
  if (list) {
    for (const obj of list) {
      const div = document.createElement("div");
      const ul = document.createElement("ul");
      div.innerHTML = `   <h4 id="simple-list-item-${obj.name}">${obj.name}</h4>`;
      Object.keys(obj).forEach((item) => {
        if (item !== "url" && item !== "created" && item !== "edited") {
          const li = document.createElement("li");
          li.textContent = `${item}: ${obj[item]}`;
          console.log(item);
          ul.appendChild(li);
          div.appendChild(ul);
        }
      });
      listDetails?.appendChild(div);
    }
  }
}

async function getPlanets() {
  const resp = await fetch("https://swapi.dev/api/planets/");
  const planet = await resp.json();
  planetsList = planet.results;

  populateItens(planetsList);
  populateText(planetsList);
}
getPlanets();
