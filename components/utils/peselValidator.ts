export default function validatePesel(pesel: string) {
  const peselSplited = pesel.split("").map(Number);
  const multiplers = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];

  const peselToControl = peselSplited.join("");
  console.log(peselToControl);

  let multipledNumbers: number[] = [];

  for (let i = 0; i < peselSplited.length; i++) {
    multipledNumbers.push(peselSplited[i] * multiplers[i]);
  }
  let fixedTwoDigitNumber: any = [];

  for (let i = 0; i < multipledNumbers.length; i++) {
    if (multipledNumbers[i] > 9) {
      fixedTwoDigitNumber.push(multipledNumbers[i].toString().split("").at(-1));
    } else {
      fixedTwoDigitNumber.push(multipledNumbers[i]);
    }
  }
  const redcedNumber = fixedTwoDigitNumber
    .map(Number)
    .reduce((prev: number, curr: number) => prev + curr, 0);

  const controlNumber = 10 - Number(redcedNumber.toString().split("").at(-1));

  const peselAfterCheck = peselToControl.concat(controlNumber.toString());

  if (peselAfterCheck === pesel) {
    console.log("PESEL is valid.");
  } else {
    console.log("PESEL is invalid!!!");
  }
}
// validatePesel("02070803628");
