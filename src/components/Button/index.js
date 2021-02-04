import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
    width: 100%;
    display: block;
    padding: 14px;
    border: 0px solid;
    border-radius: 3px;
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.contrastText};
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
    cursor: pointer;

    &:disabled {
        background-color: ${({ theme }) => theme.colors.disabled};
        cursor: unset;
    }
`;

export default Button;