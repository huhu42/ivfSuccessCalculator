import { Module } from '@nestjs/common';
import { IvfCalculatorController } from './ivf-calculator.controller';
import { IvfCalculatorService } from './ivf-calculator.service';
import { FormulaParserService } from './formula-parser.service';

@Module({
  controllers: [IvfCalculatorController],
  providers: [IvfCalculatorService, FormulaParserService],
})
export class IvfCalculatorModule {}