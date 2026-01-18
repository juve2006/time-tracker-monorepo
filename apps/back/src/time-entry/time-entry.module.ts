import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { TimeEntryService } from './time-entry.service';
import { TimeEntryController } from './time-entry.controller';

@Module({
  imports: [PrismaModule],
  providers: [TimeEntryService],
  controllers: [TimeEntryController],
})
export class TimeEntryModule {}
