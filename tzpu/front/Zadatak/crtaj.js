import { backRoutes, pageRoutes, tipKorisnika } from "../enums.js";
import { button, div, h1, input } from "../fje.js";
import { getState, setState } from "../state.js";

const zadatak = `Kreirati cup specifikaciju za generisanje sintaksnog (i semantičkog) analizatora for-petlje koja je
opisana gramatikom iz prethodnog zadatka. Za generisanje potrebnog leksičkog analizatora kreirati
odgovarajuću flex specifikaciju. Terminalni simbol ID predstavlja niz cifara i slova u kojem je prvi
znak obavezno slovo. CONST je celobrojna konstanta zapisana u dekadnom brojnom sistemu, ili
string (niz karktera između dvostrukih navodnika). Semantičko pravilo o kojem treba voditi računa je
da tip promeniljive ID mora da se slaže sa tipovima svih izraza u listi. 
`;
export class Test2 {
  constructor() {
    this.kont = null;
  }

  crtaj2(host) {
    this.kont = div(host, "glavni2");
    let divNaslov = div(this.kont, "divNaslov");
    let naslov = h1(divNaslov, "h1", "Napišite tekst zadatka");
    let divInput = div(this.kont, "divInput");
    // let inputZadatak = input(divInput, "inputZadatka");
    let inputZadatak = document.createElement("textarea");
    divInput.appendChild(inputZadatak);
    inputZadatak.className = "inputZadatka";
    inputZadatak.id = 1;
    inputZadatak.value = zadatak;

    let divDugmici = div(this.kont, "dugmici");

    let divButton = div(divDugmici, "divButton");
    let buttonZadatak = button(divButton, "btn", "Potvrdi");
    buttonZadatak.onclick = this.postaviZadatak;

    let divButtonNazad = div(this.kont, "divButtonNazad");
    let buttonNazad = button(divButtonNazad, "nazad", "Nazad");
    buttonNazad.onclick = () => {
      window.location.assign("index.html");
    };
  }

  postaviZadatak() {
    const inputZadatak = document.getElementById(1);
    const zadatak = inputZadatak.value;

    const state = getState();
    const { username, tip } = state;

    const backRoute =
      tip === tipKorisnika.profesor
        ? backRoutes.profesorUpload
        : backRoutes.studentUpload;

    fetch(backRoute, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, zadatak }),
    }).then(async (res) => {
      console.log("aa");
      window.location.href = pageRoutes.dockerAzureHorizon;
    });
  }
}
