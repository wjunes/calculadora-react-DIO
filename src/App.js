import Button from './components/Button';
import Input from './components/Input';

import { Container, Content, Row } from './styles';
import { useState } from 'react';

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
        case 'X':
          setCurrentNumber((num1 * num2).toString());
          break;
        case '/':
          setCurrentNumber((num1 / num2).toString());
          break;
        case '%':
          setCurrentNumber((num1 * (num2 / 100)).toString());
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

  return (
    <Container>
      <Content>
        <Input value={currentNumber} />
        <Row>
          <Button label='*'/>
          <Button label='*'/>
          <Button label="." onClick={handleAddDot} />
          <Button label="/" onClick={() => handleMathOperation('/')} />
        </Row>
        <Row>
          <Button label="0" onClick={() => handleAddNumber('0')} />
          <Button label="%" onClick={() => handleMathOperation('%')} />
          <Button label="C" onClick={handleOnClear} />         
          <Button label="X" onClick={() => handleMathOperation('X')} />
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
