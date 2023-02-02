export class HorizonStudent {
  constructor(idStudenta, DirectoryId) {
    this.idStudenta = idStudenta;
    this.DirectoryId = DirectoryId;
  }
  zadatak() {
    const AWS = require("aws-sdk");
    const workSpaces = new AWS.WorkSpaces();

    const params = {
      DirectoryId: this.DirectoryId,
      UserName: this.idStudenta,
    };

    workSpaces.describeWorkspaces(params, function (err, data) {
      if (err) console.error(err);
      else console.log("Virtuelna masina:", data);
    });
  }
}
