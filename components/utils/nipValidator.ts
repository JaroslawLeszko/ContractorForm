export default function validateNip(nip: string) {
  const nipSplited = nip.split("").map(Number);
  const multiplers = [6, 5, 7, 2, 3, 4, 5, 6, 7];

  nipSplited.pop();

  const nipToControl = nipSplited.join("");

  const multipledNumbers: number[] = [];

  for (let i = 0; i < nipSplited.length; i++) {
    multipledNumbers.push(nipSplited[i] * multiplers[i]);
  }

  const reducedNumber = multipledNumbers.reduce(
    (prev: number, curr: number) => prev + curr,
    0
  );

  const controlNumber = reducedNumber % 11;

  const nipAfterCheck = nipToControl.concat(controlNumber.toString());

  if (nipAfterCheck === nip) {
    return true;
  } else {
    return false;
  }
}
