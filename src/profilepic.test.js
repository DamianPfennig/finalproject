import React from 'react';
import ProfilePic from './profilepic.js';
import { render, fireEvent } from '@testing-library/react';

// test('', () => {
//     const { container } = render(<ProfilePic imageUrl="/anyUrl.jpg" />)

//     expect(container.querySelector('img').getAttribute('src')).toBe("/anyUrl.jpg")
// })

// test('describing test', () => {
//     const { container } = render(<ProfilePic />)

//     expect(container.querySelector('img').getAttribute('src')).ToBe('/default.png')
// })

// test('passing alt attributes', ()=> {
//     const {container}= render(<ProfilePic first='damian' last='pfennig'/>)

//     expect(container.querySelector('img').getAttribute('alt').ToBe('damian' 'pfennig'))
// })

// test('onClick', () => {
//     const myMockOnClick = jest.fn();
//     const { container } = render(<ProfilePic toggleModal={myMockOnClick} />)

//     fireEvent.click(container.querySelector('img'));
//     fireEvent.click(container.querySelector('img'));

//     expect(myMockOnClick.mock.calls.length).ToBe(2);
// })