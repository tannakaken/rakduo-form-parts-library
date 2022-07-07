import React, { FC, useEffect, useState } from "react";
import { Form } from "react-bootstrap";

type Props = {
  /**
   * 現在のカウント
   */
  count: number;
  /**
   * アップデート時のハンドラー
   */
  onUpdate: (count: number) => void;
  /**
   * 右寄りかどうか
   */
  rightAlign: boolean;
};

const NumberForm: FC<Props> = (props) => {
  const [currentCount, setCurrentCount] = useState(props.count.toString(10));
  useEffect(() => {
    setCurrentCount(props.count.toString());
  }, [props.count]);
  return (
    <Form.Control
      type="number"
      value={currentCount}
      onChange={(event) => {
        setCurrentCount(event.target.value);
        const count = parseInt(event.target.value, 10);
        if (!isNaN(count)) {
          props.onUpdate(count);
        }
      }}
      onBlur={() => {
        const count = parseInt(currentCount, 10);
        if (isNaN(count)) {
          setCurrentCount("0");
          props.onUpdate(0);
        } else {
          props.onUpdate(count);
        }
      }}
      //TODO WheelEvent型が使いたいがうまくいかなかったのでanyにした
      onWheel={(event: any) => event.target.blur()}
      className={`w-25 ${props.rightAlign && "ml-auto"}`}
    />
  );
};

export default NumberForm;
