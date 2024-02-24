import { IPeople, IPlanets } from "./types";

const ulItens = document.querySelector(".ulItens");
const listDetails = document.querySelector(".div-details");
const APIbase: string = "https://swapi.dev/api/";

let peopleList: IPeople[] = [];
let person: IPeople = {
  name: "",
  height: 0,
  mass: 0,
  hair_color: "",
  skin_color: "",
  eye_color: "",
  birth_year: "",
  gender: "",
  homeworld: "",
  films: ["none"],
  species: ["none"],
  vehicles: ["none"],
  starships: ["none"],
  created: "",
  edited: "",
  url: "",
};

let planetsList: IPlanets[] = [];

function populateItens(list: IPeople[]) {
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

async function getHomeWorld(param: string) {
  const resp = await fetch(`${param}`);
  const item = await resp.json();
  const name = item.name;
  const url = item.url;
  person.homeworld = `<a href="${url}">${name}</a>`;
}

async function getFilm(param: string[]) {
  if (param) {
    const nameList = [];
    for (const url of param) {
      const trim = url.replace('"', "");
      const resp = await fetch(`${trim}`);
      const item = await resp.json();
      const urlItem = item.url;
      const name = `<a href="${urlItem}" style="font-style: italic";>${item.title}</a>`;
      nameList.push(name);
    }
    person.films = nameList;
  }
  return ["None"];
}

async function getSpecies(param: string[]) {
  if (param.length != 0) {
    const nameList = [];
    for (const url of param) {
      const trim = url.replace('"', "");
      const resp = await fetch(`${trim}`);
      const item = await resp.json();
      const urlItem = item.url;
      const name = `<a href="${urlItem}" style="font-style: italic">${item.name} </a>`;
      nameList.push(name);
    }
    person.species = nameList;
  }
  return ["None"];
}

async function getVehicles(param: string[]) {
  if (param.length != 0) {
    const nameList = [];
    for (const url of param) {
      const trim = url.replace('"', "");
      const resp = await fetch(`${trim}`);
      const item = await resp.json();
      const urlItem = item.url;
      const name = `<a href="${urlItem}" style="font-style: italic">${item.name}</a>`;
      nameList.push(name);
    }
    person.vehicles = nameList;
  }
  return ["None"];
}

async function getStarships(param: string[]) {
  if (param.length != 0) {
    const nameList = [];
    for (const url of param) {
      const trim = url.replace('"', "");
      const resp = await fetch(`${trim}`);
      const item = await resp.json();
      const urlItem = item.url;
      const name = `<a href="${urlItem}" style="font-style: italic">${item.name}</a>`;
      nameList.push(name);
    }
    person.starships = nameList;
  }
  return ["None"];
}

async function populateInterface(param: IPeople) {
  if (param) {
    person.name = param.name;
    person.height = param.height;
    person.mass = param.mass;
    person.hair_color = param.hair_color;
    person.skin_color = param.skin_color;
    person.eye_color = param.eye_color;
    person.gender = param.gender;
    person.films = param.films;
    person.url = param.url.slice(APIbase.length);
    await getHomeWorld(param.homeworld);
    await getFilm(param.films);
    await getSpecies(param.species);
    await getVehicles(param.vehicles);
    await getStarships(param.starships);
  }
}

async function populateText(list: IPeople[]) {
  if (list) {
    for (const obj of list) {
      await populateInterface(obj);
      const div = document.createElement("div");
      const ul = document.createElement("ul");
      div.innerHTML = `<h4 id="simple-list-item-${obj.name}">
      <a href="${APIbase}${person.url}">${obj.name}</a></h4>`;

      Object.keys(person).forEach((item) => {
        if (item !== "url" && item !== "created" && item !== "edited") {
          const li = document.createElement("li");
          li.innerHTML = `${item}: ${person[item]}`;
          ul.appendChild(li);
        }
        div.appendChild(ul);
      });
      listDetails?.appendChild(div);
    }
  }
}

async function getPeople() {
  const resp = await fetch(`${APIbase}people/`);
  const people = await resp.json();
  peopleList = people.results;
  populateItens(peopleList);
  populateText(peopleList);
}
getPeople();

async function getPlanets() {
  const resp = await fetch(`${APIbase}planets/`);
  const planets = await resp.json();
  planetsList = planets;
}
getPlanets();
