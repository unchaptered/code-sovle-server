import { Module } from '@nestjs/common';
import { FormatService } from './format.service';

@Module({
    providers: [FormatService],
    exports:[FormatService]
})
export class FormatModule {}