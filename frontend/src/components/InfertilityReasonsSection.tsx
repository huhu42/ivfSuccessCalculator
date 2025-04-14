import React from 'react';

interface InfertilityReasonsSectionProps {
  isReasonForInfertilityKnown: boolean;
  tubalFactor: boolean;
  setTubalFactor: (value: boolean) => void;
  maleFactor: boolean;
  setMaleFactor: (value: boolean) => void;
  endometriosis: boolean;
  setEndometriosis: (value: boolean) => void;
  ovulatoryDisorder: boolean;
  setOvulatoryDisorder: (value: boolean) => void;
  diminishedOvarianReserve: boolean;
  setDiminishedOvarianReserve: (value: boolean) => void;
  uterineFactor: boolean;
  setUterineFactor: (value: boolean) => void;
  otherReason: boolean;
  setOtherReason: (value: boolean) => void;
  unexplainedInfertility: boolean;
  setUnexplainedInfertility: (value: boolean) => void;
}

const InfertilityReasonsSection: React.FC<InfertilityReasonsSectionProps> = ({
  isReasonForInfertilityKnown,
  tubalFactor,
  setTubalFactor,
  maleFactor,
  setMaleFactor,
  endometriosis,
  setEndometriosis,
  ovulatoryDisorder,
  setOvulatoryDisorder,
  diminishedOvarianReserve,
  setDiminishedOvarianReserve,
  uterineFactor,
  setUterineFactor,
  otherReason,
  setOtherReason,
  unexplainedInfertility,
  setUnexplainedInfertility,
}) => {
  const handleUnexplainedChange = (checked: boolean) => {
    if (checked) {
      setTubalFactor(false);
      setMaleFactor(false);
      setEndometriosis(false);
      setOvulatoryDisorder(false);
      setDiminishedOvarianReserve(false);
      setUterineFactor(false);
      setOtherReason(false);
    }
    setUnexplainedInfertility(checked);
  };

  const handleFactorChange = (setter: (value: boolean) => void, checked: boolean) => {
    if (checked && unexplainedInfertility) {
      setUnexplainedInfertility(false);
    }
    setter(checked);
  };

  return (
    <div className="form-section">
      <h3>Reasons for Infertility</h3>
      
      {!isReasonForInfertilityKnown ? (
        <div className="form-group">
          <p>Since you indicated that you don't know the reason for infertility, we'll proceed with the calculation accordingly.</p>
        </div>
      ) : (
        <>
          <div className="form-group">
            <p>Please select all that apply:</p>
          </div>
          
          <div className="form-group">
            <div className="checkbox-option">
              <input
                type="checkbox"
                id="tubal-factor"
                checked={tubalFactor}
                onChange={(e) => handleFactorChange(setTubalFactor, e.target.checked)}
              />
              <label htmlFor="tubal-factor">Tubal Factor</label>
            </div>
          </div>
          
          <div className="form-group">
            <div className="checkbox-option">
              <input
                type="checkbox"
                id="male-factor"
                checked={maleFactor}
                onChange={(e) => handleFactorChange(setMaleFactor, e.target.checked)}
              />
              <label htmlFor="male-factor">Male Factor Infertility</label>
            </div>
          </div>
          
          <div className="form-group">
            <div className="checkbox-option">
              <input
                type="checkbox"
                id="endometriosis"
                checked={endometriosis}
                onChange={(e) => handleFactorChange(setEndometriosis, e.target.checked)}
              />
              <label htmlFor="endometriosis">Endometriosis</label>
            </div>
          </div>
          
          <div className="form-group">
            <div className="checkbox-option">
              <input
                type="checkbox"
                id="ovulatory-disorder"
                checked={ovulatoryDisorder}
                onChange={(e) => handleFactorChange(setOvulatoryDisorder, e.target.checked)}
              />
              <label htmlFor="ovulatory-disorder">Ovulatory Disorder</label>
            </div>
          </div>
          
          <div className="form-group">
            <div className="checkbox-option">
              <input
                type="checkbox"
                id="diminished-ovarian"
                checked={diminishedOvarianReserve}
                onChange={(e) => handleFactorChange(setDiminishedOvarianReserve, e.target.checked)}
              />
              <label htmlFor="diminished-ovarian">Diminished Ovarian Reserve</label>
            </div>
          </div>
          
          <div className="form-group">
            <div className="checkbox-option">
              <input
                type="checkbox"
                id="uterine-factor"
                checked={uterineFactor}
                onChange={(e) => handleFactorChange(setUterineFactor, e.target.checked)}
              />
              <label htmlFor="uterine-factor">Uterine Factor</label>
            </div>
          </div>
          
          <div className="form-group">
            <div className="checkbox-option">
              <input
                type="checkbox"
                id="other-reason"
                checked={otherReason}
                onChange={(e) => handleFactorChange(setOtherReason, e.target.checked)}
              />
              <label htmlFor="other-reason">Other Reason</label>
            </div>
          </div>
          
          <div className="form-group">
            <div className="checkbox-option">
              <input
                type="checkbox"
                id="unexplained"
                checked={unexplainedInfertility}
                onChange={(e) => handleUnexplainedChange(e.target.checked)}
              />
              <label htmlFor="unexplained">Unexplained Infertility (None of the above)</label>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default InfertilityReasonsSection;