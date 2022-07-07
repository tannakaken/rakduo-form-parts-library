export const isValidEmail = (email: string) => {
  const reg =
    /^[a-zA-Z0-9_+-]+(.[a-zA-Z0-9_+-]+)*@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/;
  return reg.test(email);
};

export const isValidPhoneNumber = (str: string) => {
  const reg = /^\d{10,11}$/;
  return reg.test(str);
};

export const truncate = (text: string, length: number) => {
  if (text.length > length) {
    return text.slice(0, length) + "...";
  }
  return text;
};

export const isValidDateFormat = (str: string) => {
  //2000 ~ 2999年まで許容
  const reg = /^[2]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
  return reg.test(str);
};

export const safeParseInt = (str: string | null | undefined): number => {
  if (!str) {
    return 0;
  }
  const result = parseInt(str, 10);
  if (isNaN(result)) {
    return 0;
  }
  return result;
};
