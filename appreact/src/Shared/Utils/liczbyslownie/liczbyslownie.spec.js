import { liczbySlownie } from "./liczbyslownie";

describe("liczbySlownie", () => {
  test("konwertuje poprawnie liczby całkowite do 999", () => {
    expect(liczbySlownie(0)).toMatchSnapshot();
    expect(liczbySlownie(5)).toMatchSnapshot();
    expect(liczbySlownie(10)).toMatchSnapshot();
    expect(liczbySlownie(11)).toMatchSnapshot();
    expect(liczbySlownie(15)).toMatchSnapshot();
    expect(liczbySlownie(20)).toMatchSnapshot();
    expect(liczbySlownie(25)).toMatchSnapshot();
    expect(liczbySlownie(99)).toMatchSnapshot();
    expect(liczbySlownie(100)).toMatchSnapshot();
    expect(liczbySlownie(123)).toMatchSnapshot();
    expect(liczbySlownie(999)).toMatchSnapshot();
  });

  test("konwertuje poprawnie liczby całkowite do 999", () => {
    expect(liczbySlownie(0)).toBe("zero złotych");
    expect(liczbySlownie(5)).toBe("pięć złotych");
    expect(liczbySlownie(10)).toBe("dziesięć złotych");
    expect(liczbySlownie(11)).toBe("jedenaście złotych");
    expect(liczbySlownie(15)).toBe("piętnaście złotych");
    expect(liczbySlownie(20)).toBe("dwadzieścia złotych");
    expect(liczbySlownie(25)).toBe("dwadzieścia pięć złotych");
    expect(liczbySlownie(99)).toBe("dziewięćdziesiąt dziewięć złotych");
    expect(liczbySlownie(100)).toBe("sto złotych");
    expect(liczbySlownie(123)).toBe("sto dwadzieścia trzy złote");
    expect(liczbySlownie(999)).toBe(
      "dziewięćset dziewięćdziesiąt dziewięć złotych"
    );
  });

  test("konwertuje poprawnie liczby powyżej 999", () => {
    expect(liczbySlownie(1000)).toBe("jeden tysiąc złotych");
    expect(liczbySlownie(1500)).toBe("jeden tysiąc pięćset złotych");
    expect(liczbySlownie(2000)).toBe("dwa tysiące złotych");
    expect(liczbySlownie(2500)).toBe("dwa tysiące pięćset złotych");
    expect(liczbySlownie(9999)).toBe(
      "dziewięć tysięcy dziewięćset dziewięćdziesiąt dziewięć złotych"
    );
    expect(liczbySlownie(10000)).toBe("dziesięć tysięcy złotych");
    expect(liczbySlownie(10001)).toBe("dziesięć tysięcy jeden złoty");
    expect(liczbySlownie(10100)).toBe("dziesięć tysięcy sto złotych");
    expect(liczbySlownie(99999)).toBe(
      "dziewięćdziesiąt dziewięć tysięcy dziewięćset dziewięćdziesiąt dziewięć złotych"
    );
    expect(liczbySlownie(100000)).toBe("sto tysięcy złotych");
    expect(liczbySlownie(100001)).toBe("sto tysięcy jeden złoty");
    expect(liczbySlownie(101000)).toBe("sto jeden tysięcy złotych");
    expect(liczbySlownie(110000)).toBe("sto dziesięć tysięcy złotych");
    expect(liczbySlownie(200000)).toBe("dwieście tysięcy złotych");
    expect(liczbySlownie(300000)).toBe("trzysta tysięcy złotych");
    expect(liczbySlownie(400000)).toBe("czterysta tysięcy złotych");
    expect(liczbySlownie(500000)).toBe("pięćset tysięcy złotych");
    expect(liczbySlownie(600000)).toBe("sześćset tysięcy złotych");
    expect(liczbySlownie(700000)).toBe("siedemset tysięcy złotych");
    expect(liczbySlownie(800000)).toBe("osiemset tysięcy złotych");
    expect(liczbySlownie(900000)).toBe("dziewięćset tysięcy złotych");
    expect(liczbySlownie(1000000)).toBe("jeden milion złotych");
    expect(liczbySlownie(1000000000)).toBe("jeden miliard złotych");
    expect(liczbySlownie(2000000000)).toBe("dwa miliardy złotych");
  });
});

// testy dla groszy
describe("liczbySlownie dla groszy", () => {
  test("konwertuje poprawnie liczby z groszami", () => {
    expect(liczbySlownie(0.01)).toBe("jeden grosz");
    expect(liczbySlownie(0.05)).toBe("pięć groszy");
    expect(liczbySlownie(0.1)).toBe("dziesięć groszy");
    expect(liczbySlownie(0.11)).toBe("jedenaście groszy");
    expect(liczbySlownie(0.15)).toBe("piętnaście groszy");
    expect(liczbySlownie(0.2)).toBe("dwadzieścia groszy");
    expect(liczbySlownie(0.25)).toBe("dwadzieścia pięć groszy");
    expect(liczbySlownie(0.34)).toBe("trzydzieści cztery grosze");
    expect(liczbySlownie(0.99)).toBe("dziewięćdziesiąt dziewięć groszy");
  });
});
