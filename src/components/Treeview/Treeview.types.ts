export interface TreeNode {
    label: string;
    id: string;
    children?: TreeNode[];
  }
  
  export interface TreeviewProps {
    data: TreeNode[];
    onSelectionChange: (selectedIds: string[]) => void;
    customLabel?: (node: TreeNode) => string;
    customRenderNode?: (node: TreeNode) => JSX.Element;
  }
  