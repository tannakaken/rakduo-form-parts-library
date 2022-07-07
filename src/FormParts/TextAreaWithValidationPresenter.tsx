import React, { Dispatch, SetStateAction } from "react";
import { ValidationError } from "../models/validation.model";
import { Badge, Col, Form } from "react-bootstrap";
import { HasName } from "../@types/type-function";

export type TextAreaWithValidationProps<MESSAGE_DATA, T> = {
  /**
   * 入力されるフィールドの名前
   */
  name: keyof T;
  /**
   * データ
   */
  data: T;
  /**
   * アップデート時のハンドラー
   */
  setData: Dispatch<SetStateAction<T>>;
  /**
   * バリデーションのエラー
   */
  validationError: ValidationError<MESSAGE_DATA, T>;
  /**
   * 入力欄のラベル
   */
  labelMessage: MESSAGE_DATA;
  /**
   * 無効化されているかどうか。
   *
   * オプショナル。デフォルトはfalse
   */
  disabled?: boolean;
  /**
   * 必須かどうか。
   *
   * オプショナル。デフォルトはfalse
   */
  required?: boolean;
};

type Props<MESSAGE_DATA, T> = TextAreaWithValidationProps<MESSAGE_DATA, T> & {
  /**
   * 必須であることを表すメッセージ
   */
  requiredMessage: MESSAGE_DATA;
  /**
   * i18nの翻訳関数
   */
  t: (messageData: MESSAGE_DATA) => string;
};

export const TextAreaWithValidationPresenter = <
  MESSAGE_DATA,
  T extends HasName
>(
  props: Props<MESSAGE_DATA, T>
) => {
  return (
    <Form.Group className="mb-3" controlId={props.name.toString()}>
      <Form.Label>{props.t(props.labelMessage)}</Form.Label>
      {props.required && (
        <Badge variant="danger" className={"ml-2"}>
          {props.t(props.requiredMessage)}
        </Badge>
      )}
      <Col md={10} className={"pl-0"}>
        <Form.Control
          name={props.name.toString()}
          value={props.data[props.name] || ""}
          as="textarea"
          onChange={(e) => {
            props.setData({
              ...props.data,
              [props.name]: e.target.value,
            });
          }}
          disabled={props.disabled}
          rows={5}
        />
      </Col>
      {props.validationError.messageOf[props.name] && (
        <Form.Text className="text-danger">
          {props.t(props.validationError.messageOf[props.name] as MESSAGE_DATA)}
        </Form.Text>
      )}
    </Form.Group>
  );
};
