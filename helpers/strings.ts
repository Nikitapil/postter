export const insertIntoString = (
  initialString: string,
  value: string,
  position: number
) => {
  return (
    initialString.slice(0, position) + value + initialString.slice(position)
  );
};
