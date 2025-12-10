import { vi } from "vitest";

vi.mock("bcrypt", () => {
  return {
    default: {
      compare: vi.fn(),
    },
    compare: vi.fn(),
  };
});

vi.mock("jsonwebtoken", () => {
  return {
    default: {
      sign: vi.fn(),
    },
    sign: vi.fn(),
  };
});

vi.mock("../../../../models/User", () => {
  return {
    default: {
      findOne: vi.fn(),
    },
  };
});
