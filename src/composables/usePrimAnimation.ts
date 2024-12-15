import usePresentGraphStore from '@/stores/presentGraphStore';
import { invoke } from '@tauri-apps/api/tauri';
import useTimer from './useTimer';
import { toRaw, ref, computed, watch } from 'vue';
import { toast } from 'vue3-toastify';

type Edge = {
  include: boolean,
  edge: {
    id: string,
    weight: number
  }
}
type TimeLineFrame = Edge[];

export default function usePrimAnimation() {

  const timeLine = ref<TimeLineFrame[]>([]);

  const isStarted = ref(false);

  const store = usePresentGraphStore();

  const totalWeight = ref(0);

  const isRunning = ref(false);

  const { currentCount, startTimer, setTime, stopTimer, setIntervalTime} = useTimer();

  const currentFrame = computed<TimeLineFrame | null>(() => {
    if(currentCount.value <= store.edges.length) {
      return timeLine.value[currentCount.value];
    } else {
      return null;
    }
  });

  const beforeFrame = ref<TimeLineFrame | null>(null);

  async function start() {
    try {

    if(!isStarted.value) {
      store.removeHighLightAll()
      await setup();
      isStarted.value = true;
    };
      startTimer();
      isRunning.value = true;
    } catch(e) {
      toast.error(e, {
        autoClose: 1000,
        position: toast.POSITION.TOP_RIGHT,
      });
      isStarted.value = true;
      isRunning.value = false;
    }
  };

  async function setup() {
    try {
    const res: TimeLineFrame[] = await invoke("prim", {graphFromFe: toRaw(store.edges), startPoint: store.selectedNode});
    timeLine.value = res;
    setTime(store.edges.length + 1);
    } catch(e) {
      throw e;
    }
  }

  function stop() {
    let total = 0;
    timeLine.value.forEach((edges) => edges.forEach((edge) => total += edge.include ? edge.edge.weight : 0));
    totalWeight.value = total;
    pause()
    setTime(0)
  };

  function pause() {
    stopTimer()
    isRunning.value = false;
  }
  
  function reset() {

  };

  watch(currentCount, () => {
    if(currentCount.value >= timeLine.value.length) {
      stop();
      isRunning.value = false;
    }
  });

  watch(currentFrame, () => {
    if(beforeFrame.value != null) {
      beforeFrame.value.forEach((edge) => {
        if(edge.include) {
          store.setHighLight(edge.edge.id, "solid");
        } else {
          store.setHighLight(edge.edge.id, "");
        }
      });
    }
    if(currentFrame.value != null) {
      currentFrame.value.forEach((edge) => {
        store.setHighLight(edge.edge.id, "blink");
      });
    }
    beforeFrame.value = currentFrame.value;
  });
   
  return {
    start,
    stop,
    reset,
    pause,
    isRunning,
    timeLine,
    totalWeight,
    setIntervalTime
  }
}
