import React from 'react';
import Head from 'next/head';
import db from '../db.json';

import Widget from '../src/components/Widget';
import QuizContainer from '../src/components/QuizContainer';
import QuizBackground from '../src/components/QuizBackground';
import GitHubCorner from '../src/components/GitHubCorner';
import AlternativeForm from '../src/components/AlternativeForm';
import Button from '../src/components/Button';

function ResultWidget({ results }) {
  return (
    <Widget>
      <Widget.Header>
        Parabéns!
      </Widget.Header>
      <Widget.Content>
        <p>
          Você acertou
          {' '}
          {/* {results.reduce((somatoriaAtual, resultAtual) => {
            const isAcerto = resultAtual === true;
            if(isAcerto) {
              return somatoriaAtual + 1;
            }
            return somatoriaAtual;
          }, 0)} */}

          {results.filter((x) => x).length}
          
          {' '}
          perguntas!
        </p>
        <ul>
          {results.map((resultados, index) => (
            <li key={`result_${index}`}>
              #{index + 1} Resultado: {resultados ? 'Acertou' : 'Errou'}
            </li>
          ))}
        </ul>
      </Widget.Content>
    </Widget>
  );
}

function LoadingWidget() {
  return (
    <Widget>
      <Widget.Header>
        Carregando
      </Widget.Header>
      <Widget.Content>
        [Desafio do Loading]
      </Widget.Content>
    </Widget>
  );
}

function QuestionWidget({ question, totalQuestions, questionIndex, onSubmit, addResult }) {
  const [selectedAlternative, setSelectedAlternative] = React.useState(undefined);
  const [isQuestionSubmited, setIsQuestionSubmited] = React.useState(false);
  const questionId = `question_${questionIndex}`;
  const isCorrect = selectedAlternative === question.answer;
  const hasAlternativeSelected = selectedAlternative !== undefined;

  return (
    <Widget>
      <Widget.Header>
        <h1>
          {`Pergunta ${questionIndex + 1} de ${totalQuestions}`}
        </h1>
      </Widget.Header>
      <img
        alt="Descrição do Quiz"
        style={{
          width: '100%',
          height: '160px',
          objectFit: 'cover',
        }}
        src={question.image}
      />
      <Widget.Content>
        <Widget.SubTitle>
          <h2>
            {question.title}
          </h2>
        </Widget.SubTitle>
        {/* <p>
          {question.description}
        </p> */}
        <AlternativeForm onSubmit={(event) => {
          event.preventDefault(); // remove as configurações default de recarregar a página no submit
          setIsQuestionSubmited(true);

          setTimeout(() => {
            addResult(isCorrect);
            setIsQuestionSubmited(false);
            setSelectedAlternative(undefined);
            onSubmit(); // executa a função 
          }, 2 * 1000)
        }}>
          {question.alternatives.map((alternative, alternativeIndex) => {
            const alternativeId = `alternative_id_${alternativeIndex}`;
            const alternativeStatus = isCorrect ? 'SUCCESS' : 'ERROR';
            const isSelected = selectedAlternative === alternativeIndex;
            return (
              <Widget.Option
                as="label"
                key={alternativeId}
                htmlFor={alternativeId}
                data-status={isQuestionSubmited && alternativeStatus}
                data-selected={isSelected}
              >
                <input
                  style={{ display: 'none' }}
                  id={alternativeId}
                  name={questionId}
                  onChange={() => setSelectedAlternative(alternativeIndex)}
                  type="radio"
                />
                {alternative}
              </Widget.Option>
            ); 
          })}
          <Button type="submit" disabled={ !hasAlternativeSelected }>
            Confirmar
          </Button>
        </AlternativeForm>
        {/* <p>selectedAlternative: {selectedAlternative}</p> */}
        { isQuestionSubmited && isCorrect && <p>Você acertou!</p> }
        { isQuestionSubmited && !isCorrect && <p>Você errou!</p> }
      </Widget.Content>
    </Widget>
  );
}

const screenStates = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESULT'
};

export default function QuizPage() {
  // console.log('Perguntas feitas', db.questions);
  const [screenState, setScreenState] = React.useState(screenStates.LOADING);
  const [results, setResults] = React.useState([]);
  const [currentQuestion, setCurrentQuestionState] = React.useState(0);
  const totalQuestions = db.questions.length;
  const questionIndex = currentQuestion;
  const question = db.questions[questionIndex];

  function addResult(result) {
    setResults([
      ...results,
      result
    ])
  }

  // Ciclo de vida do React - do componente
  React.useEffect(() => {
    setTimeout(() => {
      setScreenState(screenStates.QUIZ);
    }, 1 * 1000)
  // nasce => didMount
  }, []);
  
  // Função que intercepta o Submit da questão
  function handleSubmit() {
    const nextQuestion = questionIndex + 1;

    if(nextQuestion < totalQuestions) {
      setCurrentQuestionState(nextQuestion);
    } else {
      setScreenState(screenStates.RESULT)
    }
  }

  return (
    <QuizBackground backgroundImage={db.bg}>
      <Head>
        <title>Vikings - Perguntas</title>
      </Head>
      <QuizContainer>
        {screenState === screenStates.QUIZ && (
          <QuestionWidget
            question={question}
            questionIndex={questionIndex}
            totalQuestions={totalQuestions}
            onSubmit={handleSubmit}
            addResult={addResult}
          />
        )}
        {screenState === screenStates.LOADING && (
          <LoadingWidget />
        )}
        {screenState === screenStates.RESULT && (
          <ResultWidget
            results={results}/>
        )}
      </QuizContainer>
      <GitHubCorner projectUrl="#" />
    </QuizBackground>
  );
}
