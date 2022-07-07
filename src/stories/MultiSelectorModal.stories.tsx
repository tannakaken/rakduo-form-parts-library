import React, { useMemo, useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { MultiSelectorModalPresenter } from "../FormParts/MultiSelectorModalPresenter";
import { rangeUntil } from "../helpers/list.helper";
import { Modal } from "react-bootstrap";

const MultiSelectorModal = () => {
  const [show, setShow] = useState(false);
  const totalCount = 300;
  const allRows = useMemo(
    () =>
      rangeUntil(totalCount).map((i) => ({
        id: i,
        name: `サンプル${i}`,
      })),
    []
  );
  const [selected, setSelected] = useState<
    { id: number; name: string }[] | undefined
  >(undefined);
  return (
    <div>
      <p>検索フィールドを持ち、選択肢の中から複数を選択可能なモーダルUI</p>
      <button onClick={() => setShow(true)} className="btn btn-primary">
        押す
      </button>
      <MultiSelectorModalPresenter
        modalTitleMessage="サンプル"
        show={show}
        onHide={() => setShow(false)}
        search={(
          searchText,
          page,
          rowsPerPage,
          setSelections,
          setTotalCount
        ) => {
          let data = allRows;
          if (searchText.length > 0) {
            data = data.filter((row) => row.name.includes(searchText));
          }
          setTotalCount(data.length);
          setSelections(
            data.slice(rowsPerPage * page, rowsPerPage * (page + 1))
          );
        }}
        name={"sample"}
        onOk={(items) => setSelected(items)}
      />
      <Modal
        show={selected !== undefined}
        onHide={() => setSelected(undefined)}
      >
        <Modal.Header>選択結果</Modal.Header>
        <Modal.Body>
          <ul>
            {(selected ?? []).map((item) => (
              <li key={item.id}>{item.name}</li>
            ))}
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-primary"
            onClick={() => setSelected(undefined)}
          >
            閉じる
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default {
  title: "入力/検索可能な複数選択モーダル",
  component: MultiSelectorModal,
} as ComponentMeta<typeof MultiSelectorModal>;

const Template: ComponentStory<typeof MultiSelectorModal> = (args) => (
  <MultiSelectorModal />
);

export const Main = Template.bind({});
Main.args = {};
