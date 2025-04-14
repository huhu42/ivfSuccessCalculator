import React, { useState } from 'react';
import FormulaParamsSection from './components/FormulaParamsSection';
import PersonalInfoSection from './components/PersonalInfoSection';
import InfertilityReasonsSection from './components/InfertilityReasonsSection';
import PregnancyHistorySection from './components/PregnancyHistorySection';
import ResultsSection from './components/ResultsSection';
import { calculateSuccessRate } from './services/calculatorService';
import { CalculatorInput, CalculatorResult } from './types/calculator';
import './App.css';

const App: React.FC = () => {
  // Formula selection parameters
  const [usingOwnEggs, setUsingOwnEggs] = useState<boolean>(true);
  const [attemptedIvfPreviously, setAttemptedIvfPreviously] = useState<boolean>(false);
  const [isReasonForInfertilityKnown, setIsReasonForInfertilityKnown] = useState<boolean>(true);

  // Personal information
  const [age, setAge] = useState<number>(35);
  const [weightLbs, setWeightLbs] = useState<number>(150);
  const [heightFt, setHeightFt] = useState<number>(5);
  const [heightIn, setHeightIn] = useState<number>(6);

  // Infertility reasons
  const [tubalFactor, setTubalFactor] = useState<boolean>(false);
  const [maleFactor, setMaleFactor] = useState<boolean>(false);
  const [endometriosis, setEndometriosis] = useState<boolean>(false);
  const [ovulatoryDisorder, setOvulatoryDisorder] = useState<boolean>(false);
  const [diminishedOvarianReserve, setDiminishedOvarianReserve] = useState<boolean>(false);
  const [uterineFactor, setUterineFactor] = useState<boolean>(false);
  const [otherReason, setOtherReason] = useState<boolean>(false);
  const [unexplainedInfertility, setUnexplainedInfertility] = useState<boolean>(false);

  // Prior pregnancies and live births
  const [priorPregnancies, setPriorPregnancies] = useState<number>(0);
  const [priorLiveBirths, setPriorLiveBirths] = useState<number>(0);

  // Calculation results
  const [result, setResult] = useState<CalculatorResult | null>(null);
  const [isCalculating, setIsCalculating] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCalculating(true);
    setError(null);

    try {
      const input: CalculatorInput = {
        using_own_eggs: usingOwnEggs,
        attempted_ivf_previously: attemptedIvfPreviously,
        is_reason_for_infertility_known: isReasonForInfertilityKnown,
        age,
        weight_lbs: weightLbs,
        height_ft: heightFt,
        height_in: heightIn,
        tubal_factor: tubalFactor,
        male_factor_infertility: maleFactor,
        endometriosis,
        ovulatory_disorder: ovulatoryDisorder,
        diminished_ovarian_reserve: diminishedOvarianReserve,
        uterine_factor: uterineFactor,
        other_reason: otherReason,
        unexplained_infertility: unexplainedInfertility,
        prior_pregnancies: priorPregnancies,
        prior_live_births: priorLiveBirths,
      };

      const calculatedResult = await calculateSuccessRate(input);
      setResult(calculatedResult);
    } catch (err) {
      console.error('Error calculating success rate:', err);
      setError('An error occurred while calculating the success rate. Please try again.');
    } finally {
      setIsCalculating(false);
    }
  };

  return (
    <div className="container">
      <h1 className="form-title">IVF Success Calculator</h1>
      <p>
        This calculator estimates your chance of having a baby through in vitro fertilization (IVF) 
        based on the CDC's IVF Success Estimator formulas.
      </p>
      
      <form onSubmit={handleSubmit}>
        <FormulaParamsSection
          usingOwnEggs={usingOwnEggs}
          setUsingOwnEggs={setUsingOwnEggs}
          attemptedIvfPreviously={attemptedIvfPreviously}
          setAttemptedIvfPreviously={setAttemptedIvfPreviously}
          isReasonForInfertilityKnown={isReasonForInfertilityKnown}
          setIsReasonForInfertilityKnown={setIsReasonForInfertilityKnown}
        />
        
        <PersonalInfoSection
          age={age}
          setAge={setAge}
          weightLbs={weightLbs}
          setWeightLbs={setWeightLbs}
          heightFt={heightFt}
          setHeightFt={setHeightFt}
          heightIn={heightIn}
          setHeightIn={setHeightIn}
        />
        
        <InfertilityReasonsSection
          isReasonForInfertilityKnown={isReasonForInfertilityKnown}
          tubalFactor={tubalFactor}
          setTubalFactor={setTubalFactor}
          maleFactor={maleFactor}
          setMaleFactor={setMaleFactor}
          endometriosis={endometriosis}
          setEndometriosis={setEndometriosis}
          ovulatoryDisorder={ovulatoryDisorder}
          setOvulatoryDisorder={setOvulatoryDisorder}
          diminishedOvarianReserve={diminishedOvarianReserve}
          setDiminishedOvarianReserve={setDiminishedOvarianReserve}
          uterineFactor={uterineFactor}
          setUterineFactor={setUterineFactor}
          otherReason={otherReason}
          setOtherReason={setOtherReason}
          unexplainedInfertility={unexplainedInfertility}
          setUnexplainedInfertility={setUnexplainedInfertility}
        />
        
        <PregnancyHistorySection
          priorPregnancies={priorPregnancies}
          setPriorPregnancies={setPriorPregnancies}
          priorLiveBirths={priorLiveBirths}
          setPriorLiveBirths={setPriorLiveBirths}
        />
        
        {error && <div className="error-message">{error}</div>}
        
        <button type="submit" className="button" disabled={isCalculating}>
          {isCalculating ? 'Calculating...' : 'Calculate Success Rate'}
        </button>
      </form>
      
      {result && <ResultsSection result={result} />}
    </div>
  );
};

export default App;