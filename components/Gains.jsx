'use client';

import { useMemo, useState } from 'react';
import SavingsModel from './SavingsModel';
import { TimeBack } from './Sections';
import { CURRENCIES, DEFAULT_ASSUMPTIONS, computeModel } from '@/lib/model';

// Holds the calculator state, so the "extra hours" section updates with it.
export default function Gains() {
  const [currency, setCurrencyState] = useState('EUR');
  const [inputs, setInputs] = useState({ properties: 60, adr: CURRENCIES.EUR.adr, occupancy: 68, rating: 4.4 });
  const [assumptions, setAssumptions] = useState(DEFAULT_ASSUMPTIONS);

  const setInput = (k, v) => setInputs((s) => ({ ...s, [k]: v }));
  const setAssumption = (k, v) => setAssumptions((s) => ({ ...s, [k]: v }));
  const setCurrency = (c) => {
    setCurrencyState(c);
    setInputs((s) => ({ ...s, adr: CURRENCIES[c].adr }));
    setAssumptions((s) => ({ ...s, rate: CURRENCIES[c].rate }));
  };

  const result = useMemo(() => computeModel(inputs, assumptions), [inputs, assumptions]);
  const hours = new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(result.hoursSaved);

  return (
    <>
      <SavingsModel
        currency={currency}
        setCurrency={setCurrency}
        inputs={inputs}
        setInput={setInput}
        assumptions={assumptions}
        setAssumption={setAssumption}
        result={result}
      />
      <TimeBack hours={hours} />
    </>
  );
}
