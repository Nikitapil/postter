export const createFileFromString = async (dataUrl: string) => {
  const response = await fetch(dataUrl);
  const blob = await response.blob();
  return new File([blob], 'newFile');
};
