import React, { useMemo, useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { SingleSelectorModalPresenter } from "../FormParts/SingleSelectorModalPresenter";
import { rangeUntil } from "../helpers/list.helper";
import { Modal } from "react-bootstrap";

const SingleSelectorModal = () => {
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
  const [selected, setSelected] = useState<{ name: string } | undefined>(
    undefined
  );
  return (
    <div>
      <p>検索フィールドを持ち、選択肢の中から一つを選択可能なモーダルUI</p>
      <button onClick={() => setShow(true)} className="btn btn-primary">
        押す
      </button>
      <SingleSelectorModalPresenter
        modalTitleMessage="サンプル"
        show={show}
        onHide={() => setShow(false)}
        onClick={(item) => setSelected(item)}
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
      />
      <Modal
        show={selected !== undefined}
        onHide={() => setSelected(undefined)}
      >
        <Modal.Header>{selected?.name}が選択されました。</Modal.Header>
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
  title: "入力/検索可能な単一選択モーダル",
  component: SingleSelectorModal,
} as ComponentMeta<typeof SingleSelectorModal>;

const Template: ComponentStory<typeof SingleSelectorModal> = (args) => (
  <SingleSelectorModal />
);

export const Main = Template.bind({});
Main.args = {};
