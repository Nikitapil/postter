export default () => {
  const useDarkMode = () =>
    useState<boolean>('dark_mode', () => {
      return window.matchMedia('(prefers-color-scheme: dark)').matches || false;
    });

  const toggleTheme = () => {
    const darkMode = useDarkMode();
    darkMode.value = !darkMode.value;
  };

  const isDarkMode = computed(() => {
    const darkMode = useDarkMode();
    return darkMode.value;
  });

  return { toggleTheme, isDarkMode };
};
