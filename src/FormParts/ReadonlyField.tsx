import React from "react";
import { Col, Form } from "react-bootstrap";
import { HasName } from "../@types/type-function";

type Props<MESSAGE_DATA, T> = {
  /**
   * ラベルのメッセージ
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
   * i18nの翻訳関数
   */
  t: (MessageData: MESSAGE_DATA) => string;
};

export const ReadonlyField = <MESSAGE_DATA, T extends HasName>(
  props: Props<MESSAGE_DATA, T>
) => (
  <Col md={10} className={"pl-0"}>
    <Form.Group className="mb-3" controlId={props.name.toString()}>
      <Form.Label>{props.t(props.labelMessage)}</Form.Label>
      <Form.Control
        type="text"
        placeholder={props.data[props.name]}
        readOnly
        disabled
      />
    </Form.Group>
  </Col>
);
