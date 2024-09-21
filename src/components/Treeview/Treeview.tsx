import React, { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { TreeNode, TreeviewProps } from "./Treeview.types";

const Treeview: React.FC<TreeviewProps> = ({
  data,
  onSelectionChange,
  customLabel,
  customRenderNode,
}) => {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [openNodeIds, setOpenNodeIds] = useState<Set<string>>(new Set());
  const [searchParams, setSearchParams] = useSearchParams();

  // Load saved selections and open nodes from query or localStorage
  useEffect(() => {
    const savedSelectionsFromQuery = searchParams.get("selectedIds");
    const savedOpenNodesFromQuery = searchParams.get("openNodeIds");

    if (savedSelectionsFromQuery) {
      setSelectedIds(new Set(savedSelectionsFromQuery.split(",")));
    }

    if (savedOpenNodesFromQuery) {
      setOpenNodeIds(new Set(savedOpenNodesFromQuery.split(",")));
    }
  }, [searchParams]);

  // Update query with selected and open IDs
  useEffect(() => {
    setSearchParams({
      selectedIds: [...selectedIds].join(","),
      openNodeIds: [...openNodeIds].join(","),
    });
  }, [selectedIds, openNodeIds, setSearchParams]);

  // Toggle selection for current node and its children
  const toggleSelect = useCallback(
    (id: string, children: TreeNode[] = []) => {
      const newSelectedIds = new Set(selectedIds);

      const selectNode = (nodeId: string, select: boolean) => {
        if (select) {
          newSelectedIds.add(nodeId);
        } else {
          newSelectedIds.delete(nodeId);
        }
      };

      // Toggle current node and its children
      const isSelected = newSelectedIds.has(id);
      selectNode(id, !isSelected);
      children.forEach((child) => selectNode(child.id, !isSelected));

      setSelectedIds(newSelectedIds);
      onSelectionChange([...newSelectedIds]);
    },
    [selectedIds, onSelectionChange]
  );

  // Toggle open/close state
  const toggleOpen = useCallback(
    (id: string) => {
      const newOpenNodeIds = new Set(openNodeIds);
      newOpenNodeIds.has(id)
        ? newOpenNodeIds.delete(id)
        : newOpenNodeIds.add(id);
      setOpenNodeIds(newOpenNodeIds);
    },
    [openNodeIds]
  );

  // Recursive render function
  const renderTreeNodes = (nodes: TreeNode[]) =>
    nodes.map((node) => (
      <div key={node.id} className="text-lg">
        <div className="flex items-center">
          {node.children && node.children?.length !== 0 && (
            <button onClick={() => toggleOpen(node.id)}>
              <i
                className={`bx text-3xl text-gray-600 bx-chevron-${
                  openNodeIds.has(node.id) ? "down" : "right"
                }`}
              />
            </button>
          )}
          <label className={node.children?.length ? "" : "ml-[30px]"}>
            <input
              type="checkbox"
              checked={selectedIds.has(node.id)}
              onChange={() => toggleSelect(node.id, node.children || [])}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-1 mr-1"
            />
            {customLabel ? customLabel(node) : node.label}
          </label>
        </div>
        {node.children && openNodeIds.has(node.id) && (
          <div className="pl-6">
            {customRenderNode
              ? customRenderNode(node)
              : renderTreeNodes(node.children)}
          </div>
        )}
      </div>
    ));

  return <div className="my-4">{renderTreeNodes(data)}</div>;
};

export default Treeview;
