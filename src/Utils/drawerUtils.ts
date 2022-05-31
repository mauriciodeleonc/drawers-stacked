import { useMemo, useRef, useCallback, useReducer } from "react";

type State = {
  drawers: any[];
};

type Action = {
  type: string;
  value: any;
  name: string;
};

export function joinReducers(...reducers) {
  return function (state, action) {
    let newState = state;
    for (const reducer of reducers) {
      newState = reducer(newState, action);
    }
    return newState;
  };
}

export function useThunkReducer(reducer, initialState, extraArgs) {
  const lastState = useRef(initialState);
  const getState = useCallback(() => {
    const state = lastState.current;
    return state;
  }, []);
  const enhancedReducer = useCallback(
    (state, action) => {
      const newState = reducer(state, action);
      lastState.current = newState;
      return newState;
    },
    [reducer]
  );
  const [state, dispatch] = useReducer(enhancedReducer, initialState);

  const customDispatch = useCallback(
    (action) => {
      if (typeof action === "function") {
        return action(customDispatch, getState, extraArgs);
      } else {
        return dispatch(action);
      }
    },
    [getState, extraArgs]
  );

  return [state, customDispatch];
}

export function coreReducer(state: State, action: Action): State {
  switch (action.type) {
    case "UPDATE_DRAWERS":
      return {
        ...state,
        drawers: action.value
      };
    //These actions can become a single one
    // and the value could be the new drawers array.
    // case "NEXT_DRAWER":
    //   return {
    //     ...state,
    //     drawers: [...state.drawers, action.value]
    //   };
    // case "PREVIOUS_DRAWER":
    //   const newDrawers = state.drawers.slice(0, -1);

    //   return {
    //     ...state,
    //     drawers: newDrawers
    //   };
    default:
      return state;
  }
}

export function useDrawers({
  customReducer
}: { customReducer?: ((state: State, action: Action) => any)[] } = {}) {
  const extraArgs = useRef({});
  const reducer = useMemo(() => {
    return customReducer
      ? joinReducers(coreReducer, customReducer)
      : coreReducer;
  }, [customReducer]);

  const [state, dispatch] = useThunkReducer(
    reducer,
    {
      drawers: []
    },
    extraArgs.current
  );

  return {
    state,
    dispatch
  };
}
