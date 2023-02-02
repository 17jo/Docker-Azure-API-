const tipKorisnika = {
  student: "student",
  profesor: "profesor",
  undefined: undefined,
};

const routes = {
  studentZadatak: `/student/zadatak`,
  profesorUpload: `/profesor/upload`,
  studentUpload: `/student/upload`,
  login: `/login`,
  dockerUpload: "/dockerUpload",
};

const dockerUsers = [
  {
    username: "student1",
    token: "",
    tip: tipKorisnika.student,
  },
  {
    username: "student2",
    token: "",
    tip: tipKorisnika.student,
  },
  {
    username: "student3",
    token: "",
    tip: tipKorisnika.student,
  },
  {
    username: "student4",
    token: "",
    tip: tipKorisnika.student,
  },
  {
    username: "student5",
    token: "",
    tip: tipKorisnika.student,
  },
  {
    username: "root",
    token: "",
    tip: tipKorisnika.profesor,
  },
];

module.exports = {
  tipKorisnika,
  routes,
  dockerUsers,
};
