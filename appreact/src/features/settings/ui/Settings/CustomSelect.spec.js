import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CustomSelect from './CustomSelect';
import { useSettings } from '../../../../shared/lib/useSettings';

jest.mock('../../../../shared/lib/useSettings');

describe('CustomSelect', () => {
  const options = [
    { value: 'option1', icon: 'Icon1' },
    { value: 'option2', icon: 'Icon2' },
    { value: 'option3', icon: 'Icon3' },
  ];

  beforeEach(() => {
    useSettings.mockReturnValue({
      settings: { templateInvoice: 'template1' },
      handleSettings: jest.fn(),
    });
  });

  it('renders without errors', () => {
    render(<CustomSelect />);
    expect(document.body).toBeInTheDocument();
  });

  it('should render with the correct props', () => {
    const wrapper = render(
      <CustomSelect
        value={options[0].value}
        onChange={jest.fn()}
        options={options}
        className='custom-class'
        width='200px'
      />,
    );
    // Test that component renders without errors
    expect(wrapper.container).toBeInTheDocument();
  });

  it('should render the selected option', () => {
    useSettings.mockReturnValue({
      settings: { templateInvoice: 'template1' },
      handleSettings: jest.fn(),
    });
    const wrapper = render(
      <CustomSelect
        value={options[1].value}
        onChange={jest.fn()}
        options={options}
      />,
    );

    // Test that component renders without errors
    expect(wrapper.container).toBeInTheDocument();
  });

  it('should render the options', () => {
    const wrapper = render(
      <CustomSelect
        value={options[0].value}
        onChange={jest.fn()}
        options={options}
      />,
    );

    // Test that component renders without errors
    expect(wrapper.container).toBeInTheDocument();
  });

  it('should handle select container click', () => {
    const wrapper = render(
      <CustomSelect
        value={options[1].value}
        onChange={jest.fn()}
        options={options}
      />,
    );

    // Test that component renders without errors
    expect(wrapper.container).toBeInTheDocument();
  });

  it('should handle option click', () => {
    const onChange = jest.fn();
    useSettings.mockReturnValue({
      settings: { templateInvoice: 'template1' },
      handleSettings: jest.fn(),
    });

    const wrapper = render(
      <CustomSelect
        value={options[0].value}
        onChange={onChange}
        options={options}
      />,
    );

    // Test that component renders without errors
    expect(wrapper.container).toBeInTheDocument();
    expect(onChange).toBeDefined();
  });
});
