export class Horizon {
  constructor(ime, sifra, studenti) {
    this.kontejner = null;
    this.studenti = studenti;
    this.ime = ime;
    this.sifra = sifra;
    this.vms = null;
    this.workspaces = null;
  }
  //Autentifikacija i dobavljanje tokena za pristup Horizon API-ju
  authenticate() {
    const horizon = require("@horizon/client");
    const horizonServer = horizon("https://your-horizon-instance.com");
    horizonServer.auth.login({ token: getAuthToken(this.ime, this.password) });
    return true;
  }
  crtaj(host) {
    //authenticate();
    this.kontejner = document.createElement("div");
    this.kontejner.className = "Glavni";
    host.appendChild(this.kontejner);

    let naslov = document.createElement("h1");
    naslov.className = "naslov";
    naslov.innerHTML = "HORIZON";
    this.kontejner.appendChild(naslov);

    let mini = document.createElement("div");
    mini.className = "mini";
    this.kontejner.appendChild(mini);

    //kreiranje virtuelne masine
    let div = document.createElement("div");
    div.className = "divZad";
    mini.appendChild(div);
    let labela = document.createElement("label");
    labela.innerHTML =
      "Ovde mozete da kreirate virtuelnu radnu površinu na kojoj će biti zadatak koji studenti trebaju da urade za 60min.";
    div.appendChild(labela);

    let divBtn = document.createElement("div");
    div.appendChild(divBtn);
    let btnZadatak = document.createElement("button");
    btnZadatak.innerHTML = "Kreiraj zadatak";
    btnZadatak.onclick = (ev) => this.kreirajVirtuelneMasine();
    divBtn.appendChild(btnZadatak);

    //pregledaj radove
    div = document.createElement("div");
    div.className = "divZad";
    mini.appendChild(div);
    labela = document.createElement("label");
    labela.innerHTML = "Pregledaj radove studenta.";
    div.appendChild(labela);

    divBtn = document.createElement("div");
    div.appendChild(divBtn);
    btnZadatak = document.createElement("button");
    btnZadatak.innerHTML = "Pregledaj";
    btnZadatak.onclick = (ev) => this.pregledajRadove();
    divBtn.appendChild(btnZadatak);
  }

  kreirajVirtuelneMasine() {
    const AWS = require("aws-sdk");
    const workspaces = new AWS.WorkSpaces();
    this.workspaces = workspaces;

    this.studenti.forEach((studentId) => {
      createWorkspace(studentId);
    });
  }

  createWorkspace(studentID) {
    const params = {
      DirectoryId: "your-directory-id",
      UserName: "student" + studentID,
      BundleId: "your-bundle-id",
      WorkspaceProperties: {
        RunningMode: "AUTO_STOP",
        RunningModeAutoStopTimeoutInMinutes: 60,
      },
    };
    this.workspaces.createWorkspaces(params, function (err, data) {
      if (err) console.error(err);
      else console.log(`Virtuelna masina je kreirana.`);
    });
  }
  pregledajRadove() {
    const AWS = require("aws-sdk");
    const workspaces = new AWS.WorkSpaces();
    const params = {
      DirectoryId: "your-directory-id",
    };
    workspaces.describeWorkspaces(params, function (err, data) {
      if (err) console.error(err);
      else {
        const studentWorkspaces = data.Workspaces.filter((workspace) => {
          return workspace.UserName.startsWith("student");
        });
        console.log("Virtuelne masine studenata:", studentWorkspaces);
      }
    });
  }
}
