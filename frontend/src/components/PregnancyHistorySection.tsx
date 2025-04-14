import React from 'react';

interface PregnancyHistorySectionProps {
  priorPregnancies: number;
  setPriorPregnancies: (value: number) => void;
  priorLiveBirths: number;
  setPriorLiveBirths: (value: number) => void;
}

const PregnancyHistorySection: React.FC<PregnancyHistorySectionProps> = ({
  priorPregnancies,
  setPriorPregnancies,
  priorLiveBirths,
  setPriorLiveBirths,
}) => {
  // Ensure prior live births cannot exceed prior pregnancies
  const handleLiveBirthsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 0 && value <= priorPregnancies) {
      setPriorLiveBirths(value);
    }
  };

  const handlePregnanciesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 0) {
      setPriorPregnancies(value);
      
      // If new pregnancies value is less than current live births, adjust live births
      if (value < priorLiveBirths) {
        setPriorLiveBirths(value);
      }
    }
  };

  return (
    <div className="form-section">
      <h3>Pregnancy History</h3>
      
      <div className="form-group">
        <label htmlFor="prior-pregnancies">Number of Prior Pregnancies:</label>
        <input
          type="number"
          id="prior-pregnancies"
          className="form-control"
          min={0}
          value={priorPregnancies}
          onChange={handlePregnanciesChange}
        />
        <small className="form-text text-muted">
          Also known as "Gravida" in medical terms.
        </small>
      </div>
      
      <div className="form-group">
        <label htmlFor="prior-live-births">Number of Live Births:</label>
        <input
          type="number"
          id="prior-live-births"
          className="form-control"
          min={0}
          max={priorPregnancies}
          value={priorLiveBirths}
          onChange={handleLiveBirthsChange}
        />
        <small className="form-text text-muted">
          Cannot exceed the number of prior pregnancies.
        </small>
      </div>
    </div>
  );
};

export default PregnancyHistorySection;