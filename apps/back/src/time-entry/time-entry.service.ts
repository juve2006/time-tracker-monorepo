import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTimeEntryDto } from './dto/create-time-entry.dto';

@Injectable()
export class TimeEntryService {
  constructor(private prisma: PrismaService) {}

  async getAllTimeEntries() {
    return this.prisma.timeEntry.findMany({
      orderBy: [{ date: 'desc' }, { createdAt: 'desc' }],
    });
  }

  async createTimeEntry(payload: CreateTimeEntryDto) {
    return this.prisma.timeEntry.create({
      data: {
        date: new Date(payload.date),
        project: payload.project,
        hours: payload.hours,
        description: payload.description,
      },
    });
  }
}
