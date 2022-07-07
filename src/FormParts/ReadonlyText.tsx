import React, { FC } from "react";
import { Form } from "react-bootstrap";

type Props<MESSAGE_DATA> = {
  /**
   * ラベルのメッセージ
   */
  labelMessage: MESSAGE_DATA;
  /**
   * 内容
   *
   * オプショナル
   */
  text?: string;
  /**
   * 子コンポーネント
   */
  children: JSX.Element | JSX.Element[];
  /**
   * i18nの翻訳関数
   */
  t: (MessageData: MESSAGE_DATA) => string;
};

const ReadonlyText = <MESSAGE_DATA,>(props: Props<MESSAGE_DATA>) => (
  <Form.Group className="mb-3">
    <Form.Label>{props.t(props.labelMessage)}</Form.Label>
    <Form.Text className="lead">
      {props.text}
      {props.children}
    </Form.Text>
  </Form.Group>
);

export default ReadonlyText;
