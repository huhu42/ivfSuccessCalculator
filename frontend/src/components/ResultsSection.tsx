import React from 'react';
import { CalculatorResult } from '../types/calculator';

interface ResultsSectionProps {
  result: CalculatorResult | null;
}

const ResultsSection: React.FC<ResultsSectionProps> = ({ result }) => {
  if (!result) {
    return null;
  }

  return (
    <div className="results">
      <h2>IVF Success Estimate</h2>
      
      <div className="result-item">
        <p>Your estimated chance of IVF success is:</p>
        <div className="result-value">{result.success_rate}%</div>
      </div>
      
      <div className="result-details">
        <p>
          <strong>Formula used:</strong> CDC Formula {result.formula_used}
        </p>
        <p>
          <small>
            This result is based on data from the CDC's IVF Success Calculator 
            and represents an estimate of the likelihood of a successful live 
            birth following IVF treatment, based on the information provided.
          </small>
        </p>
      </div>
    </div>
  );
};

export default ResultsSection;