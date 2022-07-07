import React from "react";
import { Button, Row } from "react-bootstrap";
import { HasName } from "../@types/type-function";
import {
  Selection,
  SelectorProps,
  ModalProps,
  SelectModalContainer,
} from "./SelectorModalContainer";

type SingleSelectorModalProps<SELECTION extends HasName = Selection> =
  SelectorProps<SELECTION> &
    ModalProps & {
      /**
       * 行をクリックした時のハンドラー
       */
      onClick: (item: SELECTION) => void;
      /**
       * 行のクリック時に自動的に閉じるかどうか
       *
       * オプショナル。デフォルトはtrue
       *
       * TODO これがfalseの時の有効なUIはまだない。
       */
      autoClose?: boolean;
      /**
       * OKボタンのメッセージ
       *
       * このプロパティはi18nのキーが渡せるようにラップすると良い。
       *
       * オプショナル。デフォルトはOK
       *
       * TODO これがfalseの時の有効なUIはまだない。
       */
      okMessage?: string;
      /**
       * OKボタンを押した時ののハンドラー
       *
       * オプショナル。undefinedならばOKボタンは表示されない。
       * autoCloseがtrueならundefinedでもよく、autoCloseがfalseなら設定すべき。
       * TODO autoCloseがfalseな時の、有効なUIはまだない。
       */
      onOk?: () => void;
      /**
       * 追加のUI
       *
       * オプショナル。
       */
      additionalHeader?: JSX.Element;
    };

export const SingleSelectorModalPresenter = <
  SELECTION extends HasName = Selection
>({
  rowsPerPage = 5,
  autoClose = true,
  ...props
}: SingleSelectorModalProps<SELECTION>) => {
  return (
    <SelectModalContainer<SELECTION>
      {...props}
      okUi={
        props.onOk !== undefined ? (
          <Button
            variant="primary"
            onClick={() => {
              props.onOk?.();
              props.onHide();
            }}
          >
            {props.okMessage ?? "OK"}
          </Button>
        ) : (
          <></>
        )
      }
    >
      {(selections) =>
        selections.map((item) => (
          <Row
            className="m-2 p-2 border"
            onClick={() => {
              props.onClick(item);
              if (autoClose) {
                props.onHide();
              }
            }}
            key={`${props.name}-selection-${item.id}`}
          >
            {item.name}
          </Row>
        ))
      }
    </SelectModalContainer>
  );
};
