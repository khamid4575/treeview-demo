import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TreeNode } from "../components/Treeview/Treeview.types";

interface TreeviewState {
  selectedIds: string[];
  openNodeIds: string[];
}

const safeParse = (jsonString: string | null, defaultValue: any) => {
  try {
    return jsonString ? JSON.parse(jsonString) : defaultValue;
  } catch (e) {
    return defaultValue;
  }
};

const initialState: TreeviewState = {
  selectedIds: safeParse(localStorage.getItem("selectedIds"), []),
  openNodeIds: safeParse(localStorage.getItem("openNodeIds"), []),
};

const findAllChildIds = (node: TreeNode): string[] => {
  let ids = [node.id];
  if (node.children) {
    node.children.forEach((child) => {
      ids = ids.concat(findAllChildIds(child));
    });
  }
  return ids;
};

const treeviewSlice = createSlice({
  name: "treeview",
  initialState,
  reducers: {
    toggleOpen: (state, action: PayloadAction<string>) => {
      const nodeId = action.payload;
      if (state.openNodeIds.includes(nodeId)) {
        state.openNodeIds = state.openNodeIds.filter(id => id !== nodeId);
      } else {
        state.openNodeIds.push(nodeId);
      }
      localStorage.setItem("openNodeIds", JSON.stringify(state.openNodeIds));
    },
    toggleSelect: (state, action: PayloadAction<{ id: string, data: TreeNode[] }>) => {
      const { id, data } = action.payload;

      const findNodeById = (id: string, nodes: TreeNode[]): TreeNode | undefined => {
        for (const node of nodes) {
          if (node.id === id) return node;
          if (node.children) {
            const childNode = findNodeById(id, node.children);
            if (childNode) return childNode;
          }
        }
        return undefined;
      };

      const node = findNodeById(id, data);
      if (node) {
        const allChildIds = findAllChildIds(node);
        const isParentSelected = state.selectedIds.includes(id);

        if (isParentSelected) {
          // Uncheck parent and all child nodes
          state.selectedIds = state.selectedIds.filter(id => !allChildIds.includes(id));
        } else {
          // Check parent and all child nodes
          state.selectedIds = [...new Set([...state.selectedIds, ...allChildIds])];
        }
        localStorage.setItem("selectedIds", JSON.stringify(state.selectedIds));
      }
    }
  }
});

export const { toggleOpen, toggleSelect } = treeviewSlice.actions;
export default treeviewSlice.reducer;
