

import React, { useState, useEffect } from 'react';
import Button from './components/Button';
import Input from './components/Input';


import { Container, Content, Row } from './styles';

const App = () => {
  const [currentNumber, setCurrentNumber] = useState('0');
  const [firstNumber, setFirstNumber] = useState('0');
  const [operation, setOperation] = useState('');

  const handleOnClear = () => {
    setCurrentNumber('0');
    setFirstNumber('0');
    setOperation('');
  };

  const handleAddNumber = (number) => {
    setCurrentNumber((prev) => (prev === '0' ? '' : prev) + number);
  };

  const handleMathOperation = (op) => {
    if (firstNumber === '0') {
      setFirstNumber(currentNumber);
      setCurrentNumber('0');
      setOperation(op);
    } else {
      calculateResult();
      setOperation(op);
    }
  };

  const handleAddDot = () => {
    if (!currentNumber.includes('.')) {
      setCurrentNumber((prev) => prev + '.');
    }
  };

  const calculateResult = () => {
    if (firstNumber !== '0' && operation !== '' && currentNumber !== '0') {
      const num1 = parseFloat(firstNumber);
      const num2 = parseFloat(currentNumber);

      switch (operation) {
        case '+':
          setCurrentNumber((num1 + num2).toString());
          break;
        case '-':
          setCurrentNumber((num1 - num2).toString());
          break;
        case `*`:
          setCurrentNumber((num1 * num2).toString());
          break;
        case '/':
          setCurrentNumber((num1 / num2).toString());
          break;
        case '%':
          setCurrentNumber((num1 * (num2 / 100)).toString());
          break;
        case '^':
          setCurrentNumber(Math.pow(num1, num2).toString());
          break;
        default:
          break;
      }

      setFirstNumber('0');
      setOperation('');
    }
  };

  const handleEquals = () => {
    calculateResult();
  };

  const handleSquareRoot = () => {
    if (currentNumber !== '0') {
      setCurrentNumber(Math.sqrt(parseFloat(currentNumber)).toString());
    }
  };
  
  const handlePower = () => {
    if (firstNumber !== '0' && operation === '^' && currentNumber !== '0') {
      setCurrentNumber(Math.pow(parseFloat(firstNumber), parseFloat(currentNumber)).toString());
      setFirstNumber('0');
      setOperation('');
    } else {
      setFirstNumber(currentNumber);
      setCurrentNumber('0');
      setOperation('^');
    }
  };
  
  const handleLogarithm = () => {
    if (currentNumber !== '0') {
      setCurrentNumber(Math.log10(parseFloat(currentNumber)).toString());
    }
  };
  
  const handleTrigonometricFunction = (func) => {
    if (currentNumber !== '0') {
      const value = parseFloat(currentNumber);
      switch (func) {
        case 'sin':
          setCurrentNumber(Math.sin(value).toString());
          break;
        case 'cos':
          setCurrentNumber(Math.cos(value).toString());
          break;
        case 'tan':
          setCurrentNumber(Math.tan(value).toString());
          break;
        default:
          break;
      }
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      const key = event.key.toLowerCase();

      if (/\d/.test(key)) {
        handleAddNumber(key);
      } else if (['+', '-', `*`, '/'].includes(key)) {
        handleMathOperation(key);
      } else if (key === 'enter') {
        handleEquals();
      } else if (key === '.') {
        handleAddDot();
      } else if (key === 'escape') {
        handleOnClear();
      } else if (key === 'q') {
        handleSquareRoot();
      } else if (key === 'w') {
        handlePower();
      } else if (key === 'e') {
        handleLogarithm();
      } else if (key === 'r') {
        handleTrigonometricFunction('sin');
      } else if (key === 't') {
        handleTrigonometricFunction('cos');
      } else if (key === 'y') {
        handleTrigonometricFunction('tan');
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleAddNumber, handleMathOperation, handleAddDot, handleEquals, handleOnClear,
      handleSquareRoot, handlePower, handleLogarithm, handleTrigonometricFunction]);

  return (
    <Container tabIndex="0" onKeyDown={(e) => e.preventDefault()}>
      <Content>
        <Input value={currentNumber} />
        <Row>
          <Button label="√" onClick={handleSquareRoot} />
          <Button label="x^n" onClick={handlePower} />
          <Button label="log" onClick={handleLogarithm} />
          <Button label="sin" onClick={() => handleTrigonometricFunction('sin')} />
        </Row>

        <Row>
          <Button label="cos" onClick={() => handleTrigonometricFunction('cos')} />
          <Button label="tan" onClick={() => handleTrigonometricFunction('tan')} />
          <Button label="." onClick={handleAddDot} />
          <Button label="/" onClick={() => handleMathOperation('/')} />
        </Row>
        <Row>
          <Button label="0" onClick={() => handleAddNumber('0')} />
          <Button label="%" onClick={() => handleMathOperation('%')} />
          <Button label="C" onClick={handleOnClear} />
          <Button label="X" onClick={() => handleMathOperation('*')} />
        </Row>
        <Row>
          <Button label="7" onClick={() => handleAddNumber('7')} />
          <Button label="8" onClick={() => handleAddNumber('8')} />
          <Button label="9" onClick={() => handleAddNumber('9')} />
          <Button label="-" onClick={() => handleMathOperation('-')} />
        </Row>
        <Row>
          <Button label="4" onClick={() => handleAddNumber('4')} />
          <Button label="5" onClick={() => handleAddNumber('5')} />
          <Button label="6" onClick={() => handleAddNumber('6')} />
          <Button label="+" onClick={() => handleMathOperation('+')} />
        </Row>
        <Row>
          <Button label="1" onClick={() => handleAddNumber('1')} />
          <Button label="2" onClick={() => handleAddNumber('2')} />
          <Button label="3" onClick={() => handleAddNumber('3')} />
          <Button label="=" onClick={handleEquals} />
        </Row>

      </Content>
    </Container>
  );
};

export default App;
