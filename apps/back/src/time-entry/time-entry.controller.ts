import { Body, Controller, Get, Post } from '@nestjs/common';
import { TimeEntryService } from './time-entry.service';
import { CreateTimeEntryDto } from './dto/create-time-entry.dto';

@Controller('time-entry')
export class TimeEntryController {
  constructor(private readonly timeEntryService: TimeEntryService) {}

  @Get()
  async getAll() {
    return this.timeEntryService.getAllTimeEntries();
  }

  @Post()
  async create(@Body() body: CreateTimeEntryDto) {
    return this.timeEntryService.createTimeEntry(body);
  }
}
