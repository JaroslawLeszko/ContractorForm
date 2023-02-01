export default function validatePesel(pesel: string) {
  const peselSplited = pesel.split("").map(Number);
  const multiplers = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];

  peselSplited.pop();

  const peselToControl = peselSplited.join("");

  const multipledNumbers: number[] = [];

  for (let i = 0; i < peselSplited.length; i++) {
    multipledNumbers.push(peselSplited[i] * multiplers[i]);
  }

  const fixedTwoDigitNumber: number[] = [];

  for (let i = 0; i < multipledNumbers.length; i++) {
    if (multipledNumbers[i] > 9) {
      fixedTwoDigitNumber.push(
        Number(multipledNumbers[i].toString().slice(-1))
      );
    } else {
      fixedTwoDigitNumber.push(multipledNumbers[i]);
    }
  }
  const redcedNumber = fixedTwoDigitNumber.reduce(
    (prev: number, curr: number) => prev + curr,
    0
  );

  const controlNumber = 10 - Number(redcedNumber.toString().slice(-1));

  const peselAfterCheck = peselToControl.concat(controlNumber.toString());

  if (peselAfterCheck === pesel) {
    return true;
  } else {
    return false;
  }
}

