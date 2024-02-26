var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const listDetails = document.querySelector(".div-details");
const value = window.location.search;
//*const searchParams = new URLSearchParams(value);
const searchURL = value.slice(1);
const APIbase = "https://swapi.dev/api/";
let planet = {
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
function getFilm(param) {
    return __awaiter(this, void 0, void 0, function* () {
        if (param) {
            const nameList = [];
            for (const url of param) {
                const trim = url.replace('"', "");
                const resp = yield fetch(`${trim}`);
                const item = yield resp.json();
                const urlItem = item.url;
                const name = ` <a href="${urlItem}" style="font-style: italic";>${item.title}</a>`;
                nameList.push(name);
            }
            planet.films = nameList;
        }
        else {
            planet.films = ["None"];
        }
    });
}
function getResidents(param) {
    return __awaiter(this, void 0, void 0, function* () {
        if (param) {
            const nameList = [];
            for (const url of param) {
                const trim = url.replace('"', "");
                const resp = yield fetch(`${trim}`);
                const item = yield resp.json();
                const urlItem = item.url;
                const name = ` <a href="${urlItem}" style="font-style: italic";>${item.name}</a>`;
                nameList.push(name);
            }
            planet.residents = nameList;
        }
        else {
            planet.residents = ["None"];
        }
    });
}
function populateInterface(param) {
    return __awaiter(this, void 0, void 0, function* () {
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
            yield getFilm(param.films);
            yield getResidents(param.residents);
        }
    });
}
function populateText(param) {
    return __awaiter(this, void 0, void 0, function* () {
        if (param) {
            yield populateInterface(param);
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
            listDetails === null || listDetails === void 0 ? void 0 : listDetails.appendChild(div);
        }
    });
}
function getPlanetById(param) {
    return __awaiter(this, void 0, void 0, function* () {
        if (param) {
            const resp = yield fetch(`${APIbase}${param}`);
            const item = yield resp.json();
            //*populateText(item);
        }
    });
}
function getPlanetBySearch(param) {
    return __awaiter(this, void 0, void 0, function* () {
        if (param) {
            const resp = yield fetch(`${APIbase}planets/?${param}`);
            const item = yield resp.json();
            if (item.results.length != 0) {
                populateText(item.results[0]);
            }
            else {
                const div = document.createElement("div");
                div.classList.add("auto-height");
                const p = document.createElement("p");
                p.textContent = "Planet has not found";
                div.appendChild(p);
                listDetails === null || listDetails === void 0 ? void 0 : listDetails.appendChild(div);
            }
        }
    });
}
function URLidentifier() {
    if (searchURL.match("search")) {
        getPlanetBySearch(searchURL);
        return true;
    }
    if (searchURL.match("planet")) {
        getPlanetById(searchURL);
        return true;
    }
    else {
        const div = document.createElement("div");
        div.classList.add("auto-height");
        const p = document.createElement("p");
        p.textContent = "Planet has not found";
        div.appendChild(p);
        listDetails === null || listDetails === void 0 ? void 0 : listDetails.appendChild(div);
        return false;
    }
}
URLidentifier();
export {};
