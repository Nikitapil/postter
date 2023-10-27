export default () => {
  const useDarkMode = () =>
    useState<boolean>('dark_mode', () => {
      const themeFromStorage = localStorage.getItem('theme');
      if (themeFromStorage === 'light') {
        return false;
      }
      if (themeFromStorage === 'dark') {
        return false;
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches || false;
    });

  const toggleTheme = () => {
    const darkMode = useDarkMode();
    darkMode.value = !darkMode.value;
    if (darkMode.value) {
      localStorage.setItem('theme', 'dark');
    } else {
      localStorage.setItem('theme', 'light');
    }
  };

  const isDarkMode = computed(() => {
    const darkMode = useDarkMode();
    return darkMode.value;
  });

  return { toggleTheme, isDarkMode };
};
