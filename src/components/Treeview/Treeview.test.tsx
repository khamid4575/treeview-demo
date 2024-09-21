import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { vi } from "vitest";
import { toggleOpen, toggleSelect } from "../../redux/treeviewSlice";
import Treeview from "./Treeview";
import { TreeNode } from "./Treeview.types";

const mockStore = configureStore([]);

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

describe("Treeview component", () => {
  let store: any;

  beforeEach(() => {
    store = mockStore({
      treeview: {
        selectedIds: [],
        openNodeIds: [],
      },
    });

    // Mocking store.dispatch
    store.dispatch = vi.fn();
  });

  it("renders tree nodes correctly", () => {
    render(
      <Provider store={store}>
        <Treeview data={demoData} />
      </Provider>
    );
    expect(screen.getByText("Mevalar")).toBeInTheDocument();
    expect(screen.getByText("Poliz ekinlari")).toBeInTheDocument();
  });

  it("toggles node open state", () => {
    render(
      <Provider store={store}>
        <Treeview data={demoData} />
      </Provider>
    );
    const toggleButton = screen.getAllByRole("button")[0];
    fireEvent.click(toggleButton);
    expect(store.dispatch).toHaveBeenCalledWith(toggleOpen("1"));
  });

  it("checks parent and child nodes when parent is checked", () => {
    render(
      <Provider store={store}>
        <Treeview data={demoData} />
      </Provider>
    );

    const parentCheckbox = screen.getByLabelText("Mevalar");
    fireEvent.click(parentCheckbox);

    // Expect a single dispatch for the parent node
    expect(store.dispatch).toHaveBeenCalledWith(
      toggleSelect({ id: "1", data: demoData })
    );

    // You could add further checks if the selection of children is handled in the reducer.
  });

  it("toggles checkbox select state", () => {
    render(
      <Provider store={store}>
        <Treeview data={demoData} />
      </Provider>
    );
    const checkbox = screen.getAllByRole("checkbox")[0];
    fireEvent.click(checkbox);
    expect(store.dispatch).toHaveBeenCalledWith(
      toggleSelect({ id: "1", data: demoData })
    );
  });

  it("displays children when node is open", () => {
    store = mockStore({
      treeview: {
        selectedIds: [],
        openNodeIds: ["1"],
      },
    });
    render(
      <Provider store={store}>
        <Treeview data={demoData} />
      </Provider>
    );
    expect(screen.getByText("Olma")).toBeInTheDocument();
    expect(screen.getByText("Banan")).toBeInTheDocument();
  });
});
