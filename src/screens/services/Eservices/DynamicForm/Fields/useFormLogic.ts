import {useRef, useState, useCallback} from 'react';

export const useFormLogic = () => {
  const formValuesRef = useRef<{[key: string]: any}>({});
  const visibilityRef = useRef<{[key: number]: boolean}>({});
  const requiredFieldsRef = useRef<Record<number, boolean>>({});

  const [, forceUpdate] = useState(0);

  // Update formValues
  const setFormValues = useCallback(
    (
      keyOrObject: string | Record<string, any>,
      value?: any,
      shouldRender = true,
    ) => {
      if (typeof keyOrObject === 'object') {
        Object.entries(keyOrObject).forEach(([k, v]) => {
          formValuesRef.current[k] = v;
        });
      } else {
        formValuesRef.current[keyOrObject] = value;
      }

      if (shouldRender) forceUpdate(v => v + 1);
    },
    [],
  );

  // Update visibility
  const setVisibility = useCallback(
    (update: {[key: number]: boolean}, shouldRender = false) => {
      visibilityRef.current = {
        ...visibilityRef.current,
        ...update,
      };
      if (shouldRender) forceUpdate(v => v + 1);
    },
    [],
  );

  // Update requiredFields
  const setRequiredFields = useCallback(
    (update: Record<number, boolean>, shouldRender = false) => {
      requiredFieldsRef.current = {
        ...requiredFieldsRef.current,
        ...update,
      };
      if (shouldRender) forceUpdate(v => v + 1);
    },
    [],
  );

  return {
    formValues: formValuesRef.current,
    setFormValues,
    visibility: visibilityRef.current,
    setVisibility,
    requiredFields: requiredFieldsRef.current,
    setRequiredFields,
  };
};
