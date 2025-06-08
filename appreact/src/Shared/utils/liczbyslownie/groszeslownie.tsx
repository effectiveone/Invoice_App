import {
  grupy,
  setki,
  dziesiatki,
  nascie,
  jednosci,
} from "./odmianadziesiatek";

export function groszeSlownie(liczba) {
  const licznik = liczba != null ? liczba.toFixed(2) : null;
  let [zloteRaw, groszeRaw] = licznik.toString().split(".");
  let zlote = parseInt(zloteRaw);
  let grosze = parseInt(groszeRaw || "0");

  if (isNaN(zlote) || isNaN(grosze)) {
    return "Niepoprawna wartość";
  }

  let wynik = "";
  /* eslint-disable-next-line no-unused-vars */
  let znak = "";
  if (zlote === 0 && grosze === 0) {
    wynik = "zero złotych";
  }
  if (zlote < 0) {
    /* eslint-disable-next-line no-unused-vars */
    znak = "minus";
    zlote = -zlote;
  }

  let g = 0;
  while (zlote > 0) {
    let s = Math.floor((zlote % 1000) / 100);
    let n = 0;
    let d = Math.floor((zlote % 100) / 10);
    let j = Math.floor(zlote % 10);

    if (d === 1 && j > 0) {
      n = j;
      d = 0;
      j = 0;
    }

    let k = 2;
    if (j === 1 && s + d + n === 0) {
      k = 0;
    }
    if (j === 2 || j === 3 || j === 4) {
      k = 1;
    }
    if (s + d + n + j > 0) {
      wynik =
        setki[s] +
        dziesiatki[d] +
        nascie[n] +
        jednosci[j] +
        grupy[g][k] +
        wynik;
    }

    g++;
    zlote = Math.floor(zlote / 1000);
  }

  return wynik;
}
