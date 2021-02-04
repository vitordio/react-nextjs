import React from 'react';
import styled from 'styled-components';

const InputBase = styled.input`
    width: 100%;
    padding: 15px;
    border-radius: 3px;
    font-size: 13px;
    border: 1px solid ${({ theme }) => theme.colors.disabled};
    margin-bottom: 25px;

    &:focus {
        outline: ${({ theme }) => theme.colors.primary} auto 1px;
    }
`;

export default function Input({ onChange, placeholder, ...props }) {
  return (
    <div>
      <InputBase
        placeholder={placeholder}
        onChange={onChange}
        {...props}
      />
    </div>
  );
}
