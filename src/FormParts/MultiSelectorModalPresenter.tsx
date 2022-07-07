import React, { useEffect, useState } from "react";
import { Button, Row } from "react-bootstrap";
import {
  ModalProps,
  Selection,
  SelectModalContainer,
  SelectorProps,
} from "./SelectorModalContainer";

type RowProps = {
  /**
   * 選択されているデータ
   */
  selected: Selection[];
  /**
   * アップデート時のハンドラー
   */
  setSelected: (newSelected: Selection[]) => void;
  /**
   * データ
   */
  item: Selection;
  /**
   * 表示文字列
   */
  name?: string;
};

const MultiSelectorModalRow = (props: RowProps) => (
  <Row
    className="m-2 p-2 border d-flex flex-row align-items-center"
    onClick={() => {
      if (
        props.selected.find(
          (selectedItem) => selectedItem.id === props.item.id
        ) !== undefined
      ) {
        props.setSelected(
          props.selected.filter(
            (selectedItem) => selectedItem.id !== props.item.id
          )
        );
      } else {
        props.setSelected([...props.selected, props.item]);
      }
    }}
  >
    <input
      className={"mr-2"}
      type="checkbox"
      checked={
        props.selected.find(
          (selectedItem) => selectedItem.id === props.item.id
        ) !== undefined
      }
      readOnly
    />
    {props.item.name}
  </Row>
);

type MultiSelectorModalProps = SelectorProps &
  ModalProps & {
    /**
     * OKボタンを押した時のハンドラー
     */
    onOk: (selected: Selection[]) => void;
    /**
     * OKボタンのメッセージ。
     *
     * これはi18nなどでラッパーをすると良い。
     *
     * オプショナル。デフォルトはOK
     */
    okMessage?: string;
    /**
     * 外部で選択してあったデータ
     *
     * オプショナル。デフォルトは[]
     */
    selected?: Selection[];
  };

export const MultiSelectorModalPresenter = (props: MultiSelectorModalProps) => {
  const [selected, setSelected] = useState(props.selected ?? []);
  useEffect(() => {
    setSelected(props.selected ?? []);
  }, [props.selected]);
  return (
    <SelectModalContainer
      {...props}
      additionalHeader={selected.map((item) => (
        <Row
          className="ml-3 mr-3 mb-2 mt-2 p-2 border d-flex flex-row align-items-center border-primary"
          onClick={() => {
            setSelected(
              selected.filter((selectedItem) => selectedItem.id !== item.id)
            );
          }}
          key={`${props.name}-selecttion-${item.id}`}
        >
          <input className={"mr-2"} type="checkbox" checked={true} readOnly />
          {item.name}
        </Row>
      ))}
      okUi={
        <Button
          variant="primary"
          onClick={() => {
            props.onOk(selected);
            props.onHide();
          }}
        >
          {props.okMessage ?? "OK"}
        </Button>
      }
    >
      {(selections) =>
        selections.map((item) => (
          <MultiSelectorModalRow
            key={`${props.name}-selection-${item.id}`}
            item={item}
            selected={selected}
            setSelected={setSelected}
            name={props.name}
          />
        ))
      }
    </SelectModalContainer>
  );
};
