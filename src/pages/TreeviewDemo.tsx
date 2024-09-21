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

const TreeviewDemo = () => {
  return (
    <div>
      <h1 className="text-5xl text-purple-400 font-bold text-center mb-5">Treeview Demo</h1>
      <Treeview data={demoData} />
    </div>
  );
};

export default TreeviewDemo;
