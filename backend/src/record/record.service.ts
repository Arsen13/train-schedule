import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUpdateRecordDto } from './dto/create-update-record.dto';

@Injectable()
export class RecordService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createRecordDto: CreateUpdateRecordDto, userId: number) {
    const isRecordExist = await this.prisma.trainRecord.findFirst({
      where: {
        trainNumber: createRecordDto.trainNumber,
        departureStation: createRecordDto.departureStation,
        arrivalStation: createRecordDto.arrivalStation,
        departureTime: createRecordDto.departureTime,
      },
    });
    if (isRecordExist) {
      throw new BadRequestException('This record already exist');
    }

    return await this.prisma.trainRecord.create({
      data: {
        userId,
        trainNumber: createRecordDto.trainNumber,
        railwayNumber: createRecordDto.railwayNumber,
        departureStation: createRecordDto.departureStation,
        arrivalStation: createRecordDto.arrivalStation,
        arrivalTime: createRecordDto.arrivalTime,
        departureTime: createRecordDto.departureTime,
      },
    });
  }

  async findAll(userId: number) {
    return await this.prisma.trainRecord.findMany({
      where: { userId },
      orderBy: {
        arrivalTime: 'asc',
      },
    });
  }

  async search(arrivalStation: string, userId) {
    const records = await this.prisma.trainRecord.findMany({
      where: { userId },
      orderBy: {
        arrivalTime: 'asc',
      },
    });

    const filteredRecords = records.filter((record) =>
      record.arrivalStation.includes(arrivalStation),
    );

    return filteredRecords;
  }

  async update(
    updateRecordDto: CreateUpdateRecordDto,
    recordId: number,
    userId: number,
  ) {
    const record = await this.prisma.trainRecord.findFirst({
      where: {
        id: recordId,
        userId,
      },
    });

    if (!record) throw new NotFoundException('Record not found');

    return await this.prisma.trainRecord.update({
      where: {
        id: recordId,
        userId,
      },
      data: updateRecordDto,
    });
  }

  async delete(recordId: number, userId: number) {
    const isRecordExist = await this.prisma.trainRecord.findFirst({
      where: {
        id: recordId,
        userId,
      },
    });

    if (!isRecordExist) throw new NotFoundException('Record not found');

    await this.prisma.trainRecord.delete({
      where: {
        id: recordId,
        userId,
      },
    });

    return { message: 'Record was successfully deleted' };
  }
}
