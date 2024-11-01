import { useVueFlow, NodePositionChange, Edge } from "@vue-flow/core";
import { ref, toRaw } from "vue";
import useGraphStore from "@/stores/graphStore.ts";


export default function useGraph() {
  const store = useGraphStore();
  const { onNodesChange, onNodeClick, onEdgeClick} = useVueFlow();
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

  onNodeClick(({ event, node }) => {
  });

  onEdgeClick(({ event, edge }) => {
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
