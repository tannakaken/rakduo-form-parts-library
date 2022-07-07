import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

type Props<MESSAGE_DATA> = {
  /**
   * 表示しているかどうか。
   */
  show: boolean;
  /**
   * モーダルの外をクリックした時のハンドラー
   */
  onHide: () => void;
  /**
   * 追加ヘッダーUI
   */
  additionalHeader?: JSX.Element;
  /**
   * タイトル
   */
  modalTitleMessage: MESSAGE_DATA;
  /**
   * キャンセル
   */
  cancelMessage?: MESSAGE_DATA;
  /**
   * OK
   */
  okMessage?: MESSAGE_DATA;
  /**
   * OK時のハンドラー
   */
  onOk?: (value: string) => void;
  /**
   * キャンセル時のハンドラー
   */
  onCancel?: () => void;
  /**
   * i18nの翻訳関数
   */
  t: (messageData: MESSAGE_DATA) => string;
};

const SelectorModal = <MESSAGE_DATA,>(props: Props<MESSAGE_DATA>) => {
  const [value, setValue] = useState("");
  return (
    <Modal show={props.show} onHide={props.onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{props.t(props.modalTitleMessage)}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>{props.additionalHeader}</div>
        <Form.Control
          type="text"
          value={value}
          onChange={(event) => {
            setValue(event.target.value);
          }}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => {
            props.onCancel?.();
            props.onHide();
          }}
        >
          {props.cancelMessage !== undefined
            ? props.t(props.cancelMessage)
            : "Cancel"}
        </Button>
        {props.onOk !== undefined && (
          <Button
            variant="primary"
            onClick={() => {
              props.onOk?.(value);
              props.onHide();
            }}
          >
            {props.okMessage !== undefined ? props.t(props.okMessage) : "OK"}
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default SelectorModal;
