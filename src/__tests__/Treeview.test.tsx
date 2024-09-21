import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";
import Treeview from "../components/Treeview/Treeview";
import { TreeNode } from "../components/Treeview/Treeview.types";

const demoData: TreeNode[] = [
  {
    label: "Mevalar",
    id: "1",
    children: [
      { label: "Olma", id: "1.1" },
      { label: "Banan", id: "1.2" },
    ],
  },
  {
    label: "Poliz ekinlari",
    id: "2",
    children: [
      { label: "Tarvuz", id: "2.1" },
      { label: "Qovun", id: "2.2" },
    ],
  },
];

describe("Treeview Component", () => {
  test("renders the tree correctly", () => {
    render(
      <MemoryRouter>
        <Treeview
          data={demoData}
          onSelectionChange={() => {}}
          customLabel={(node) => node.label}
        />
      </MemoryRouter>
    );

    // Check if the top-level nodes are rendered
    expect(screen.getByText("Mevalar")).toBeInTheDocument();
    expect(screen.getByText("Poliz ekinlari")).toBeInTheDocument();
  });

  test("toggles node open/close on button click", () => {
    render(
      <MemoryRouter>
        <Treeview
          data={demoData}
          onSelectionChange={() => {}}
          customLabel={(node) => node.label}
        />
      </MemoryRouter>
    );

    // Ensure children are hidden initially
    expect(screen.queryByText("Olma")).not.toBeInTheDocument();
    expect(screen.queryByText("Tarvuz")).not.toBeInTheDocument();

    // Simulate click to open node
    const toggleButton = screen.getAllByRole("button")[0];
    fireEvent.click(toggleButton);

    // Children should now be visible
    expect(screen.getByText("Olma")).toBeInTheDocument();
    expect(screen.getByText("Banan")).toBeInTheDocument();
  });

  test("selects and deselects nodes correctly", () => {
    const onSelectionChange = vi.fn();
    render(
      <MemoryRouter>
        <Treeview
          data={demoData}
          onSelectionChange={onSelectionChange}
          customLabel={(node) => node.label}
        />
      </MemoryRouter>
    );

    // Simulate selecting a node
    const checkbox = screen.getAllByRole("checkbox")[0];
    fireEvent.click(checkbox);

    // Expect the onSelectionChange to have been called with the correct id
    expect(onSelectionChange).toHaveBeenCalledWith(
      expect.arrayContaining(["1"])
    );
  });
});
