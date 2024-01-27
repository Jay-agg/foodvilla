import { render, screen } from "@testing-library/react";
import Contact from "../Contact";
import "@testing-library/jest-dom";

const { constrainedMemory } = require("process");

test("Should Load Contact Us Component", () => {
  render(<Contact />);

  const heading = screen.getByText("Contact us");

  expect(heading).toBeInTheDocument();
});

test("Should Load Button", () => {
  render(<Contact />);

  const button = screen.getByRole("button");

  expect(button).toBeInTheDocument();
});
