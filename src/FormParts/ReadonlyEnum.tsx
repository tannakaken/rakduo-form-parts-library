import React from "react";
import { Form } from "react-bootstrap";
import { HasName } from "../@types/type-function";

type Props<MESSAGE_DATA, T> = {
  /**
   * 入力欄のラベル
   */
  labelMessage: MESSAGE_DATA;
  /**
   * データのフィールドの名前
   */
  name: keyof T;
  /**
   * データ
   */
  data: T;
  /**
   * 選択肢
   */
  names: { [key: string]: MESSAGE_DATA };
  /**
   * i18nの翻訳関数
   */
  t: (MessageData: MESSAGE_DATA) => string;
};

export const ReadonlyEnum = <MESSAGE_DATA, T extends HasName>(
  props: Props<MESSAGE_DATA, T>
) => (
  <Form.Group className="mb-3" controlId={props.name.toString()}>
    <Form.Label>{props.t(props.labelMessage)}</Form.Label>
    <Form.Text className="lead">
      {props.t(props.names[props.data[props.name]])}
    </Form.Text>
  </Form.Group>
);
