import React, { FC, useState } from "react";
import { Form } from "react-bootstrap";

type Props = {
  /**
   * 検索文字列
   */
  value: string;
  /**
   * プレースホルダー
   *
   * オプショナル。デフォルトはSearch
   */
  placeholder?: string;
  /**
   * 検索文字列変更時の更新関数
   */
  onChange: (newValue: string) => void;
  /**
   * 検索文字列変更後少し待って起動するハンドラー
   *
   * オプショナル。
   */
  lazyOnChange?: (newValue: string) => void;
  /**
   * 検索文字列変更後kazyOnChangeが起動するまでのタイムラグ。
   *
   * オプショナル。デフォルトは500ms(0.5秒)
   */
  waitMilliseconds?: number;
  /**
   * エンターキーが打たれた時のハンドラー
   *
   * オプショナル。
   */
  onEnter?: () => void;
};

type Timer = ReturnType<typeof setTimeout>;

/**
 * 検索フィールド
 */
export const SearchFieldPresenter: FC<Props> = (props) => {
  const waitMilliseconds =
    props.waitMilliseconds === undefined ? 500 : props.waitMilliseconds;
  const [timer, setTimer] = useState<Timer | undefined>(undefined);
  return (
    <span className="d-flex align-items-center">
      <i
        className="bi bi-search"
        style={{
          position: "absolute",
          left: "1.5em",
          cursor: props.onEnter !== undefined ? "pointer" : "auto",
        }}
        onClick={() => {
          props.onEnter?.();
        }}
      />
      <Form.Control
        type="text"
        placeholder={props.placeholder || "Search"}
        className="search-field"
        style={{
          paddingLeft: "2em",
        }}
        value={props.value}
        onChange={(event) => {
          const newValue = event.target.value;
          if (props.value !== newValue) {
            props.onChange(newValue);
            if (timer !== undefined) {
              clearTimeout(timer);
            }
            if (props.lazyOnChange !== undefined) {
              const newTimer = setTimeout(() => {
                props.lazyOnChange?.(newValue);
              }, waitMilliseconds);
              setTimer(newTimer);
            }
          }
        }}
        onKeyPress={(event: React.KeyboardEvent) => {
          if (event.code === "Enter") {
            props.onEnter?.();
          }
        }}
      />
    </span>
  );
};
