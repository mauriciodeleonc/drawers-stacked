import { Form, useForm, formActions } from "@simpleview/sv-mosaic";
import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { drawerActions } from "../Utils/drawerActions";

const DrawerWrap = styled.div`
  width: 75vw;
`;

const Drawer1 = (props: any) => {
  const {
    state: formState,
    dispatch: formDispatch,
    registerOnSubmit
  } = useForm();

  const [counter, setCounter] = useState(0);
  const [drawerName, setName] = useState("Drawer 1");

  const { name, args, callbacks, dispatch, navigateBack } = props;

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
        label: "Field filled with data from previous drawer",
      }
    ],
    []
  );

  useEffect(() => {
	  formDispatch(
		  formActions.setFieldValue({name: "Field3", value: drawerName})
	  );
  }, [drawerName]);

  const changeName = (newName: any) => {
    setName(newName);
  };

  const onSubmit = useCallback(
    (data) => {
      alert(
        "Form submitted with the following data: " +
          JSON.stringify(data, null, " ")
      );
      callbacks.onSubmit();
    },
    [formState.validForm]
  );

  useMemo(() => {
    registerOnSubmit(onSubmit);
  }, [onSubmit, registerOnSubmit]);

  const clg = (data) => {
	alert("Previous Drawer");
  }

  const increment = () => {
	  setCounter(counter + 1);
  }

  return (
    <DrawerWrap>
      <h1>{drawerName}</h1>
      <button onClick={() => navigateBack(() => callbacks.onClose(formState.data))}>Close</button>
      <button onClick={() => setCounter(counter + 1)}>
        Increment counter {counter}
      </button>
      <button
        onClick={() =>
          addDrawer({
            name: "drawer2",
            args: { description: "Lorem ipsum..." },
            callbacks: {
              increment: increment,
              onClose: clg
            }
          })
        }
      >
        Open Drawer2
      </button>
      <button
        onClick={() =>
          addDrawer({ name: "drawer3", callbacks: { onClose: changeName } })
        }
      >
        Open Drawer3
      </button>
      {/* {childData && <p>{JSON.stringify(childData, null, " ")}</p>} */}
      <Form
        title={args?.title ? args?.title : 'Form #1' }
        state={formState}
        dispatch={formDispatch}
        fields={fields}
        type="drawer"
        onCancel={() => navigateBack(() => callbacks.onClose(formState.data))}
      />
    </DrawerWrap>
  );
};

export default Drawer1;
