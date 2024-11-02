import { Node } from "@vue-flow/core";
import { ref } from "vue"

export default function useAddEdge() {
  const isMarkDisplay = ref(false);
  const sourceNode = ref<Node | null>(null);
  const targetNode = ref<Node | null>(null);

  function setNode(node: Node) {
    if(sourceNode.value == null) {
      sourceNode.value = node;
      return;
    };
    targetNode.value = node;
  }
  function reset() {
    sourceNode.value = null;
    targetNode.value = null;
  }

  return {
    isMarkDisplay,
    sourceNode,
    targetNode,
    reset
  }
}
