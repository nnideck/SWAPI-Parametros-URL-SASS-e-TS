var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const ulItens = document.querySelector(".ulItens");
const listDetails = document.querySelector(".div-details");
const APIbase = "https://swapi.dev/api/";
let peopleList = [];
let person = {
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
let planetsList = [];
function populateItens(list) {
    if (list) {
        for (const obj of list) {
            const li = document.createElement("li");
            li.innerHTML = `<a class="p-1 rounded" href="#simple-list-item-${obj.name}">
          ${obj.name}
        </a>`;
            ulItens === null || ulItens === void 0 ? void 0 : ulItens.appendChild(li);
        }
    }
}
function getHomeWorld(param) {
    return __awaiter(this, void 0, void 0, function* () {
        const resp = yield fetch(`${param}`);
        const item = yield resp.json();
        const name = item.name;
        const url = item.url;
        person.homeworld = `<a href="${url}">${name}</a>`;
    });
}
function getFilm(param) {
    return __awaiter(this, void 0, void 0, function* () {
        if (param) {
            const nameList = [];
            for (const url of param) {
                const trim = url.replace('"', "");
                const resp = yield fetch(`${trim}`);
                const item = yield resp.json();
                const urlItem = item.url;
                const name = `<a href="${urlItem}" style="font-style: italic";>${item.title}</a>`;
                nameList.push(name);
            }
            person.films = nameList;
        }
        return ["None"];
    });
}
function getSpecies(param) {
    return __awaiter(this, void 0, void 0, function* () {
        if (param.length != 0) {
            const nameList = [];
            for (const url of param) {
                const trim = url.replace('"', "");
                const resp = yield fetch(`${trim}`);
                const item = yield resp.json();
                const urlItem = item.url;
                const name = `<a href="${urlItem}" style="font-style: italic">${item.name} </a>`;
                nameList.push(name);
            }
            person.species = nameList;
        }
        return ["None"];
    });
}
function getVehicles(param) {
    return __awaiter(this, void 0, void 0, function* () {
        if (param.length != 0) {
            const nameList = [];
            for (const url of param) {
                const trim = url.replace('"', "");
                const resp = yield fetch(`${trim}`);
                const item = yield resp.json();
                const urlItem = item.url;
                const name = `<a href="${urlItem}" style="font-style: italic">${item.name}</a>`;
                nameList.push(name);
            }
            person.vehicles = nameList;
        }
        return ["None"];
    });
}
function getStarships(param) {
    return __awaiter(this, void 0, void 0, function* () {
        if (param.length != 0) {
            const nameList = [];
            for (const url of param) {
                const trim = url.replace('"', "");
                const resp = yield fetch(`${trim}`);
                const item = yield resp.json();
                const urlItem = item.url;
                const name = `<a href="${urlItem}" style="font-style: italic">${item.name}</a>`;
                nameList.push(name);
            }
            person.starships = nameList;
        }
        return ["None"];
    });
}
function populateInterface(param) {
    return __awaiter(this, void 0, void 0, function* () {
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
            yield getHomeWorld(param.homeworld);
            yield getFilm(param.films);
            yield getSpecies(param.species);
            yield getVehicles(param.vehicles);
            yield getStarships(param.starships);
        }
    });
}
function populateText(list) {
    return __awaiter(this, void 0, void 0, function* () {
        if (list) {
            for (const obj of list) {
                yield populateInterface(obj);
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
                listDetails === null || listDetails === void 0 ? void 0 : listDetails.appendChild(div);
            }
        }
    });
}
function getPeople() {
    return __awaiter(this, void 0, void 0, function* () {
        const resp = yield fetch(`${APIbase}people/`);
        const people = yield resp.json();
        peopleList = people.results;
        populateItens(peopleList);
        populateText(peopleList);
    });
}
getPeople();
function getPlanets() {
    return __awaiter(this, void 0, void 0, function* () {
        const resp = yield fetch(`${APIbase}planets/`);
        const planets = yield resp.json();
        planetsList = planets;
    });
}
getPlanets();
export {};
