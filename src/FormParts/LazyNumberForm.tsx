import React, { FC, useState } from "react";
import { Form } from "react-bootstrap";

type Props = {
  /**
   * 現在のカウント
   */
  count: number;
  /**
   * 変更時のハンドラー
   */
  onUpdate: (count: number) => void;
  /**
   * 右寄りかどうか
   */
  rightAlign: boolean;
};

const LazyNumberForm: FC<Props> = (props) => {
  const [currentCount, setCurrentCount] = useState(props.count.toString(10));
  return (
    <Form.Control
      type="number"
      value={currentCount}
      onChange={(event) => {
        setCurrentCount(event.target.value);
      }}
      onBlur={() => {
        const count = parseInt(currentCount, 10);
        if (isNaN(count)) {
          setCurrentCount(props.count.toString(10));
        }
        props.onUpdate(count);
      }}
      //TODO WheelEvent型が使いたいがうまくいかなかったのでanyにした
      onWheel={(event: any) => event.target.blur()}
      className={`w-25 ${props.rightAlign && "ml-auto"}`}
    />
  );
};

export default LazyNumberForm;
