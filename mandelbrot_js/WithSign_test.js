// @ts-check

import { test, assertEquals } from "../../test/deps.js";
import { WithSign } from "./WithSign.js";

test("WithSign", () => {
    assertEquals(WithSign.zero().succ().asBigInt(), 1n)
});
