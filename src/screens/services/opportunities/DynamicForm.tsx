import React, {useEffect, useMemo, useRef, useState} from 'react';
import {Alert, View} from 'react-native';
import {Formik, useFormikContext} from 'formik';
import * as Yup from 'yup';
import {
  FieldSchema,
  getOpportunityFieldOptions,
  SchemaOption,
} from '../../../redux/reducers/opportunity/thunk/opportunityThunk';
import {useAppDispatch} from '../../../redux/store';
import Input from '../../../component/input/Input';
import ActionButtons from '../IndustrialServices/ActionButtons';

type Props = {
  fields: FieldSchema[];
  onSubmit: (values: any) => void;
};

type OptionsByKey = Record<string, SchemaOption[]>;

const toDropdownItems = (opts: SchemaOption[] = []) =>
  opts.map(o => ({label: o.text, value: o.value, ...o}));

function DependentOptionsLoader({
  fields,
  setOptionsByKey,
}: {
  fields: FieldSchema[];
  setOptionsByKey: React.Dispatch<React.SetStateAction<OptionsByKey>>;
}) {
  const dispatch = useAppDispatch();
  const {values, setFieldValue} = useFormikContext<any>();
  const prevParentsRef = useRef<Record<string, any>>({});

  const dependentFields = useMemo(
    () =>
      fields.filter(f => f.type === 'select' && f.dependentOn && f.optionsUrl),
    [fields],
  );

  useEffect(() => {
    (async () => {
      for (const f of dependentFields) {
        const parentKey = f.dependentOn!;
        const parentValue = values?.[parentKey];
        const prevParentValue = prevParentsRef.current[parentKey];

        if (parentValue !== prevParentValue) {
          setFieldValue(f.key, '');

          setOptionsByKey(prev => ({...prev, [f.key]: []}));

          if (parentValue) {
            const res: any = await dispatch(
              getOpportunityFieldOptions({
                optionsUrl: f.optionsUrl!,
                parentValue,
              }),
            );

            const payload = res?.payload;

            if (payload?.networkSuccess) {
              const list =
                payload?.result ??
                payload?.Data?.result ??
                payload?.Data ??
                payload?.Result ??
                [];

              if (Array.isArray(list)) {
                setOptionsByKey(prev => ({...prev, [f.key]: list}));
              } else {
                setOptionsByKey(prev => ({...prev, [f.key]: []}));
              }
            } else {
              setOptionsByKey(prev => ({...prev, [f.key]: []}));
            }
          }
        }
      }

      const next: Record<string, any> = {...prevParentsRef.current};
      for (const f of dependentFields) {
        next[f.dependentOn!] = values?.[f.dependentOn!];
      }
      prevParentsRef.current = next;
    })();
  }, [values, dependentFields, dispatch, setFieldValue, setOptionsByKey]);

  return null;
}

export default function DynamicForm({fields, onSubmit}: Props) {
  const [optionsByKey, setOptionsByKey] = useState<OptionsByKey>({});

  useEffect(() => {
    const initial: OptionsByKey = {};
    fields.forEach(f => {
      if (f.type === 'select') initial[f.key] = f.options ?? [];
    });
    setOptionsByKey(initial);
  }, [fields]);

  const initialValues = useMemo(() => {
    const obj: any = {};
    fields.forEach(f => {
      switch (f.type) {
        case 'checkbox':
          obj[f.key] = false;
          break;
        default:
          obj[f.key] = '';
      }
    });
    return obj;
  }, [fields]);

  const validationSchema = useMemo(() => {
    const shape: Record<string, any> = {};

    fields.forEach(f => {
      let rule: any;

      if (f.type === 'number') {
        rule = Yup.number().typeError('Numeric only');
      } else if (f.type === 'checkbox') {
        rule = Yup.boolean();
      } else {
        rule = Yup.string();
      }

      if (f.maxLength && f.maxLength > 0 && f.type === 'text') {
        rule = rule.max(f.maxLength, `Max length ${f.maxLength}`);
      }

      if (f.isRequired) {
        if (f.type === 'checkbox') rule = rule.oneOf([true], 'Required');
        else rule = rule.required('Required');
      }

      shape[f.key] = rule;
    });

    return Yup.object().shape(shape);
  }, [fields]);

  const normalizeNumberInput = (v: string) => v.replace(/[^\d.]/g, '');

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      validationSchema={validationSchema}
      onSubmit={vals => {
        const parsed: any = {...vals};
        fields.forEach(f => {
          if (f.type === 'number' && parsed[f.key] !== '') {
            const n = Number(parsed[f.key]);
            parsed[f.key] = Number.isNaN(n) ? parsed[f.key] : n;
          }
        });
        onSubmit(parsed);
      }}>
      {({values, errors, touched, setFieldValue, handleSubmit}) => {
        const isDependentDisabled = (f: FieldSchema) => {
          if (!f.dependentOn) return false;
          const parentVal = values?.[f.dependentOn];
          return !parentVal;
        };

        return (
          <View>
            <DependentOptionsLoader
              fields={fields}
              setOptionsByKey={setOptionsByKey}
            />

            {fields.map(f => {
              const errorMsg =
                (touched as any)[f.key] && (errors as any)[f.key];

              if (f.type === 'select') {
                const items = toDropdownItems(
                  optionsByKey[f.key] ?? f.options ?? [],
                );
                return (
                  <Input
                    key={f.key}
                    dropdown
                    label={f.label}
                    items={items}
                    value={values[f.key]}
                    onChange={(v: any) => setFieldValue(f.key, v?.value)}
                    requiredStar={!!f.isRequired}
                    error={errorMsg}
                    required={errorMsg}
                    disabled={isDependentDisabled(f)}
                  />
                );
              }

              if (f.type === 'number') {
                return (
                  <Input
                    key={f.key}
                    textInput
                    label={f.label}
                    value={String(values[f.key] ?? '')}
                    onChangeText={(v: string) =>
                      setFieldValue(f.key, normalizeNumberInput(v))
                    }
                    requiredStar={!!f.isRequired}
                    error={errorMsg}
                    required={errorMsg}
                  />
                );
              }

              if (f.type === 'checkbox') {
                return (
                  <Input
                    key={f.key}
                    checkbox
                    title={f.label}
                    checked={!!values[f.key]}
                    onPress={() => setFieldValue(f.key, !values[f.key])}
                    requiredStar={!!f.isRequired}
                    error={errorMsg}
                    required={errorMsg}
                  />
                );
              }

              return (
                <Input
                  key={f.key}
                  textInput
                  label={f.label}
                  value={values[f.key]}
                  onChangeText={(v: string) => setFieldValue(f.key, v)}
                  requiredStar={!!f.isRequired}
                  error={errorMsg}
                  required={errorMsg}
                />
              );
            })}

            <ActionButtons
              onSubmit={() => {
                if (Object.keys(errors).length > 0) {
                  Alert.alert('Error', 'Please fix validation errors');
                  return;
                }
                handleSubmit();
              }}
              onSaveDraft={() => {
                onSubmit({...values, isDraft: 1});
              }}
            />
          </View>
        );
      }}
    </Formik>
  );
}
