import { useState } from "react";
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
  {
    label: "Sabzavotlar",
    id: "3",
    children: [
      { label: "Sabzi", id: "3.1" },
      { label: "Kartoshka", id: "3.2" },
      { label: "Piyoz", id: "3.3" },
      { label: "Lavlagi", id: "3.4" },
    ],
  },
];

const TreeviewDemo = () => {
  const [_, setSelected] = useState<string[]>([]);

  const handleSelectionChange = (selectedIds: string[]) => {
    setSelected(selectedIds);
  };

  return (
    <div className="flex flex-col justify-center items-center  mx-auto">
      <h1 className="font-bold text-5xl text-purple-400">Treeview Demo</h1>
      <Treeview
        data={demoData}
        onSelectionChange={handleSelectionChange}
        customLabel={(node) => `${node.label}`}
      />
    </div>
  );
};

export default TreeviewDemo;
