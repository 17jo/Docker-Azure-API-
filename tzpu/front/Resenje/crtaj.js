import { button, div, h1, input } from "../fje.js";
export class StudentStranica {
  constructor() {
    this.kont = null;
    // this.file = null;
    this.studentIndex = null;
  }
  crtaj(host) {
    this.kont = div(host, "glavniStudent");
    // let tekst = this.readTextFile("sample.txt");
    let divPocetni = div(this.kont, "divPocetni", "");
    fetch("http://localhost:9000/student/zadatak").then(async (res) => {
      const tekst = await res.text();
      divPocetni.innerHTML = tekst;
    });

    // const divFileInput = document.createElement("div");
    // this.kont.appendChild(divFileInput);
    // const inputFileInput = document.createElement("input");
    // inputFileInput.type = "file";

    // divFileInput.appendChild(inputFileInput);
    // inputFileInput.style.visibility = "hidden";

    // let dugmeUpload = div(this.kont, "dugmeUpload");
    // let buttonUpload = button(dugmeUpload, "buttonUpload", "Dodaj zadatak...");
    // buttonUpload.onclick = () => {
    //   inputFileInput.click();
    // };

    // divStudentIndex.style.visibility = "hidden";
    // let inputStudentIndex = input(divStudentIndex, "inputStudentIndex");
    // inputStudentIndex.onchange = (e) => {
    //   this.studentIndex = e.target.value;
    // };

    // inputFileInput.onchange = (e) => {
    //   if (e.target.files) {
    //     this.file = e.target.files[0];
    //     divPosaljiZadatak.style.visibility = "visible";
    //     divStudentIndex.style.visibility = "visible";
    //   } else {
    //     alert("Niste odabrali fajl.");
    //     divPosaljiZadatak.visibility = "hidden";
    //     divStudentIndex.style.visibility = "hidden";
    //   }
    // };

    // let divPosaljiZadatak = div(this.kont, "dugmeUpload");
    // divPosaljiZadatak.style.visibility = "hidden";
    // let buttonPosaljiZadatak = button(
    //   divPosaljiZadatak,
    //   "buttonUpload",
    //   "Posalji zadatak"
    // );

    // buttonPosaljiZadatak.onclick = () => {
    //   if (this.studentIndex && this.file) {
    //     const data = new FormData();
    //     data.append("resenje", this.file);
    //     data.append("index", this.studentIndex);

    //     fetch("http://localhost:9000/student/upload", {
    //       method: "post",
    //       headers: {
    //         Accept: "multipart/form-data",
    //       },
    //       body: data,
    //     }).then(async (res) => {
    //       const response = await res.text();
    //       alert(response);
    //     });
    //   } else {
    //     alert("Niste uneli sve podatke");
    //   }
    // };

    let naslov = h1(this.kont, "h1", "Napišite rešenje zadatka");
    let divInput = div(this.kont, "divInput");
    let inputZadatak = document.createElement("textarea");
    divInput.appendChild(inputZadatak);
    inputZadatak.className = "inputZadatka";
    inputZadatak.id = 1;

    let divDugmici = div(this.kont, "dugmici");
    let divButton = div(divDugmici, "divButton");
    let buttonZadatak = button(divButton, "buttonUpload", "Pošalji zadatak");
    buttonZadatak.onclick = () => {
      let text = inputZadatak.value;
      fetch("http://localhost:9000/student/upload", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ index: this.studentIndex, resenje: text }),
      }).then(async (res) => {
        const response = await res.text();
        alert(response);
      });
    };

    //     data.append("resenje", this.file);
    //     data.append("index", this.studentIndex);
  }

  readTextFile(file) {
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    var allText;
    rawFile.onreadystatechange = function () {
      if (rawFile.readyState === 4) {
        if (rawFile.status === 200 || rawFile.status == 0) {
          allText = rawFile.responseText;
        }
      }
    };
    rawFile.send(null);
    return allText;
  }
}
