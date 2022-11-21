import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FieldNewsService } from '../field_news/field_news.service';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { News, NewsDocument } from './news.schema';

@Injectable()
export class NewsService {
  constructor(
    @InjectModel(News.name) private readonly newsModel: Model<NewsDocument>,
    private readonly fieldNewsService: FieldNewsService,
  ) {}

  async calculateId() {
    //create id
    const count: any = await this.newsModel.aggregate([
      {
        $group: {
          _id: null,
          max: {
            $max: '$_id',
          },
        },
      },
    ]);
    console.log(count);
    return count.length ? count[0].max + 1 : 1;
  }

  async create(createNewsDto: CreateNewsDto) {
    const { title, id_account, thumnail, content, status, fields } =
      createNewsDto;
    const dataCreate: any = {
      title,
      id_account: +id_account,
      thumnail,
      status: status,
      content,
      _id: await this.calculateId(),
      create_date: new Date(),
    };

    const resultCreate = await this.newsModel.create(dataCreate);
    // const fieldsArray = fields.split(',');
    const fieldsNumber = fields.map((field) => {
      return +field;
    });
    const dataCreateFieldCV = { id_news: dataCreate._id, fields: fieldsNumber };
    await this.fieldNewsService.create(dataCreateFieldCV);
    return resultCreate;
  }

  async findAll(query) {
    const { field, status, search, id_account, pageIndex, pageSize } = query;

    console.log(field, field);
    const condition = {};
    const rgx = (pattern) => new RegExp(`.*${pattern}.*`);
    const searchRgx = rgx(search ? search : '');
    if (status === '1') {
      condition['status'] = true;
    }
    if (status === '0') {
      condition['status'] = false;
    }
    if (id_account) {
      condition['id_account'] = +id_account;
    }

    let field_condition: any = true;
    if (field && +field) {
      field_condition = { $in: [+field, '$id_fields'] };
    } else {
      if (field && field.length) {
        const field_array = field.split(',');
        const conditionOr = field_array.map((item) => {
          return { $in: [+item, '$id_fields'] };
        });
        field_condition = { $or: conditionOr };
      }
    }

    let limitSkip = [];
    if (pageIndex && pageSize) {
      limitSkip = [
        {
          $skip: (+pageIndex - 1) * +pageSize,
        },
        {
          $limit: +pageSize,
        },
      ];
    }
    const newsList = await this.newsModel.aggregate([
      {
        $lookup: {
          from: 'tbl_account',
          localField: 'id_account',
          foreignField: '_id',
          as: 'account',
        },
      },
      {
        $unwind: '$account',
      },
      {
        $match: {
          'account.delete_date': null,
          delete_date: null,
          ...condition,
        },
      },
      // //add field
      {
        $lookup: {
          from: 'tbl_field_news',
          localField: '_id',
          foreignField: 'id_news',
          as: 'field_news',
          pipeline: [
            {
              $group: {
                _id: '$id_news',
                id_fields: {
                  $push: '$id_field',
                },
              },
            },
          ],
        },
      },
      {
        $unwind: '$field_news',
      },
      {
        $addFields: {
          //search
          result: {
            $regexMatch: {
              input: '$title',
              regex: searchRgx,
              options: 'i',
            },
          },
          id_fields: '$field_news.id_fields',
        },
      },
      {
        $addFields: {
          isfields: field_condition,
        },
      },
      {
        $match: {
          result: true,
          isfields: true,
          // isExperience: true,
        },
      },
      {
        $lookup: {
          from: 'tbl_field',
          localField: 'id_fields',
          foreignField: '_id',
          as: 'fields',
        },
      },
      ...limitSkip,
    ]);

    return { data: newsList };
  }

  findOne(id: number) {
    return `This action returns a #${id} news`;
  }

  update(id: number, updateNewsDto: UpdateNewsDto) {
    return `This action updates a #${id} news`;
  }

  remove(id: number) {
    return `This action removes a #${id} news`;
  }
}
