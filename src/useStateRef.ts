import { useRef, useEffect } from "react";

/** Creates a ref which can store a state variable and keep it updated with each re-render */
function useStateRef<T>(state: T) {
  const ref = useRef<T>(state);
  useEffect(() => {
    ref.current = state;
  });

  return ref;
}

export default useStateRef;
