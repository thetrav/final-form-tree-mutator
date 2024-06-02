import { MutableState, GetIn, ChangeValue } from "final-form";
import { parentPath, pathInTreeNodes, TreeNode } from "./functions";

export function reParent<T>(
  [name, dstParentValue]: string[],
  state: MutableState<T, Partial<T>>,
  {
    getIn,
    changeValue,
  }: {
    getIn: GetIn;
    changeValue: ChangeValue<T, Partial<T>>;
  }
) {
  const values = state.formState.values as { nodes: TreeNode[] };
  const node: TreeNode = getIn(values, name);
  const srcParentName = parentPath(name);
  const dstParentName = pathInTreeNodes(dstParentValue, values.nodes);
  if (dstParentName != null && srcParentName != null) {
    const dstParent: TreeNode = getIn(values, dstParentName);
    changeValue(state, `${srcParentName}.nodes`, (nodes: TreeNode[]) =>
      nodes.filter((n) => n.value != node.value)
    );
    changeValue(state, `${dstParentName}.nodes`, (nodes) => [
      ...nodes,
      { ...node, parent: dstParent.value },
    ]);
  }
}
