import { parentPath, pathInTreeNodes } from "./functions";
import { describe, expect, test } from "vitest";
describe("functions", () => {
  describe("parentPath", () => {
    test("top level element", () => {
      expect(parentPath("nodes[0]")).toEqual("nodes");
    });
    test("nested element", () => {
      expect(parentPath("nodes[0].nodes[1]")).toEqual("nodes[0]");
    });
  });

  describe("pathInTreeNodes", () => {
    const root = {
      nodes: [
        {
          value: "a",
          nodes: [
            { value: "a.a", nodes: [], parent: "a" },
            { value: "a.b", nodes: [], parent: "a" },
          ],
          parent: null,
        },
        {
          value: "b",
          nodes: [
            { value: "b.a", nodes: [], parent: "b" },
            { value: "b.b", nodes: [], parent: "b" },
          ],
          parent: null,
        },
      ],
    };
    test("find at top", () => {
      expect(pathInTreeNodes("b", root.nodes)).toEqual("nodes[1]");
    });
    test("find in branch", () => {
      expect(pathInTreeNodes("a.b", root.nodes)).toEqual("nodes[0].nodes[1]");
    });
    test("not found", () => {
      expect(pathInTreeNodes("nothing", root.nodes)).toBeNull();
    });
  });
});
