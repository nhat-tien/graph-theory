import { Node } from "@vue-flow/core";
import { ref } from "vue";
import { defineStore } from "pinia";


const useAddEdgeStore = defineStore("add-edge", () => {
  const isMarkDisplay = ref(false);
  const sourceNode = ref<Node | null>(null);
  const targetNode = ref<Node | null>(null);

  function call(node: Node): number {
    if(sourceNode.value != null && targetNode.value != null) {
      return 1;
    }
    if(sourceNode.value == null) {
      sourceNode.value = node;
      isMarkDisplay.value = true;
      return 0;
    };
    targetNode.value = node;
    return 1;
  }

  function reset() {
    sourceNode.value = null;
    targetNode.value = null;
    isMarkDisplay.value = false;
  }

  return {
    isMarkDisplay,
    sourceNode,
    targetNode,
    reset,
    call,
  }
})

export default useAddEdgeStore
