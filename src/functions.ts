export type TreeNode = {
  value: string;
  parent: string | null;
  nodes: TreeNode[];
};

export function parentPath(path: string) {
  return path.replace(/\[\d+]$/, "").replace(/\.nodes/, "");
}

export function pathInTreeNodes(
  value: string,
  nodes: TreeNode[],
  path: string = "nodes"
): string | null {
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    const pos = `${path}[${i}]`;
    if (node.value == value) {
      return pos;
    }
    const inChild = pathInTreeNodes(value, node.nodes, `${pos}.nodes`);
    if (inChild) {
      return inChild;
    }
  }
  return null;
}

export function findInTree(value: string, nodes: TreeNode[]): TreeNode | null {
  for (const n of nodes) {
    if (n.value == value) {
      return n;
    }
    const f = findInTree(value, n.nodes);
    if (f) {
      return f;
    }
  }
  return null;
}
