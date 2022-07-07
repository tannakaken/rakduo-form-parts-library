import React, { useState } from "react";
import { Col, Form } from "react-bootstrap";
import { HasName } from "../@types/type-function";
import { SingleSelectorModalPresenter } from "./SingleSelectorModalPresenter";
import { SelectorProps, Selection } from "./SelectorModalContainer";

export type DialogSelectorProps<
  MESSAGE_DATA,
  SELECTION extends HasName = Selection
> = SelectorProps<SELECTION> & {
  /**
   * データ変更のハンドラー
   */
  onSelect: (selection: SELECTION) => void;
  /**
   * 選択中の選択肢の名前
   */
  selectedName: string | null | undefined;
  /**
   * 入力欄のラベル
   */
  labelMessage: MESSAGE_DATA;
};

type Props<
  MESSAGE_DATA,
  SELECTION extends HasName = Selection
> = DialogSelectorProps<MESSAGE_DATA, SELECTION> & {
  /**
   * 未選択時のメッセージ
   */
  unselectedMessage: MESSAGE_DATA;
  /**
   * i18nの翻訳関数
   */
  t: (messageData: MESSAGE_DATA) => string;
};

export const DialogSelectorPresenter = <
  MESSAGE_DATA,
  SELECTION extends HasName = Selection
>(
  props: Props<MESSAGE_DATA, SELECTION>
) => {
  const [show, setShow] = useState(false);
  const selectedName =
    props.selectedName ?? props.t(props.unselectedMessage) ?? "unselected";

  return (
    <>
      <Form.Group className="mb-3">
        <Form.Label>{props.t(props.labelMessage)}</Form.Label>
        <Col
          sm={8}
          md={10}
          className="pl-0"
          onClick={() => {
            setShow(true);
          }}
        >
          <Form.Control value={selectedName} type="text" readOnly disabled />
        </Col>
      </Form.Group>
      <SingleSelectorModalPresenter<SELECTION>
        {...props}
        show={show}
        onHide={() => setShow(false)}
        onClick={(item) => {
          props.onSelect(item);
        }}
      />
    </>
  );
};
