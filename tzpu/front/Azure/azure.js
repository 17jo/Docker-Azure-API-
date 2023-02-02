import { button, div, h1, input } from "./fje.js";
export class Azure {
  constructor() {
    this.kont = null;
  }
  crtaj4(host) {
    this.kont = div(host, "glavni2");

    let btnVM = button(this.kont, "btn", "Kreiraj VM");
    btnVM.onclick = (ev) => this.CreateVm();

    let fileInput = document.createElement("input");
    fileInput.className = "btnFileInput";
    fileInput.type = "file";
    this.kont.appendChild(fileInput);

    let btnShareVM = button(this.kont, "btn", "Podeli VM studentima");
    btnShareVM.onclick = (ev) => ShereVM();

    let btnSeeVMs = button(this.kont, "btn", "Pregledaj kolokvijum");
    btnSeeVMs.onclick = (ev) => SeeResult();

    let btnSRunVM = button(this.kont, "btn", "Run VM");
    btnSRunVM.onclick = (ev) => RunVM();
  }

  CreateVm() {
    alert("kreirano");
    const payload = {
      location: "westus",
      properties: {
        hardwareProfile: {
          vmSize: "Standard_D2_v2",
        },
        storageProfile: {
          imageReference: {
            publisher: "MicrosoftWindowsServer",
            offer: "WindowsServer",
            sku: "2019-Datacenter",
            version: "latest",
          },
          osDisk: {
            createOption: "FromImage",
          },
        },
        osProfile: {
          computerName: "",
          adminUsername: "",
          adminPassword: "",
        },
      },
    };

    const endpoint = `https://management.azure.com/subscriptions/{}/resourceGroups/{}/providers/Microsoft.Compute/virtualMachines/{}?api-version={2022-10-01-preview}`;
    const headers = {
      Authorization: `Bearer ${request.accessToken}`,
      "Content-Type": "application/json",
    };

    fetch(endpoint, {
      method: "PUT",
      headers: headers,
      body: JSON.stringify(payload),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Error creating virtual machine: ${response.statusText}`
          );
        }
        return response.json();
      })
      .then((data) => {
        console.log(`Virtual machine created successfully: ${data.name}`);
      })
      .catch((error) => {
        console.error(`Error creating virtual machine: ${error}`);
      });
  }

  ShereVM() {
    const fileInput = document.querySelector(".btnFileInput");
    const file = fileInput.files[0];
    if (!file) {
      alert("No file was selected");
      return;
    }
    const reader = new FileReader();
    reader.onload = function (e) {
      const fileContent = e.target.result;
      console.log(fileContent);
    };
    reader.readAsText(file);

    const studentList = reader;

    studentList.forEach((student) => {
      const endpoint = `https://management.azure.com/subscriptions/{}/resourceGroups/{mylabrg}/providers/Microsoft.Compute/virtualMachines/{PrviLab}/providers/Microsoft.Authorization/roleAssignments/{}?api-version={2022-10-01-preview}`;

      const payload = {
        properties: {
          roleDefinitionId:
            "/subscriptions/{}/providers/Microsoft.Authorization/roleDefinitions/{Member}",
          principalId: `${student}`,
        },
      };

      const headers = {
        Authorization: `Bearer ${request.accessToken}`,
        "Content-Type": "application/json",
      };

      fetch(endpoint, {
        method: "PUT",
        headers: headers,
        body: JSON.stringify(payload),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(
              `Error sharing virtual machine with student: ${student} - ${response.statusText}`
            );
          }
          return response.json();
        })
        .then((data) => {
          console.log(
            `Virtual machine shared successfully with student: ${student}`
          );
        })
        .catch((error) => {
          console.error(
            `Error sharing virtual machine with student: ${student} - ${error}`
          );
        });
    });
  }

  SeeResult() {
    window.location.href =
      "https://portal.azure.com/#view/HubsExtension/BrowseResourceGroups";
  }

  RunVM() {
    const subscriptionId = "";
    const resourceGroup = "";
    const vmName = "";
    const url = `https://management.azure.com/subscriptions/${subscriptionId}/resourceGroups/${resourceGroup}/providers/Microsoft.Compute/virtualMachines/${vmName}/start?api-version=2019-07-01`;

    const headers = {
      Authorization: `Bearer ${request.accessToken}`,
      "Content-Type": "application/json",
    };

    fetch(url, {
      method: "POST",
      headers: headers,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Failed to start virtual machine: ${response.statusText}`
          );
        }
        return response.json();
      })
      .then((result) => {
        console.log(`Virtual machine started successfully: ${result}`);

        setTimeout((subscriptionId, resourceGroup, vmName) => {
          this.StopVM();
        }, 2 * 60 * 60 * 1000);
      })
      .catch((error) => {
        console.error(`Failed to start virtual machine: ${error}`);
      });
  }

  StopVM(subscriptionId, resourceGroup, vmName) {
    const url = `https://management.azure.com/subscriptions/${subscriptionId}/resourceGroups/${resourceGroup}/providers/Microsoft.Compute/virtualMachines/${vmName}/powerOff?api-version=2019-07-01`;

    const headers = {
      Authorization: `Bearer ${request.accessTokenn}`,
      "Content-Type": "application/json",
    };

    fetch(url, {
      method: "POST",
      headers: headers,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Failed to stop virtual machine: ${response.statusText}`
          );
        }
        return response.json();
      })
      .then((result) => {
        console.log(`Virtual machine stopped successfully: ${result}`);
      })
      .catch((error) => {
        console.error(`Failed to stop virtual machine: ${error}`);
      });
  }
}
