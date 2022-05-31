import React, { memo, useMemo } from "react";
import styled from "styled-components";
import Drawer1 from "./Drawer1";
import Drawer2 from "./Drawer2";
import { drawerActions } from "../Utils/drawerActions";
import { Form, useForm } from "@simpleview/sv-mosaic";

const DrawerWrap = styled.div`
  width: 75vw;
`;

const Drawer3 = (props: any) => {
  const { state: formState, dispatch: formDispatch } = useForm();

  const { dispatch, onClose } = props;

  const addDrawer = (component: any) => {
    dispatch(
      drawerActions.navigateForward({
        to: component
      })
    );
  };

  const fields = useMemo(
    () => [
      {
        name: "myField",
        type: "text",
        label: "My Field"
      }
    ],
    []
  );

  return (
    <DrawerWrap>
      <h1>Drawer3</h1>
      <button onClick={() => onClose({ childData: formState.data })}>
        Close
      </button>
      <button
        onClick={() => addDrawer({ name: "drawer1", component: Drawer1 })}
      >
        Open Drawer1
      </button>
      <button
        onClick={() => addDrawer({ name: "drawer2", component: Drawer2 })}
      >
        Open Drawer2
      </button>
      <Form
        title="Example #3"
        state={formState}
        dispatch={formDispatch}
        fields={fields}
        type="drawer"
        onCancel={() => onClose({ childData: formState.data })}
      />
    </DrawerWrap>
  );
};

export default Drawer3;
