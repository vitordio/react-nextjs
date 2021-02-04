import styled from 'styled-components';

const Widget = styled.div`
  margin-top: 24px;
  margin-bottom: 24px;
  border: 0px solid ${({ theme }) => theme.colors.primary};
  background-color: ${({ theme }) => theme.colors.contrastText};
  border-radius: 4px;
  overflow: hidden;
  h1, h2, h3 {
    font-size: 15px;
    font-weight: 700;
    line-height: 1;
    margin-bottom: 0;
  }
  p {
    font-size: 15px;
    font-weight: 400;
    line-height: 1;
    color: ${({ theme }) => theme.colors.primary}
  }
  ul,li {
    font-size: 15px;
    line-height: 1.6;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.primary}
  }
`;

Widget.Header = styled.header`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 18px 32px;
  background-color: ${({ theme }) => theme.colors.primary};
  text-align: center;
  * {
    margin: 0;
  }
`;

Widget.Content = styled.div`
  padding: 24px 32px 32px 32px;
  & > *:first-child {
    margin-top: 0;
  }
  & > *:last-child {
    margin-bottom: 0;
  }
  ul {
    list-style: none;
    padding: 0;
  }
`;

Widget.SubTitle = styled.h2`
  color: #000;
  margin-bottom: 15px !important;
`;

Widget.Option = styled.a`
  outline: 0;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.contrastText};
  background-color: ${({ theme }) => `${theme.colors.primary}`};
  padding: 10px 15px;
  margin-bottom: 8px;
  cursor: pointer;
  border-radius: ${({ theme }) => theme.borderRadius};
  transition: .3s;
  display: block;
  
  &:hover,
  &:focus {
    opacity: .5;
  }
`;

export default Widget;
