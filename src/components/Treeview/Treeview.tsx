import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleOpen, toggleSelect } from "../../redux/treeviewSlice";
import { TreeNode } from "./Treeview.types";

interface TreeviewProps {
  data: TreeNode[];
}

const Treeview: React.FC<TreeviewProps> = ({ data }) => {
  const dispatch = useDispatch();
  const selectedIds = useSelector((state: any) => state.treeview.selectedIds);
  const openNodeIds = useSelector((state: any) => state.treeview.openNodeIds);

  const renderTree = (nodes: TreeNode[]) => {
    return nodes.map((node) => {
      const isOpen = openNodeIds.includes(node.id);
      const isChecked = selectedIds.includes(node.id);

      return (
        <div key={node.id} className="pl-4 border-l border-gray-300">

          <div className="flex items-center space-x-2 py-1 hover:bg-gray-50 rounded transition">
            {node.children && node.children.length !== 0 && (
              <button
                onClick={() => dispatch(toggleOpen(node.id))}
                className="focus:outline-none text-gray-600 hover:text-gray-900"
              >
                <i
                  className={`bx bx-chevron-${
                    isOpen ? "down" : "right"
                  } text-xl`}
                />
              </button>
            )}

            <label className={`flex items-center space-x-2 ${node.children?.length ? "" : "ml-7"}`}>
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => dispatch(toggleSelect({ id: node.id, data }))}
                className="h-4 w-4 text-blue-600 focus:ring-2 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="text-gray-800 hover:text-blue-600 transition font-medium">
                {node.label}
              </span>
            </label>
          </div>

          {isOpen && node.children && (
            <div className="pl-4">{renderTree(node.children)}</div>
          )}
        </div>
      );
    });
  };

  return <div className="max-w-lg mx-auto p-4 bg-white shadow-md rounded-md">{renderTree(data)}</div>;
};

export default Treeview;
