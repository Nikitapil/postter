export default () => {
  const useDarkMode = () => useState<boolean>('dark_mode', () => true);

  const setInitialTheme = () => {
    const darkMode = useDarkMode();
    const themeFromLocalStorage = localStorage.getItem('postter-theme');
    if (themeFromLocalStorage) {
      darkMode.value = themeFromLocalStorage === 'dark';
    } else {
      darkMode.value =
        window?.matchMedia('(prefers-color-scheme: dark)').matches || false;
    }
  };

  const isDarkMode = computed(() => {
    const darkMode = useDarkMode();
    return darkMode.value;
  });

  const toggleTheme = () => {
    const darkMode = useDarkMode();
    darkMode.value = !darkMode.value;
    localStorage.setItem('postter-theme', isDarkMode.value ? 'dark' : 'light');
  };

  return { toggleTheme, isDarkMode, setInitialTheme };
};
