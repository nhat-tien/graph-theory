import { useVueFlow, NodePositionChange, Edge } from "@vue-flow/core";
import { ref, toRaw } from "vue";
import useMainGraphStore from "@/stores/mainGraphStore";
import useEditMode, { EditMode } from "@/stores/editModeStore";
import useAddEdgeStore from "@/stores/addEdgeStore";

export default function useGraph() {
  const store = useMainGraphStore();
  const addEdgeStore = useAddEdgeStore();
  const editModeStore = useEditMode();
  const { onNodesChange, onNodeClick, onEdgeClick, setViewport } = useVueFlow();
  const isToolbarDisplay = ref<boolean>(false);
  const toolbarPosition = ref({
    x: 0,
    y: 0,
  });
  const edgeSelected = ref<Edge | undefined>();
  const edgeValueInput = ref<string>("");

  onNodesChange(( param ) => {
    param = param as NodePositionChange[];
    param.forEach((each) => {
      each = each as NodePositionChange
      if(each.dragging) {
        store.updateNodePosition(each.id, each.position.x, each.position.y);
      }
    });
  });

  onNodeClick(({ node }) => {
    switch(editModeStore.mode) {
      case EditMode.Remove:
        store.removeNode(toRaw(node).id);
        break;
      case EditMode.AddEdge:
        setViewport({x: 0, y: 0, zoom: 1});
        if(addEdgeStore.call(node) == 1) {
          let sourceId = addEdgeStore.sourceNode?.id;
          let targetId = addEdgeStore.targetNode?.id;
          if(sourceId == undefined || targetId == undefined) {
            return;
          }
          store.addEdge(
            sourceId,
            targetId
          )
          addEdgeStore.reset()
        }
        break;
    }
  });

  onEdgeClick(({ event, edge }) => {
    switch(editModeStore.mode) {
      case EditMode.None:
        event = event as MouseEvent;
        edge = toRaw(edge);
        edgeSelected.value = edge;
        isToolbarDisplay.value = true;
        edgeValueInput.value = edge.data.text;
        toolbarPosition.value = {
          ...toolbarPosition,
          x: event.clientX,
          y: event.clientY,
        }
        break;
      case EditMode.Remove:
        edge = toRaw(edge);
        store.removeEdge(edge.id);
        break;
    }
  });

  const changeEdgeData = () => {
    if(edgeSelected.value) {
      let value: string = edgeValueInput.value.trim();
      store.changeEdgeData(edgeSelected.value.id, value)
      isToolbarDisplay.value = false;
      edgeValueInput.value = "";
    }
  }


  const closeToolbar = () => {
    isToolbarDisplay.value = false;
  }

  return {
    store,
    isToolbarDisplay,
    toolbarPosition,
    closeToolbar,
    edgeValueInput,
    changeEdgeData
  }
}
