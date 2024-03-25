import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import axiosInstance from "../../utils/axios";
import MockAdapter from "axios-mock-adapter";
import Home from ".";

const mock = new MockAdapter(axiosInstance);

const mockData = [
  {
    name: "Group 1",
    tasks: [
      { description: "Task 1", checked: false, value: 25 },
      { description: "Task 2", checked: true, value: 25 },
    ],
  },
  {
    name: "Group 2",
    tasks: [{ description: "Task 3", checked: false, value: 50 }],
  },
];

describe("Home", () => {
  beforeEach(() => {
    mock
      .onGet(
        "https://gist.githubusercontent.com/huvber/ba0d534f68e34f1be86d7fe7eff92c96/raw/98a91477905ea518222a6d88dd8b475328a632d3/mock-progress"
      )
      .reply(200, mockData);
  });

  it("renders loading state initially", async () => {
    render(<Home />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
    await waitFor(() => expect(screen.queryByText("Loading...")).toBeNull());
  });

  it("renders error state if data fetching fails", async () => {
    mock
      .onGet(
        "https://gist.githubusercontent.com/huvber/ba0d534f68e34f1be86d7fe7eff92c96/raw/98a91477905ea518222a6d88dd8b475328a632d3/mock-progress"
      )
      .reply(500);
    render(<Home />);
    expect(await screen.findByText("Something went Wrong")).toBeInTheDocument();
  });

  it("renders fetched data correctly", async () => {
    render(<Home />);
    await waitFor(() =>
      expect(screen.getByText("Group 1")).toBeInTheDocument()
    );
    expect(screen.getByText("Group 2")).toBeInTheDocument();
  });

  it("allows checking and unchecking tasks and updates linear progress bar accordingly", async () => {
    render(<Home />);
    await waitFor(() =>
      expect(screen.getByText("Group 1")).toBeInTheDocument()
    );

    const checkbox = screen.getByLabelText("Task 1");
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
    const progressBar = screen.getByRole("progressbar", {
      name: "Whole Tasks Progress",
    });
    expect(progressBar).toHaveAttribute("aria-valuenow", "50");
    fireEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
    expect(progressBar).toHaveAttribute("aria-valuenow", "25");
  });

  it("toggles group task collapse", async () => {
    render(<Home />);
    await waitFor(() =>
      expect(screen.getByText("Group 1")).toBeInTheDocument()
    );

    fireEvent.click(screen.getByText("Group 1"));
    expect(screen.getByText("Task 1")).toBeInTheDocument();
    fireEvent.click(screen.getByText("Group 1"));
    await waitFor(() => expect(screen.queryByText("Task 1")).not.toBeVisible());
  });

  it("changes group name color when all sub-tasks are checked", async () => {
    render(<Home />);
    await waitFor(() =>
      expect(screen.getByText("Group 1")).toBeInTheDocument()
    );
    const groupName = screen.getByText("Group 1");
    expect(groupName).toHaveStyle({ color: "#333333" });
    fireEvent.click(screen.getByText("Group 1"));
    fireEvent.click(screen.getByText("Task 1"));

    await waitFor(() => {
      expect(groupName).toHaveStyle({ color: "#02bc9c" });
    });
    fireEvent.click(screen.getByText("Task 2"));
    await waitFor(() => {
      expect(groupName).toHaveStyle({ color: "#333333" });
    });
  });

  it("verifies linear progress bar and ensures accessibility of linear progress bar", async () => {
    render(<Home />);
    await waitFor(() =>
      expect(screen.getByText("Group 1")).toBeInTheDocument()
    );
    const progressBar = screen.getByRole("progressbar", {
      name: "Whole Tasks Progress",
    });
    expect(progressBar).toHaveAttribute("aria-valuenow", "25");
    expect(progressBar).toHaveAttribute("aria-valuemin", "0");
    expect(progressBar).toHaveAttribute("aria-valuemax", "100");
    expect(progressBar).toHaveAttribute("aria-describedby");
    expect(progressBar).toHaveAccessibleName();
  });

  it("allows navigating between grouped tasks using arrow keys", async () => {
    render(<Home />);
    await screen.findByText("Group 1");
    const group1 = screen.getByTestId("group-task-0");
    group1.focus();
    fireEvent.keyDown(group1, { key: "ArrowDown" });
    expect(screen.getByTestId("group-task-1")).toHaveFocus();
    fireEvent.keyDown(screen.getByTestId("group-task-1"), { key: "ArrowUp" });
    expect(group1).toHaveFocus();
    fireEvent.keyDown(group1, { key: "Enter" });
    expect(screen.getByText("Task 1")).toBeInTheDocument();
    fireEvent.keyDown(group1, { key: " " });
    await waitFor(() => expect(screen.queryByText("Task 1")).toBeVisible());
  });

  it("handles edge cases and empty data", async () => {
    mock
      .onGet(
        "https://gist.githubusercontent.com/huvber/ba0d534f68e34f1be86d7fe7eff92c96/raw/98a91477905ea518222a6d88dd8b475328a632d3/mock-progress"
      )
      .reply(200, []);
    render(<Home />);
    await waitFor(() =>
      expect(screen.getByText("No Tasks")).toBeInTheDocument()
    );
  });
});
