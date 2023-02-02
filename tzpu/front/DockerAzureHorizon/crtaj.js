import { backRoutes, tipKorisnika } from "../enums.js";
import { button, div, h1 } from "../fje.js";
import { getState } from "../state.js";
export class Test {
  constructor() {
    this.kont = null;
  }
  crtaj(host) {
    this.kont = div(host, "glavni3");

    let divNaslov = div(this.kont, "divNaslov");
    h1(divNaslov, "h1", "Odaberite tehnologiju za deljenje kolokvijuma");

    let divSlike = div(this.kont, "divSlike");
    let divDocker = div(divSlike, "divDocker");
    let slikaDocker = document.createElement("img");
    slikaDocker.src =
      "https://www.techrepublic.com/wp-content/uploads/2015/02/docker-logo.png";
    slikaDocker.className = "slikaDoker";
    divDocker.appendChild(slikaDocker);

    let divButton = div(this.kont, "divButton");
    let buttonDocker = button(divButton, "myBtn", "Docker");
    buttonDocker.onclick = this.btnDockerOnClick;

    let divAzure = div(divSlike, "divAzure");
    let slikaAzure = document.createElement("img");
    slikaAzure.src =
      "https://cdn.techcommunity.microsoft.com/assets/EDU/blog_default_image.png";
    slikaAzure.className = "slikaAzure";
    divAzure.appendChild(slikaAzure);

    let buttonAzure = button(divButton, "btnAzure", "Azure");

    let divHorizon = div(divSlike, "divHorizon");
    let slikaHorizon = document.createElement("img");
    slikaHorizon.src =
      "https://www.cybersylum.com/wp-content/uploads/2021/01/Horizon-View-Logo.png";
    slikaHorizon.className = "slikaHorizon";
    divHorizon.appendChild(slikaHorizon);

    let buttonHorizon = button(divButton, "btnHorizon", "Horizon");

    let divNazad = div(this.kont, "divNazad");
    let buttonNazad = button(divNazad, "btnNazad", "Nazad");
    buttonNazad.onclick = () => window.location.assign("test2.html");
  }

  btnDockerOnClick() {
    const state = getState();
    const { username } = state;

    fetch(backRoutes.dockerUpload, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username }),
    }).then(async (res) => {
      const response = await res.text();
      alert(response);
    });
  }
}
