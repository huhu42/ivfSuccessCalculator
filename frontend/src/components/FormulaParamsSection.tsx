import React from 'react';

interface FormulaParamsSectionProps {
  usingOwnEggs: boolean;
  setUsingOwnEggs: (value: boolean) => void;
  attemptedIvfPreviously: boolean;
  setAttemptedIvfPreviously: (value: boolean) => void;
  isReasonForInfertilityKnown: boolean;
  setIsReasonForInfertilityKnown: (value: boolean) => void;
}

const FormulaParamsSection: React.FC<FormulaParamsSectionProps> = ({
  usingOwnEggs,
  setUsingOwnEggs,
  attemptedIvfPreviously,
  setAttemptedIvfPreviously,
  isReasonForInfertilityKnown,
  setIsReasonForInfertilityKnown,
}) => {
  return (
    <div className="form-section">
      <h3>IVF Treatment Information</h3>
      
      <div className="form-group">
        <label>Are you planning to use your own eggs in the IVF process?</label>
        <div className="radio-group">
          <div className="radio-option">
            <input
              type="radio"
              id="own-eggs-yes"
              name="using-own-eggs"
              checked={usingOwnEggs}
              onChange={() => setUsingOwnEggs(true)}
            />
            <label htmlFor="own-eggs-yes">Yes</label>
          </div>
          <div className="radio-option">
            <input
              type="radio"
              id="own-eggs-no"
              name="using-own-eggs"
              checked={!usingOwnEggs}
              onChange={() => setUsingOwnEggs(false)}
            />
            <label htmlFor="own-eggs-no">No (Using donor eggs)</label>
          </div>
        </div>
      </div>
      
      {usingOwnEggs && (
        <div className="form-group">
          <label>Have you attempted IVF previously?</label>
          <div className="radio-group">
            <div className="radio-option">
              <input
                type="radio"
                id="attempted-ivf-yes"
                name="attempted-ivf"
                checked={attemptedIvfPreviously}
                onChange={() => setAttemptedIvfPreviously(true)}
              />
              <label htmlFor="attempted-ivf-yes">Yes</label>
            </div>
            <div className="radio-option">
              <input
                type="radio"
                id="attempted-ivf-no"
                name="attempted-ivf"
                checked={!attemptedIvfPreviously}
                onChange={() => setAttemptedIvfPreviously(false)}
              />
              <label htmlFor="attempted-ivf-no">No</label>
            </div>
          </div>
        </div>
      )}
      
      <div className="form-group">
        <label>Do you know the reason for your infertility?</label>
        <div className="radio-group">
          <div className="radio-option">
            <input
              type="radio"
              id="reason-known-yes"
              name="reason-known"
              checked={isReasonForInfertilityKnown}
              onChange={() => setIsReasonForInfertilityKnown(true)}
            />
            <label htmlFor="reason-known-yes">Yes</label>
          </div>
          <div className="radio-option">
            <input
              type="radio"
              id="reason-known-no"
              name="reason-known"
              checked={!isReasonForInfertilityKnown}
              onChange={() => setIsReasonForInfertilityKnown(false)}
            />
            <label htmlFor="reason-known-no">No</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormulaParamsSection;