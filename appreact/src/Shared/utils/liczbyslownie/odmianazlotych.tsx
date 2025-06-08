export function odmianaZlotych(zlote) {
  let nominal;

  if (zlote % 10 === 1 && zlote % 100 !== 11) {
    nominal = "złoty";
  } else if (
    zlote % 10 >= 2 &&
    zlote % 10 <= 4 &&
    !(zlote % 100 >= 12 && zlote % 100 <= 14)
  ) {
    nominal = "złote";
  } else {
    nominal = "złotych";
  }

  return `${nominal}`;
}
