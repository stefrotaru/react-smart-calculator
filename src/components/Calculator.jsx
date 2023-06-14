import { useState, useEffect } from "react";
import CalculatorHistory from "./CalculatorHistory";

function Calculator() {
  const [calc, setCalc] = useState("");
  const [result, setResult] = useState("");
  const [previousEntries, setPreviousEntries] = useState([]);
  const [resetCalc, setResetCalc] = useState(false);

  useEffect(() => {
    if (previousEntries.length > 6) {
      const newArr = [...previousEntries]
      newArr.shift()

      console.log(newArr)
      setPreviousEntries(newArr)
    }
  }, [previousEntries, setPreviousEntries])

  const operators = ["/", "*", "+", "-", "."];

  const updateCalc = (value) => {
    if (
      (operators.includes(value) && calc === "") ||
      (operators.includes(value) && operators.includes(calc.slice(-1)))
    ) {
      return;
    }

    if (resetCalc) {
      setResetCalc(false);
      if (operators.includes(value)) {
        return setCalc(calc + value);
      }
      setCalc(value);
      setResult(value);
      return;
    }
    

    if (resetCalc && checkIfOperation() === "false") {
        setCalc(calc + value);
    }


    setCalc(calc + value);
    if (!operators.includes(value)) {
      setResult(eval(calc + value).toString());
    }
  };

  const createDigits = () => {
    const digits = [];
    for (let i = 1; i < 10; i++) {
      digits.push(
        <button key={i} onClick={() => updateCalc(i.toString())}>
          {i}
        </button>
      );
    }
    return digits;
  };

  const checkIfOperation = () => {
    let check = false;
    operators.forEach(operator => {
      if (calc.includes(operator)) {
        return check = true
      }
    })
    return check
  }

  const calculate = () => {
    console.log('checkIfOperation: ', checkIfOperation())
    if(!result || !checkIfOperation()) {
        return;
    }

    setCalc(eval(calc).toString());

    let historyData = {
      calc: calc,
      result: result,
    };
    setPreviousEntries([...previousEntries, historyData]);

    setResult("");
    setResetCalc(true);
  };

  const deleteLast = () => {
    if (calc === "") {
      return;
    }
    const value = calc.slice(0, -1);
    setCalc(value);
    setResult(value);
  };

  return (
    <>
      <div className="calculator_container">
        <div className="calculator">
          <div className="display">
            {result !== "" ? <span>({result})</span> : ""}
            &nbsp;
            {calc || "0"}
          </div>

          <div className="operators">
            <button onClick={() => updateCalc("/")}>/</button>
            <button onClick={() => updateCalc("*")}>*</button>
            <button onClick={() => updateCalc("+")}>+</button>
            <button onClick={() => updateCalc("-")}>-</button>

            <button onClick={deleteLast}>DEL</button>
          </div>

          <div className="digits">
            {createDigits()}
            <button onClick={() => updateCalc("0")}>0</button>
            <button onClick={() => updateCalc(".")}>.</button>

            <button onClick={calculate}>=</button>
          </div>
        </div>
        <CalculatorHistory previousEntries={previousEntries} result={result}/>
      </div>
    </>
  );
}

export default Calculator;