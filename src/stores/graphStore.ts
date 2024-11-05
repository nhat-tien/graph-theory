import { Edge, Node } from "@vue-flow/core";
import { defineStore } from "pinia";
import { ref, toRaw, computed, watchEffect } from "vue";
import { invoke } from "@tauri-apps/api/tauri";
import { toast } from "vue3-toastify";

// function getDefaultNodes(): Node[] {
// return [
//     {
//       id: "1",
//       type: "custom",
//       position: { x: 250, y: 5 },
//       data: { label: "1" },
//     },
//     {
//       id: "2",
//       type: "custom",
//       position: { x: 50, y: 250 },
//       data: { label: "2" },
//     },
//     {
//       id: "3",
//       type: "custom",
//       position: { x: 300, y: 250},
//       data: { label: "3" },
//     },
//
// ]
// }
//
//
// function getDefaultEdges(): Edge[] {
// return [
//     {
//       id: "e1->2",
//       source: "1",
//       target: "2",
//       data: {
//         text: "2",
//         marker: true
//       },
//       type: "custom",
//     },
//     {
//       id: "e1->3",
//       source: "1",
//       target: "3",
//       data: {
//         text: "10",
//         marker: false
//       },
//       type: "custom",
//     },
//     {
//       id: "e2->3",
//       source: "2",
//       target: "3",
//       data: {
//         text: "100",
//         marker: true
//       },
//       type: "custom",
//     },
// ]
// }

const useGraphStore = defineStore('vue-flow', () => {

  const nodes = ref<Node[]>([]);

  const edges = ref<Edge[]>([]);

  const fileName = ref<string>(" ");

  const nodesFromStorage = sessionStorage.getItem("nodes");
  const edgesFromStorage = sessionStorage.getItem("edges");
  const fileNameFromStorage = sessionStorage.getItem("fileName");

  if(nodesFromStorage) {
    nodes.value = JSON.parse(nodesFromStorage);
  } 
  if(edgesFromStorage) {
    edges.value = JSON.parse(edgesFromStorage);
  } 
  if(fileNameFromStorage) {
    fileName.value = fileNameFromStorage
  }

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

  function removeNode(id: string) {
    nodes.value = nodes.value.filter((node: Node) => {
      return node.id != id;
    })
  }

  function changeEdgeData(id: string, data: string) {
    edges.value = edges.value.map((edge) => {
      if(edge.id == id) {
        return {
          ...toRaw(edge),
          data: {
            text: data,
          }
        }
      } else {
        return toRaw(edge);
      }
    })
  }

  function selectNode(id: string) {
    nodes.value = nodes.value.map((node) => {
      if(node.id == id) {
        return {
          ...toRaw(node),
          data: {
            select: true 
          }
        }
      } else {
        return toRaw(node)
      }
    })
  }

  // function deselectNode() {
  //   nodes.value = nodes.value.map((node) => {
  //     if(node.id == id) {
  //       return {
  //         ...toRaw(node),
  //         data: {
  //           select: true 
  //         }
  //       }
  //     } else {
  //       return toRaw(node)
  //     }
  //   })
  // }

  function printNode() {
    console.log(toRaw(nodes.value))
  }

  function clearAll() {
    readFile()
  }

  function addEdge(sourceId: string, targetId: string) {
    let edgeExist = edges.value.filter((edge) => edge.id == `e${sourceId}->${targetId}`);
    if (edgeExist.length != 0) {
      toast.warning("Cạnh đã tồn tại");
      return;
    }
    edges.value.push({
      id: `e${sourceId}->${targetId}`,
      source: `${sourceId}`,
      target: `${targetId}`,
      data: {
        text: "",
        marker: false,
      },
      type: "custom"
    })
  }

  async function writeFile() {
    let content = {
      nodes: toRaw(nodes.value),
      edges: toRaw(edges.value)
    };
    await invoke('write_file', { filePath: fileName.value, content: JSON.stringify(content)});
  }

  async function readFile() {
    let res: string = await invoke('read_file', { filePath: fileName.value});
    let {nodes: arrNode, edges: arrEdge}= JSON.parse(res);
    nodes.value = arrNode;
    edges.value = arrEdge;
  }

  watchEffect(() => {
    sessionStorage.setItem("nodes", JSON.stringify(nodes.value))
    sessionStorage.setItem("edges", JSON.stringify(edges.value))
    sessionStorage.setItem("fileName", fileName.value)
  })

  return {
    nodes,
    edges,
    fileName,
    numOfNodes,
    writeFile,
    readFile,
    updateNodePosition,
    printNode,
    addNode,
    removeNode,
    changeEdgeData,
    clearAll,
    addEdge,
    selectNode,
  }
});

export default useGraphStore;
