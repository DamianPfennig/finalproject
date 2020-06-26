import React from 'react';
import App from './App';
import { render, waitForElement } from '@testing-library/react';
import axios from 'axios';

jest.mock('axios');

test('App behavoir', async () => {
    axios.get.mockResolvedValue({
        data: {
            first: 'damian',
            last: 'pfennig',
            id: 1,
            imageUrl: '/hola.jpg',
            bio: 'hola'
        }
    });

    const { container } = render(<App />);

    await waitForElement(() => container.querySelector('div'));

    expect(container.children.length).ToBe(1);


})

