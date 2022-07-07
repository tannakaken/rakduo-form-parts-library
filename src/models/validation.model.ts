/**
 * MESSAGE_DATAはエラーメッセージの方。i18nへの対応のために抽象化
 *
 * Tはvalidateされるデータの型
 */
export type ValidationError<MESSAGE_DATA, T> = Readonly<{
  messageOf: {
    readonly [P in keyof T]+?: MESSAGE_DATA;
  };
}>;

export const initialValidationError = <MESSAGE_DATA, T>(): ValidationError<MESSAGE_DATA, T> => ({
  messageOf: {},
});

export type ValidatedData<MESSAGE_DATA, T, S extends T = T> =
  | {
      ok: true;
      validatedData: S;
    }
  | {
      ok: false;
      validationError: ValidationError<MESSAGE_DATA, T>;
    };
