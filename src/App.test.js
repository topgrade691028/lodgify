import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders Home", () => {
  render(<App />);
  const homeElement = screen.getByText("Lodgify Grouped Tasks");
  expect(homeElement).toBeInTheDocument();
});
