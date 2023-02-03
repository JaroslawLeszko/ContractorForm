import { it, expect } from "@jest/globals";

import validateNip from "./nipValidator";

it("should return false if incorrect NIP number is provided", () => {
  const testNIP = "1234567890";

  const validationFn = validateNip(testNIP);

  expect(validationFn).toBe(false);
});

it("should return true if correct NIP number is provided", () => {
  const testNIP = "1234563218";

  const validationFn = validateNip(testNIP);

  expect(validationFn).toBe(true);
});
