import { Form, useForm, formActions } from "@simpleview/sv-mosaic";
import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { drawerActions } from "../Utils/drawerActions";
import Drawer2 from "./Drawer2";
import Drawer3 from "./Drawer3";

const DrawerWrap = styled.div`
  width: 75vw;
`;

const Drawer1 = (props: any) => {
  const { state: formState, dispatch: formDispatch } = useForm();

  const [counter, setCounter] = useState(0);

  const { onClose, dispatch, childData } = props;

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
        name: "Field1",
        type: "text",
        label: "Field 1"
      },
      {
        name: "Field3",
        type: "text",
        label: "Field filled with data from previous drawer"
      }
    ],
    []
  );

  useEffect(() => {
    if (childData)
      formDispatch(
        formActions.setFieldValue({
          name: "Field3",
          value: childData["myField"]
        })
      );
  }, [childData]);

  return (
    <DrawerWrap>
      <h1>Drawer 1</h1>
      <button onClick={() => onClose({ childData: formState.data })}>
        Close
      </button>
      <button onClick={() => setCounter(counter + 1)}>
        Increment counter {counter}
      </button>
      <button
        onClick={() =>
          addDrawer({
            name: "drawer2",
            component: Drawer2
          })
        }
      >
        Open Drawer2
      </button>
      <button
        onClick={() =>
          addDrawer({
            name: "drawer3",
            component: Drawer3
          })
        }
      >
        Open Drawer3
      </button>
      {childData && <p>{JSON.stringify(childData, null, " ")}</p>}
      <Form
        title="Example #1"
        state={formState}
        dispatch={formDispatch}
        fields={fields}
        type="drawer"
        onCancel={() => onClose({ childData: formState.data })}
      />
    </DrawerWrap>
  );
};

export default Drawer1;
