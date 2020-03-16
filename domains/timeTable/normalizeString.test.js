const { normalizeString } = require("./normalizeString");
const each = require("jest-each").default;

describe("normalizeString", () => {
  each([
    ["é", "e"],
    ["è", "e"],
    ["à", "a"],
    ["Le Vésinet – Centre", "le-vesinet-centre"],
    [" Le Vésinet – Centre ", "le-vesinet-centre"],
    ["Charles de Gaulle–Étoile", "charles-de-gaulle-etoile"],
    ["Noisy-le-Grand – Mont d'Est", "noisy-le-grand-mont-d-est"]
  ]).it("should transform '%s' into '%s'", (input, output) => {
    const result = normalizeString(input);
    expect(result).toEqual(output);
  });
});
