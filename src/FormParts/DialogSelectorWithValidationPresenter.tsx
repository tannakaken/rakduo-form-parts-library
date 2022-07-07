import React, { useState } from "react";
import { Badge, Col, Form } from "react-bootstrap";
import { ValidationError } from "../models/validation.model";
import { HasName } from "../@types/type-function";
import { SingleSelectorModalPresenter } from "./SingleSelectorModalPresenter";
import { SelectorProps } from "./SelectorModalContainer";

export type DialogSelectorWithValidationProps<MESSAGE_DATA, T> =
  SelectorProps & {
    /**
     * 入力されるフィールドのキー
     */
    name: keyof T;
    /**
     * 変更されるデータ
     */
    data: T;
    /**
     * データ変更のハンドラー
     */
    setData: (data: T) => void;
    /**
     * 選択中の選択肢の名前
     */
    selectedName: string | null | undefined;
    /**
     * バリデーションデータ
     */
    validationError: ValidationError<MESSAGE_DATA, T>;
    /**
     * 必須項目かどうか
     */
    required?: boolean;
    /**
     * 入力欄のラベル
     */
    labelMessage: MESSAGE_DATA;
    /**
     * 選択時の選択されている名前を変更するハンドラー
     */
    setSelectedName?: (newSelectedName: string) => void;
  };

type Props<MESSAGE_DATA, T> = DialogSelectorWithValidationProps<
  MESSAGE_DATA,
  T
> & {
  /**
   * 未選択時のメッセージ
   */
  unselectedMessage: MESSAGE_DATA;
  /**
   * 必須であることを表すメッセージ
   */
  requiredMessage: MESSAGE_DATA;
  /**
   * i18nの翻訳関数
   */
  t: (messageData: MESSAGE_DATA) => string;
};

export const DialogSelectorPresenterWithValidation = <
  MESSAGE_DATA,
  T extends HasName
>(
  props: Props<MESSAGE_DATA, T>
) => {
  const [show, setShow] = useState(false);
  const classNameForError = props.validationError.messageOf[props.name]
    ? "is-invalid"
    : "";
  const selectedName =
    props.selectedName ?? props.t(props.unselectedMessage) ?? "unselected";

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
          sm={8}
          md={10}
          className="pl-0"
          onClick={() => {
            setShow(true);
          }}
        >
          <Form.Control
            className={classNameForError}
            name={props.name.toString()}
            value={selectedName}
            type="text"
            readOnly
            disabled
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
      <SingleSelectorModalPresenter
        {...props}
        show={show}
        onHide={() => setShow(false)}
        onClick={(item) => {
          props.setData({
            ...props.data,
            [props.name]: item.id,
          });
          props.setSelectedName?.(item.name);
        }}
      />
    </>
  );
};
