import { Edge, Node, MarkerType} from "@vue-flow/core";
import { defineStore } from "pinia";
import { ref, toRaw, Ref, computed } from "vue";

const useGraphStore = defineStore('vue-flow', () => {

  const nodes: Ref<Node[]> = ref([
    {
      id: "1",
      type: "custom",
      position: { x: 250, y: 5 },
      data: { label: "1" },
    },
    {
      id: "2",
      type: "custom",
      position: { x: 50, y: 250 },
      data: { label: "2" },
    },
    {
      id: "3",
      type: "custom",
      position: { x: 300, y: 250},
      data: { label: "3" },
    },
  ]);

  const edges: Ref<Edge[]> = ref([
    {
      id: "e1->2",
      source: "1",
      target: "2",
      data: {
        text: "2"
      },
      type: "custom",
      markerEnd: MarkerType.ArrowClosed,
    },
    {
      id: "e1->3",
      source: "1",
      target: "3",
      data: {
        text: "10"
      },
      type: "custom",
      markerEnd: MarkerType.ArrowClosed,
    },
    {
      id: "e2->3",
      source: "2",
      target: "3",
      data: {
        text: "100"
      },
      type: "custom",
      markerEnd: MarkerType.ArrowClosed,
    },
  ]);

  const numOfNodes = computed(() => nodes.value.length);


  function updateNodePosition(id: string, x: number, y: number) {
    nodes.value = nodes.value.map((node) => {
      if(node.id == id) {
        return {
          ...toRaw(node),
          position: {
            x: x,
            y: y,
          }
        }
      } else {
        return toRaw(node);
      }
    })
  }

  function addNode(x: number, y: number) {
    nodes.value.push({
      id: (numOfNodes.value + 1).toString(),
      type: "custom",
      position: { x: x, y: y },
      data: { label: (numOfNodes.value + 1).toString() },
    })
  }

  function printNode() {
    console.log(toRaw(nodes.value))
  }

  return {
    nodes,
    edges,
    numOfNodes,
    updateNodePosition,
    printNode,
    addNode,
  }
});

export default useGraphStore;
