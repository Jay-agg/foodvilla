import { fireEvent, render, screen } from "@testing-library/react";
import Body from "../Body";
import MOCK_DATA from "../../../mocks/mockResListData.json";
import { act } from "react-dom/test-utils";
import "@testing-library/jest-dom";
import { execPath } from "process";

global.fetch = jest.fn(() => {
  return Promise.resolve({
    json: () => {
      return Promise.resolve(data);
    },
  });
});

it("Should render Body Component with search", async () => {
  await act(async () => render(<Body />));

  const searchBtn = screen.getByRole("button", { name: "Search" });

  expect(searchBtn).toBeInTheDocument();
});
