import { IMap } from '~/types/common-types';

export const createFormDataFromObject = (data: IMap) => {
  const formData = new FormData();
  Object.keys(data).forEach((key) => {
    const dataItem = data[key];
    if (dataItem) {
      formData.append(key, dataItem);
    }
  });

  return formData;
};
