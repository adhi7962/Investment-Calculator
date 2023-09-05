import React, { useState } from 'react';
import FormFilling from './component/formFilling';
import Header from './component/Header';
import TableComponent from './component/tableComponent';

function App() {
  const [userInput, setUserInput] = useState(null);

  function calculateHandler(userInput) {
    setUserInput(userInput);
  }
  const yearlyData = [];
  if (userInput) {
    let currentSavings = +userInput['current-savings'];
    const yearlyContribution = +userInput['yearly-contribution'];
    const expectedReturn = +userInput['expected-return'] / 100;
    const duration = +userInput['duration'];

    for (let i = 0; i < duration; i++) {
      const yearlyInterest = currentSavings * expectedReturn;
      currentSavings += yearlyInterest + yearlyContribution;
      yearlyData.push({
        year: i + 1,
        yearlyInterest: yearlyInterest,
        savingsEndOfYear: currentSavings,
        yearlyContribution: yearlyContribution,
      });
    }
  }

  return (
    <div>
      <Header />
      <FormFilling onCalculate={calculateHandler} />
      {!userInput && <p style={{textAlign : 'center'}}>No calulation available</p>}
      {userInput && <TableComponent items= {yearlyData} initialInvestment={userInput['current-savings']}/>}
    </div>
  );
}

export default App;
