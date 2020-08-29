import React from 'react';
import Main from '../../src/pages/main';

import { render, waitForElement } from '@testing-library/react';

describe(' test login session', () => {
  it('Should receive 200 status', async () => {
    // rederizar o componente
    const { getByTestId } = render(<Main/>)
    // buscar o input
    const fieldNode = await waitForElement(() => getByTestId('form-field'));
    console.log(fieldNode);
    // adicionar valor ao input
    // buscar o botão
    // clicar no botão
    // e receber o status
})
})
