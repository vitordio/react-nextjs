import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import db from '../db.json';
import QuizContainer from '../src/components/QuizContainer';
import QuizBackground from '../src/components/QuizBackground';
import Widget from '../src/components/Widget';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import Input from '../src/components/Input';
import Button from '../src/components/Button';

export default function Home() {
  // Inicializamos o Hook para que essa função tenha acesso aos dados de roteamento
  const router = useRouter();

  // Usamos a função setName que iremos chamar quando quisermos fazer a mudança de estado
  const [name, setName] = React.useState('');

  return (
    <QuizBackground backgroundImage={db.bg}>
      <Head>
        <title>Vikings - Quiz React</title>
      </Head>
      <QuizContainer>
        <Widget>
          <Widget.Header>
            <h1>VIKINGS</h1>
          </Widget.Header>
          <Widget.Content>
            <form onSubmit={(event) => {
              event.preventDefault();
              /*
              * quando enviarmos o formulário, o router do next, vai jogar a informação
              * para a página quiz
              * router manda para a próxima página
              * */
              router.push(`/quiz?name=${name}`);
            }}
            >
              {
                /*
                * O React trabalhar com States, que são as mudanças de estado dos componentes
                * que fazem com que o componente tenha ou não que ser renderizado novamente
                * */
              }
              <Input
                // Passamos no setName qual o novo estado
                name="nomeDoUsuario"
                onChange={(infosDoEvento) => { setName(infosDoEvento.target.value); }}
                placeholder="Diz ai seu nome para jogar..."
                value={name}
              />
              <Button type="submit" disabled={name.length === 0}>
                {`Jogar ${name}`}
              </Button>
            </form>
          </Widget.Content>
        </Widget>
        <Widget>
          <Widget.Content>
            <h1 style={{ color: `${db.theme.colors.primary}` }}>Quizes da Galera</h1>
            <ul>
              {db.external.map((linkExterno) => {
                const [projectName, githubUser] = linkExterno.
                  replace()
                const textoDoLink = linkExterno.replace('https://', '').replace('.vercel.app/', '')
                return (
                  <li>
                    <Widget.Option href={linkExterno}>
                      {textoDoLink}
                    </Widget.Option>
                  </li>
                );
              })}
            </ul>
              
          </Widget.Content>
        </Widget>
        <Footer />
        <GitHubCorner projectUrl="#" />
      </QuizContainer>
    </QuizBackground>
  );
}
