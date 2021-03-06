import styled from 'styled-components'

/*
  Ao invés de realizar a criação do component todo
  o styled components nos permite criar uma variável
  com o nome do componente que queremos e usar o styled.atributo
  
function Title(props) { // propcidades do React/
  return (
    <h1>
      {props.children}
    </h1> 
  ) 
}
*/

const Title = styled.h1`
  font-size: 50px;
  color: ${({ theme }) => theme.colors.primary};
`

export default function Home() {
  return <Title>My page</Title>
}

// Ciclo de vida do React - do componente
// [ React chama de: Efeitos ||Efects ] => React.useEffect

// É montado na tela = nasce      => didMount
// Faz as ações      = atualizado => willUpdate
// Sai da tela       = morre      => willUnmount
