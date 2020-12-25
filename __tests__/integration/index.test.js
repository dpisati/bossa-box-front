// import * as React from 'react';
// import * as ReactDOM from 'react-dom';
// import 'jest-dom/extend-expect';
// import { render } from '@testing-library/react';

// import Modal from '../../../../components/Modal';


import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Home from "../../pages/index";

test("Check for Getting Started Text", () => {
  const { getByText } = render(<Home />);
  expect(getByText("VUTTR")).toBeInTheDocument();
});

// describe("test", () => {
//     it("should render sum", () => {
//         expect(2+2).toBe(4);
        
//     })
//     it("true", () => {
        
//         expect(true).toBe(true);
        
//     })
//     it("daniel", () => {
        
//         expect("Daniel").toBe("Daniel");
//     })
// })

// describe('ModalAdd component', () => {
//   it('should render add input fields ', () => {
//     const div = document.createElement('div');
//     ReactDOM.render(<Modal />, div)
//   })
// })


//   it('should render add input fields ', () => {
//     const { getByPlaceholderText } = render(<Modal />)
//     getByPlaceholderText('Tool title');
//     getByPlaceholderText('https://www.example.com');
//     getByPlaceholderText('Description of the tool...');
//     getByPlaceholderText('Tags');
//   })
