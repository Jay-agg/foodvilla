import { fireEvent, render, screen } from "@testing-library/react";
import Body from "../Body";
import MOCK_DATA from "../../../mocks/mockResListData.json";
import { act } from "react-dom/test-utils";
import "@testing-library/jest-dom";
import { execPath } from "process";
import { BrowserRouter } from "react-router-dom";
import RestaurantCard from "../RestaurantCard";

global.fetch = jest.fn(() => {
  return Promise.resolve({
    json: () => {
      return Promise.resolve(MOCK_DATA);
    },
  });
});

it("Should render Body Component with search", async () => {
  await act(async () =>
    render(
      <BrowserRouter>
        <Body />
      </BrowserRouter>
    )
  );

  const searchBtn = screen.getByRole("button", { name: "Search" });

  const searchInput = screen.getByTestId("searchInput");

  fireEvent.change(searchInput, { target: { value: "burger" } });

  fireEvent.click(searchBtn);
  const cards = screen.getAllByTestId("resCard");

  expect(cards.length).toBe(1);
});
