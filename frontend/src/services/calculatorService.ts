import axios from 'axios';
import { CalculatorInput, CalculatorResult } from '../types/calculator';

const API_URL = 'http://localhost:3001/ivf-calculator';

export const calculateSuccessRate = async (input: CalculatorInput): Promise<CalculatorResult> => {
  try {
    const response = await axios.post<CalculatorResult>(`${API_URL}/calculate`, input);
    return response.data;
  } catch (error) {
    console.error('Error calculating success rate:', error);
    throw error;
  }
};