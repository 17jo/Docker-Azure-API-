import { tipKorisnika } from "../../enums.js";
import { getState, setState } from "../state.js";
import { div, h1 } from "../fje.js";
import { pageRoutes } from "../enums.js";
export class Pocetna {
  constructor() {
    this.kont = null;
  }

  crtaj(host) {
    this.kont = div(host, "glavni");

    //PROFESOR
    let profesorDiv = div(this.kont, "profesorDiv");

    let slikaProfesora = document.createElement("img");
    slikaProfesora.src =
      "https://cdn.elearningindustry.com/wp-content/uploads/2019/10/professional-development-tools-for-teachers.jpg";
    slikaProfesora.className = "slikaProfesora";
    profesorDiv.appendChild(slikaProfesora);
    profesorDiv.style.marginRight = "20px";

    //STUDENT
    let studentDiv = div(this.kont, "studentDiv");

    let slikaStudenta = document.createElement("img");
    slikaStudenta.src =
      "https://img.freepik.com/free-photo/front-view-male-student-dark-t-shirt-yellow-backpack-holding-files-books-smiling-light-blue-wall_140725-46715.jpg?w=2000";
    slikaStudenta.className = "slikaProfesora";
    studentDiv.appendChild(slikaStudenta);

    let naslov = h1(host, "h1", "KOLOKVIJUM");

    this.login();
  }

  login() {
    const btnOk = document.getElementById("btnOk");
    btnOk.onclick = () => {
      const input = document.getElementById("a");
      const inputValue = input.value;

      fetch("http://localhost:9000/login", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: inputValue }),
      }).then(async (res) => {
        const response = await res.json();
        const { tip } = response;

        if (tip === tipKorisnika.undefined) {
          alert("Korisnik nije autenifikovan");
          return;
        }

        const route =
          tip === tipKorisnika.profesor
            ? pageRoutes.zadatak
            : pageRoutes.resenje;

        const state = getState();

        setState({ ...state, username: inputValue, tip: tip });
        window.location.href = route;
      });
    };
  }
}
