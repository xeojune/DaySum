import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Diary, DiaryDocument } from './schema/diary.schema';

export interface CreateDiaryDto {
  userId: string;
  title: string;
  content: string;
  date: Date;
}

@Injectable()
export class DiaryService {
  constructor(
    @InjectModel(Diary.name) private readonly diaryModel: Model<DiaryDocument>,
  ) {}

  // Save (write) diary entry to database
  async createDiary(createDiaryDto: CreateDiaryDto): Promise<DiaryDocument> {
    const createdDiary = new this.diaryModel(createDiaryDto);
    return createdDiary.save();
  }

  // Fetch (read) all diary entries for a specific user
  async getDiariesByUserId(userId: string): Promise<DiaryDocument[]> {
    return this.diaryModel
      .find({ userId })
      .sort({ date: -1 })
      .exec();
  }

  // Fetch (read) diary entries for a specific user and date
  async getDiariesByUserIdAndDate(
    userId: string,
    date: Date,
  ): Promise<DiaryDocument[]> {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    return this.diaryModel
      .find({
        userId,
        date: {
          $gte: startOfDay,
          $lte: endOfDay,
        },
      })
      .sort({ date: -1 })
      .exec();
  }

  // Fetch (read) a single diary entry by ID
  async getDiaryById(id: string): Promise<DiaryDocument | null> {
    return this.diaryModel.findById(id).exec();
  }

  // Update diary entry
  async updateDiary(id: string, title: string, content: string): Promise<DiaryDocument | null> {
    return this.diaryModel
      .findByIdAndUpdate(id, { title, content }, { new: true })
      .exec();
  }

  // Delete diary entry
  async deleteDiary(id: string): Promise<DiaryDocument | null> {
    return this.diaryModel.findByIdAndDelete(id).exec();
  }
}