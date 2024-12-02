import { ref } from "vue";


export default function useTimer() {
  const end = ref(0);
  const currentCount = ref(0);
  const intervalId = ref<any>(null);
  const isRunning = ref<boolean>(false);
  const isEnd = ref(false);

  function setTime(setEnd: number) {
    end.value = setEnd
  }

  function startTimer() {
    if(end.value == 0) {
      return;
    }
    if(!isRunning.value && currentCount.value < end.value) {
      isRunning.value = true;
      intervalId.value = setInterval(() => {
        if(currentCount.value < end.value) {
          currentCount.value++;
        } else {
          stopTimer();
        };
      },2000)
    }
  }

  function stopTimer() {
    if(isRunning.value) {
      if(currentCount.value >= end.value) {
        isEnd.value = true;
      }
      isRunning.value = false;
      clearInterval(intervalId.value);
      intervalId.value = null;
    }
  }

  function resetTimer() {
    stopTimer();
    currentCount.value = 0;
  }

  return {
    currentCount,
    startTimer,
    stopTimer,
    resetTimer,
    setTime,
    isRunning,
    isEnd
  }
}
