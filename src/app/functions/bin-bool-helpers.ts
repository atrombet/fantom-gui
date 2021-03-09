export const binToBool = (bin: string | number): boolean => {
  return bin.toString() === '1' ? true : false;
};

export const boolToBin = (bool: boolean): string => {
  return bool ? '1' : '0';
};
