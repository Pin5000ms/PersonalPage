import {
  computed,
  onBeforeUnmount,
  onMounted,
  shallowRef,
  watch,
  type Ref,
} from 'vue'

interface UseAutoScrollTrackOptions {
  threshold: number
  speed?: number
  resumeDelay?: number
}

export function useAutoScrollTrack(
  element: Ref<HTMLElement | null>,
  itemCount: Ref<number>,
  options: UseAutoScrollTrackOptions,
) {
  const { threshold, speed = 0.45, resumeDelay = 2200 } = options
  const isInteractive = shallowRef(false)
  const isAutoScrolling = shallowRef(false)
  const canScroll = shallowRef(false)
  const shouldActivate = computed(() => itemCount.value > threshold)

  let frameId = 0
  let resumeTimeout = 0
  let direction = 1
  let resizeObserver: ResizeObserver | null = null

  function updateOverflowState() {
    const node = element.value
    if (!node) {
      canScroll.value = false
      return
    }

    const hasOverflow = node.scrollWidth - node.clientWidth > 12
    canScroll.value = shouldActivate.value && hasOverflow
  }

  function stopAnimation() {
    if (frameId) {
      cancelAnimationFrame(frameId)
      frameId = 0
    }
    isAutoScrolling.value = false
  }

  function clearResumeTimeout() {
    if (resumeTimeout) {
      window.clearTimeout(resumeTimeout)
      resumeTimeout = 0
    }
  }

  function tick() {
    const node = element.value

    if (!node || !canScroll.value || isInteractive.value) {
      stopAnimation()
      return
    }

    const maxScrollLeft = node.scrollWidth - node.clientWidth

    if (maxScrollLeft <= 0) {
      stopAnimation()
      return
    }

    const nextPosition = node.scrollLeft + speed * direction

    if (nextPosition >= maxScrollLeft) {
      node.scrollLeft = maxScrollLeft
      direction = -1
    } else if (nextPosition <= 0) {
      node.scrollLeft = 0
      direction = 1
    } else {
      node.scrollLeft = nextPosition
    }

    isAutoScrolling.value = true
    frameId = requestAnimationFrame(tick)
  }

  function startAnimation() {
    if (!canScroll.value || isInteractive.value || frameId) {
      return
    }

    frameId = requestAnimationFrame(tick)
  }

  function pauseWithResume() {
    isInteractive.value = true
    stopAnimation()
    clearResumeTimeout()
    resumeTimeout = window.setTimeout(() => {
      isInteractive.value = false
      startAnimation()
    }, resumeDelay)
  }

  onMounted(() => {
    watch(
      [element, shouldActivate],
      () => {
        updateOverflowState()
        stopAnimation()
        clearResumeTimeout()

        if (shouldActivate.value) {
          startAnimation()
        }
      },
      { immediate: true },
    )

    resizeObserver = new ResizeObserver(() => {
      updateOverflowState()
      if (!canScroll.value) {
        stopAnimation()
        return
      }

      if (!isInteractive.value) {
        startAnimation()
      }
    })

    if (element.value) {
      resizeObserver.observe(element.value)
    }
  })

  watch(element, (node, previousNode) => {
    if (previousNode && resizeObserver) {
      resizeObserver.unobserve(previousNode)
    }

    if (node && resizeObserver) {
      resizeObserver.observe(node)
      updateOverflowState()
    }
  })

  onBeforeUnmount(() => {
    stopAnimation()
    clearResumeTimeout()
    resizeObserver?.disconnect()
  })

  return {
    canScroll,
    isAutoScrolling,
    pauseWithResume,
  }
}
