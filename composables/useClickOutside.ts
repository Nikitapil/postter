export const useClickOutside = (
  callback: () => void,
  ref: Ref<null | HTMLElement>
) => {
  const fn = (e: MouseEvent) => {
    if (!ref.value?.contains(e.target as Node)) {
      callback();
    }
  };

  onMounted(() => document.addEventListener('click', fn));
  onUnmounted(() => document.removeEventListener('click', fn));
};
