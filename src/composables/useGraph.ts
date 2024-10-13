import { useVueFlow, NodePositionChange } from "@vue-flow/core";
import { toRaw } from "vue";
import useGraphStore from "@/stores/graphStore.ts";


export default function useGraph() {
  const store = useGraphStore();
  const { onNodesChange, onNodeClick, onEdgeClick} = useVueFlow();

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
    console.log('Node clicked:', toRaw(node) , event);
  });

  // Edge click event handler
  onEdgeClick(({ event, edge }) => {
    console.log('Edge clicked:', toRaw(edge), event);
  });

  return {
    store
  }
}
