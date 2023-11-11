export const useClickOutside = (
  callback: () => void,
  ref: Ref<null>,
  excludedRef?: Ref<null>
) => {
  const fn = (e: MouseEvent) => {
    if (
      e.target !== ref.value &&
      e.target !== (excludedRef?.value as unknown)
    ) {
      callback();
    }
  };

  onMounted(() => document.addEventListener('click', fn));
  onUnmounted(() => document.removeEventListener('click', fn));
};
