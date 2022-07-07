import React from "react";
import { ValidationError } from "../models/validation.model";
import { Badge, Col, Form } from "react-bootstrap";
import "./FormParts.scss";
import { HasName } from "../@types/type-function";

export type SelectBoxWithValidationProps<MESSAGE_DATA, T> = {
  /**
   * 入力欄のラベル
   */
  labelMessage: MESSAGE_DATA;
  /**
   * 入力されるデータのフィールドの名前
   */
  name: keyof T;
  /**
   * アップデート時のハンドラー
   */
  setData: (newData: T) => void;
  /**
   * データ
   */
  data: T;
  /**
   * 選択肢
   *
   * オプショナル。デフォルトは空リスト
   */
  items?: { [key: string]: string };
  /**
   * i18nで翻訳される選択肢
   *
   * オプショナル。デフォルトは空リスト
   */
  i18nItems?: { [key: string]: MESSAGE_DATA };
  /**
   * バリデーションのエラー
   *
   * オプショナル
   */
  validationError?: ValidationError<MESSAGE_DATA, T>;
  /**
   * 無効化されているかどうか
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
   * 空白の選択肢を含めるかどうか。
   *
   * オプショナル。デフォルトはfalse
   */
  withUndefined?: boolean;
};

type Props<MESSAGE_DATA, T> = SelectBoxWithValidationProps<MESSAGE_DATA, T> & {
  /**
   * 必須であることを表すメッセージ
   */
  requiredMessage: MESSAGE_DATA;
  t: (messageData: MESSAGE_DATA) => string;
};

export const SelectBoxWithValidationPresenter = <
  MESSAGE_DATA,
  T extends HasName
>({
  items = {},
  i18nItems = {},
  ...props
}: Props<MESSAGE_DATA, T>) => {
  return (
    <Form.Group className="mb-3" controlId={props.name.toString()}>
      <Form.Label>{props.t(props.labelMessage)}</Form.Label>
      {props.required && (
        <Badge variant="danger" className={"ml-2"}>
          {props.t(props.requiredMessage)}
        </Badge>
      )}
      <Col sm={8} md={5} className={"pl-0"}>
        <Form.Control
          as="select"
          value={props.data[props.name] || undefined}
          onChange={(e) => {
            const newSelection = parseInt(e.target.value, 10);
            if (isNaN(newSelection)) {
              props.setData({
                ...props.data,
                [props.name]: undefined,
              });
            } else {
              props.setData({
                ...props.data,
                [props.name]: newSelection,
              });
            }
          }}
          disabled={props.disabled}
          className="select"
        >
          {props.withUndefined && (
            <option id="" value="" key="selection_undefined" />
          )}
          {Object.keys(i18nItems).map((key, index) => {
            const selectionValue = i18nItems[key] as MESSAGE_DATA;
            return (
              <option value={key} key={`${name}_transltaed-selection-${index}`}>
                {props.t(selectionValue)}
              </option>
            );
          })}
          {Object.keys(items).map((key, index) => (
            <option value={key} key={`${name}_untranslated-selection-${index}`}>
              {items[key]}
            </option>
          ))}
        </Form.Control>
      </Col>
      {props.validationError?.messageOf[props.name] !== undefined && (
        <Form.Text className="text-danger">
          {props.t(props.validationError.messageOf[props.name] as MESSAGE_DATA)}
        </Form.Text>
      )}
    </Form.Group>
  );
};
