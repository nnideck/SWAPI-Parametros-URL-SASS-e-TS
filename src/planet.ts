import { IPlanets } from "./types";

const listDetails = document.querySelector(".div-details");
const value = window.location.search;
//*const searchParams = new URLSearchParams(value);
const searchURL: string = value.slice(1);
const APIbase: string = "https://swapi.dev/api/";

let planet: IPlanets = {
  name: "",
  rotation_period: 0,
  orbital_period: 0,
  diameter: 0,
  climate: "",
  gravity: "",
  terrain: "",
  surface_water: 0,
  population: 0,
  residents: [],
  films: [],
  created: "",
  edited: "",
  url: "",
};

let titles = {
  name: "Name",
  rotation_period: 0,
  orbital_period: 0,
  diameter: 0,
  climate: "",
  gravity: "",
  terrain: "",
  surface_water: 0,
  population: 0,
  residents: [],
  films: [],
  created: "",
  edited: "",
  url: "",
};

async function getFilm(param: string[]) {
  if (param) {
    const nameList = [];
    for (const url of param) {
      const trim = url.replace('"', "");
      const resp = await fetch(`${trim}`);
      const item = await resp.json();
      const urlItem = item.url;
      const name = ` <a href="${urlItem}" style="font-style: italic";>${item.title}</a>`;
      nameList.push(name);
    }
    planet.films = nameList;
  } else {
    planet.films = ["None"];
  }
}

async function getResidents(param: string[]) {
  if (param) {
    const nameList = [];
    for (const url of param) {
      const trim = url.replace('"', "");
      const resp = await fetch(`${trim}`);
      const item = await resp.json();
      const urlItem = item.url;
      const name = ` <a href="${urlItem}" style="font-style: italic";>${item.name}</a>`;
      nameList.push(name);
    }
    planet.residents = nameList;
  } else {
    planet.residents = ["None"];
  }
}

async function populateInterface(param: IPlanets) {
  if (param) {
    planet.name = param.name;
    planet.rotation_period = param.rotation_period;
    planet.orbital_period = param.orbital_period;
    planet.diameter = param.diameter;
    planet.climate = param.climate;
    planet.gravity = param.gravity;
    planet.terrain = param.terrain;
    planet.surface_water = param.surface_water;
    planet.population = param.population;
    planet.url = param.url.slice(APIbase.length);
    await getFilm(param.films);
    await getResidents(param.residents);
  }
}

async function populateText(param: IPlanets) {
  if (param) {
    await populateInterface(param);
    const div = document.createElement("div");
    div.classList.add("auto-height");
    const ul = document.createElement("ul");
    div.innerHTML = `<h4>
      ${planet.name}</h4>`;

    Object.keys(planet).forEach((item) => {
      if (item !== "url" && item !== "created" && item !== "edited") {
        const li = document.createElement("li");
        li.innerHTML = `${item}: ${planet[item]}`;
        ul.appendChild(li);
      }
      div.appendChild(ul);
    });
    listDetails?.appendChild(div);
  }
}

async function getPlanetById(param: string) {
  if (param) {
    const resp = await fetch(`${APIbase}${param}`);
    const item = await resp.json();
    //*populateText(item);
  }
}

async function getPlanetBySearch(param: string) {
  if (param) {
    const resp = await fetch(`${APIbase}planets/?${param}`);
    const item = await resp.json();
    if (item.results.length != 0) {
      populateText(item.results[0]);
    } else {
      const div = document.createElement("div");
      div.classList.add("auto-height");
      const p = document.createElement("p");
      p.textContent = "Planet has not found";
      div.appendChild(p);
      listDetails?.appendChild(div);
    }
  }
}

function URLidentifier() {
  if (searchURL.match("search")) {
    getPlanetBySearch(searchURL);
    return true;
  }
  if (searchURL.match("planet")) {
    getPlanetById(searchURL);
    return true;
  } else {
    const div = document.createElement("div");
    div.classList.add("auto-height");
    const p = document.createElement("p");
    p.textContent = "Planet has not found";
    div.appendChild(p);
    listDetails?.appendChild(div);
    return false;
  }
}
URLidentifier();
