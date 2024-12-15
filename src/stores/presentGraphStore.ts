import { Edge, Node } from "@vue-flow/core";
import { defineStore } from "pinia";
import { ref, toRaw } from "vue";

const usePresentGraphStore = defineStore('presentation-graph', () => {

  const nodes = ref<Node[]>([]);

  const edges = ref<Edge[]>([]);

  function setup(new_nodes: Node[], new_edges: Edge[]) {
    nodes.value = new_nodes;
    edges.value = new_edges;
  }

  function clear() {
    nodes.value = [];
    edges.value = [];
  }

  function setHighLight(id: string, status: string) {
    edges.value = edges.value.map((edge) => {
      if(edge.id == id) {
        return {
          ...toRaw(edge),
            data: {
              ...toRaw(edge.data),
              highlight: status
            }
          }
        } else {
        return toRaw(edge);
      }
    })
  }

  function removeHighLightAll() {
    edges.value = edges.value.map((edge: Edge) => {
      if( edge.data.hightlight || edge.data.hightlight != "") {
        return {
          ...toRaw(edge),
            data: {
              ...toRaw(edge.data),
              highlight: "" 
            }
          }
        } else {
        return toRaw(edge);
      }
    })
  }


  return {
    nodes,
    edges,
    setup,
    clear,
    setHighLight,
    removeHighLightAll
  }
});

export default usePresentGraphStore;
