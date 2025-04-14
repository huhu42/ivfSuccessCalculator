import { Body, Controller, Get, Post } from '@nestjs/common';
import { IvfCalculatorService } from './ivf-calculator.service';
import { CalculatorInputDto } from './models/calculator-input.dto';

@Controller('ivf-calculator')
export class IvfCalculatorController {
  constructor(private readonly calculatorService: IvfCalculatorService) {}

  @Post('calculate')
  calculateSuccessRate(@Body() input: CalculatorInputDto) {
    return this.calculatorService.calculateSuccessRate(input);
  }
}