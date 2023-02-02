export const tipKorisnika = {
  student: "student",
  profesor: "profesor",
  undefined: undefined,
};

const address = "http://localhost:9000";

export const pageRoutes = {
  login: `${address}/Login`,
  dockerAzureHorizon: `${address}/DockerAzureHorizon`,
  resenje: `${address}/Resenje`,
  zadatak: `${address}/Zadatak`,
};

export const backRoutes = {
  studentZadatak: `${address}/student/zadatak`,
  profesorUpload: `${address}/profesor/upload`,
  studentUpload: `${address}/student/upload`,
  login: `${address}/login`,
  dockerUpload: `${address}/dockerUpload`,
};
