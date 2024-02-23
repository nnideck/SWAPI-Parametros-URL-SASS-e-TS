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
let peopleList = [];
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
function populateText(list) {
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
            listDetails === null || listDetails === void 0 ? void 0 : listDetails.appendChild(div);
        }
    }
}
function getPeople() {
    return __awaiter(this, void 0, void 0, function* () {
        const resp = yield fetch("https://swapi.dev/api/people/");
        const people = yield resp.json();
        peopleList = people.results;
        populateItens(peopleList);
        populateText(peopleList);
    });
}
getPeople();
export {};
