import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { HasName } from "../@types/type-function";
import { PaginationPresenter } from "rakudo-pagination";
import { SearchFieldPresenter } from "./SearchFieldPresenter";

export type Selection = { id: number; name: string };

export type SelectorProps<SELECTION extends HasName = Selection> = {
  /**
   * モーダルのタイトル
   *
   * このプロパティはi18nのキーが渡せるようにラップすると良い。
   */
  modalTitleMessage: string;
  /**
   * Cancelのメッセージ
   *
   * このプロパティはi18nのキーが渡せるようにラップすると良い。
   *
   * オプショナル。デフォルトはCancel
   */
  /**
   * 検索時のハンドラー
   *
   * @param searchText 検索文字列
   * @param page 変更後のページ
   * @param rowsPerPage １ページあたりの行数
   * @param setSelections 次の選択肢をセットする
   * @param 全体のヒット数をセットする。
   */
  search: (
    searchText: string,
    page: number,
    rowsPerPage: number,
    setSelections: (selections: SELECTION[]) => void,
    setTotalCount: (totalCount: number) => void
  ) => void;
  /**
   * １ページあたりの行数。UIでの変更はできない。
   *
   * オプショナル。デフォルトは5
   */
  rowsPerPage?: number;
  /**
   * keyのためのデータの名前。
   *
   * オプショナル
   */
  name?: string;
  /**
   * キャンセルのメッセージ。
   *
   * このプロパティはi18nのキーが渡せるようにラップすると良い。
   *
   * オプショナル。デフォルトはCancel
   */
  cancelMessage?: string;
  /**
   * Cancel時のハンドラー
   *
   * オプショナル。
   */
  onCancel?: () => void;
  /**
   * 検索欄のプレースホルダー
   *
   * オプショナル。デフォルトはSearch
   */
  searchPlaceholder?: string;
  /**
   * 表示準備完了かどうか
   *
   * オプショナル。デフォルトはtrue
   */
  ready?: boolean;
  /**
   * 何に関するか選択か。
   *
   * これが変化したとき、ページがリセットされる（別のものに関する選択でページがリセットされない現象の回避）
   *
   * オプショナル。
   */
  about?: string;
};
export type ModalProps = {
  /**
   * モーダルの表示状態
   */
  show: boolean;
  /**
   * モーダルの外をクリック/タップした時のハンドラー
   */
  onHide: () => void;
};

type Props<SELECTION extends HasName = Selection> = SelectorProps<SELECTION> &
  ModalProps & {
    /**
     * 追加のUI
     *
     * オプショナル。
     */
    additionalHeader?: JSX.Element | JSX.Element[];
    /**
     * okのUI
     */
    okUi: JSX.Element;
    /**
     * 行
     */
    children: (selections: SELECTION[]) => JSX.Element[];
  };

export const SelectModalContainer = <SELECTION extends HasName = Selection>({
  rowsPerPage = 5,
  ...props
}: Props<SELECTION>) => {
  const [page, setPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [update, setUpdate] = useState(true);
  const [searchTextChanged, setSearchTextChanged] = useState(false);
  useEffect(() => {
    if (searchTextChanged) {
      setSearchTextChanged(false);
      setPage(0);
      setUpdate(true);
    }
  }, [searchTextChanged]);
  useEffect(() => {
    setPage(0);
  }, [props.about]);
  const ready = props.ready === undefined ? true : props.ready;
  const [searchText, setSearchText] = useState("");
  const [selections, setSelections] = useState<SELECTION[]>([]);
  useEffect(() => {
    if (!props.show) {
      return;
    }
    if (!update) {
      return;
    }
    if (!ready) {
      return;
    }
    setUpdate(false);
    props.search(searchText, page, rowsPerPage, setSelections, setTotalCount);
  }, [searchText, setSelections, props, update, ready, page, rowsPerPage]);
  return (
    <Modal show={props.show} onHide={props.onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{props.modalTitleMessage}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>{props.additionalHeader}</div>
        <SearchFieldPresenter
          value={searchText}
          placeholder={props.searchPlaceholder}
          onChange={(newValue) => {
            setSearchText(newValue);
          }}
          lazyOnChange={() => {
            setSearchTextChanged(true);
          }}
        />
        {props.children(selections)}
        <PaginationPresenter
          page={page}
          setPage={setPage}
          rowsPerPage={rowsPerPage}
          totalCount={totalCount}
          setUpdate={setUpdate}
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
          {props.cancelMessage ?? "Cancel"}
        </Button>
        {props.okUi}
      </Modal.Footer>
    </Modal>
  );
};
