import React from 'react';

interface PersonalInfoSectionProps {
  age: number;
  setAge: (value: number) => void;
  weightLbs: number;
  setWeightLbs: (value: number) => void;
  heightFt: number;
  setHeightFt: (value: number) => void;
  heightIn: number;
  setHeightIn: (value: number) => void;
}

const PersonalInfoSection: React.FC<PersonalInfoSectionProps> = ({
  age,
  setAge,
  weightLbs,
  setWeightLbs,
  heightFt,
  setHeightFt,
  heightIn,
  setHeightIn,
}) => {
  const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 20 && value <= 50) {
      setAge(value);
    }
  };

  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 80 && value <= 300) {
      setWeightLbs(value);
    }
  };

  const handleHeightFtChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 4 && value <= 7) {
      setHeightFt(value);
    }
  };

  const handleHeightInChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 0 && value <= 11) {
      setHeightIn(value);
    }
  };

  // Calculate BMI for display purposes
  const calculateBMI = () => {
    const totalHeightInches = heightFt * 12 + heightIn;
    return Math.round((weightLbs / (totalHeightInches * totalHeightInches)) * 703 * 10) / 10;
  };

  return (
    <div className="form-section">
      <h3>Personal Information</h3>
      
      <div className="form-group">
        <label htmlFor="age">Age (20-50):</label>
        <input
          type="number"
          id="age"
          className="form-control"
          value={age}
          onChange={handleAgeChange}
          min={20}
          max={50}
          required
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="weight">Weight (lbs) (80-300):</label>
        <input
          type="number"
          id="weight"
          className="form-control"
          value={weightLbs}
          onChange={handleWeightChange}
          min={80}
          max={300}
          required
        />
      </div>
      
      <div className="form-group">
        <label>Height:</label>
        <div style={{ display: 'flex', gap: '10px' }}>
          <select
            className="form-control"
            value={heightFt}
            onChange={handleHeightFtChange}
            style={{ width: '100px' }}
          >
            <option value={4}>4 ft</option>
            <option value={5}>5 ft</option>
            <option value={6}>6 ft</option>
            <option value={7}>7 ft</option>
          </select>
          
          <select
            className="form-control"
            value={heightIn}
            onChange={handleHeightInChange}
            style={{ width: '100px' }}
          >
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i} value={i}>
                {i} in
              </option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="form-group">
        <label>Calculated BMI:</label>
        <div style={{ fontWeight: 'bold' }}>{calculateBMI()}</div>
      </div>
    </div>
  );
};

export default PersonalInfoSection;