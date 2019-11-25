export const createEmail = (name, enrollment) => {
  const names = name.split(" ");
  let letters = "";
  names.forEach((name, index) => (letters += name[0]));
  return `${letters + enrollment}@udelasallebajio.edu.mx`;
};
