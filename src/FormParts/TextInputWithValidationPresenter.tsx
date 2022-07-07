import React from "react";
import { ValidationError } from "../models/validation.model";
import { Badge, Col, Form } from "react-bootstrap";
import "./FormParts.scss";
import { HasName } from "../@types/type-function";

export type TextInputWithValidationProps<MESSAGE_DATA, T> = {
  /**
   * 変更されるフィールドのT型のデータの中での名前
   */
  name: keyof T;
  /**
   * 変更されるデータ全体
   */
  data: T;
  /**
   * データの型
   */
  type?: string;
  /**
   * データ変更のハンドラー
   */
  setData: (newData: T) => void;
  /**
   * バリデーションのエラー
   */
  validationError: ValidationError<MESSAGE_DATA, T>;
  /**
   * 入力欄のラベル
   */
  labelMessage: MESSAGE_DATA;
  /**
   * 変更不可かどうか
   *
   * オプショナル。デフォルトはfalse
   */
  disabled?: boolean;
  /**
   * 必須かどうか
   *
   * オプショナル。デフォルトはfalse
   */
  required?: boolean;
  /**
   * 中央寄席
   *
   * オプショナル。デフォルトはfalse
   */
  centering?: boolean;
  /**
   * typeがpasswordの時だけ意味を持つ。
   * これがtrueな時は、パスワードの可視/不可視をコントロールするUiが付く。
   *
   * オプショナル。デフォルトはfalse
   */
  watchableMode?: boolean;
};

type Props<MESSAGE_DATA, T> = TextInputWithValidationProps<MESSAGE_DATA, T> & {
  /**
   * 必須であることを表すメッセージ
   */
  requiredMessage: MESSAGE_DATA;
  /**
   * i18n関数
   */
  t: (messageData: MESSAGE_DATA) => string;
};

const inputType = <T extends any>(name: keyof T) => {
  if (name === "email") {
    return "email";
  } else if (name.toString().toLowerCase().endsWith("password")) {
    return "password";
  } else if (name.toString().toLowerCase().endsWith("date")) {
    return "date";
  } else if (name === "counter" || name === "count") {
    return "number";
  } else {
    return "text";
  }
};

export const TextInputWithValidationPresenter = <
  MESSAGE_DATA,
  T extends HasName
>(
  props: Props<MESSAGE_DATA, T>
) => {
  const type = props.type ?? inputType<T>(props.name);
  const classNameForType = type === "date" ? "date-input" : "";
  const classNameForError = props.validationError.messageOf[props.name]
    ? "is-invalid"
    : "";
  const classNames = [classNameForType, classNameForError]
    .filter((className) => className.length > 0)
    .join(" ");
  return (
    <>
      <Form.Group className="mb-3" controlId={props.name.toString()}>
        <Form.Label>{props.t(props.labelMessage)}</Form.Label>
        {props.required && (
          <Badge variant="danger" className={"ml-2"}>
            {props.t(props.requiredMessage)}
          </Badge>
        )}
        <Col
          sm={type === "date" && 8}
          md={type === "date" ? 3 : 10}
          className={`pl-0 ${props.centering ? "mx-auto" : ""}`}
        >
          <Form.Control
            className={classNames}
            name={props.name.toString()}
            value={props.data[props.name] || ""}
            type={type}
            onChange={(event) => {
              props.setData({
                ...props.data,
                [props.name]:
                  type === "number"
                    ? parseInt(event.target.value, 10)
                    : event.target.value,
              });
            }}
            disabled={props.disabled}
          />
        </Col>
        {props.validationError.messageOf[props.name] && (
          <Form.Text className="text-danger">
            {props.t(
              props.validationError.messageOf[props.name] as MESSAGE_DATA
            )}
          </Form.Text>
        )}
      </Form.Group>
    </>
  );
};
