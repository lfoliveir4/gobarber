import React, {useEffect, useRef} from 'react';
import {TextInputProps} from 'react-native';
import {useField} from '@unform/core';

import * as Styles from './styles';

interface InputProps extends TextInputProps {
  name: string;
  icon: string;
}

interface InputValueReference {
  value: string;
}

const Input: React.FC<InputProps> = ({name, icon, ...rest}) => {
  const inputElementRef = useRef<any>(null);

  const {clearError, fieldName, registerField, error, defaultValue} = useField(
    name,
  );

  const inputValueRef = useRef<InputValueReference>({value: defaultValue});

  useEffect(() => {
    registerField<string>({
      name: fieldName,
      ref: inputValueRef.current,
      path: 'value',
      setValue(ref: any, value) {
        inputValueRef.current.value = value;
        inputElementRef.current.setNativeProps({text: value});
      },

      clearValue() {
        inputValueRef.current.value = '';
        inputElementRef.current.clear();
      },
    });
  }, [fieldName, registerField]);

  return (
    <Styles.Container>
      <Styles.Icon name={icon} size={20} color="#666360" />

      <Styles.TextInput
        ref={inputElementRef}
        keyboardAppearance="dark"
        placeholderTextColor="#666360"
        defaultValue={defaultValue}
        onChangeText={(value) => {
          inputValueRef.current.value = value;
        }}
        {...rest}
      />
    </Styles.Container>
  );
};

export default Input;
