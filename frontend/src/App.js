import React from 'react';
import Routes from './routes';
import GlobalStyle from './styles/global';
import Container from './components/container/';

function App() {
  return (
    <>
      <GlobalStyle/>
      <Container>
        <Routes/>
      </Container>
    </>
  );
}

export default App;
