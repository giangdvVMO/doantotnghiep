import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  bucketName,
  FileUploadService,
} from 'src/share/external-services/s3.service';
import { FieldCvService } from '../field_cv/field_cv.service';
import { CV, CVDocument } from './cv.schema';
import { CreateCvDto } from './dto/create-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';
// import { imgbbUploader } from 'imgbb-uploader';
import { QueryParamCVDto } from './dto/query-param-cv.dto';
import { title } from 'process';

@Injectable()
export class CvService {
  constructor(
    @InjectModel(CV.name) private readonly cvModel: Model<CVDocument>,
    private readonly fieldCvService: FieldCvService,
    private readonly fileUploadService: FileUploadService,
  ) {}
  async create(createCvDto: CreateCvDto, file_cv: Express.Multer.File) {
    const {
      title,
      id_student,
      status,
      fields,
      experience,
      summary,
      certificate,
      speciality,
    } = createCvDto;
    const dataCreate: any = {
      title,
      experience,
      summary,
      certificate,
      speciality,
      id_student: +id_student,
      file_cv,
      status: status === 'false' ? false : true,
      _id: createCvDto.id_student,
      create_date: Date.now(),
    };
    if (file_cv) {
      console.log('file_cv', file_cv);
      const path = file_cv.path.split('\\');
      dataCreate.file_cv = `${path[1]}/${path[2]}`;
    }
    // return;
    const resultCreate = await this.cvModel.create(dataCreate);
    console.log(resultCreate);
    const fieldsArray = fields.split(',');
    const fieldsNumber = fieldsArray.map((field) => {
      return +field;
    });
    const dataCreateFieldCV = { id_cv: id_student, fields: fieldsNumber };
    const createFieldCV = await this.fieldCvService.create(dataCreateFieldCV);
    return resultCreate;
  }

  // async updateOne(id: number, updateCvDto: UpdateFullCVDto) {
  //   const { fields, ...data } = updateCvDto;
  //   const dataUpdate: any = {
  //     ...data,
  //     update_date: new Date(),
  //   };
  //   const resultUpdate = await this.cvModel.updateOne({ _id: id }, dataUpdate);
  //   if (fields) {
  //     const dataCreateFieldCV = { id_cv: id, fields };
  //     const createFieldCV = await this.fieldCvService.create(dataCreateFieldCV);
  //   }
  //   return resultUpdate;
  // }

  async findOne(id: number) {
    const data = await this.cvModel.aggregate([
      {
        $match: {
          _id: id,
        },
      },
      {
        $lookup: {
          from: 'tbl_student',
          localField: 'id_student',
          foreignField: '_id',
          as: 'student',
        },
      },
      {
        $unwind: '$student',
      },
      {
        $lookup: {
          from: 'tbl_account',
          localField: 'student._id',
          foreignField: '_id',
          as: 'account',
        },
      },
      {
        $unwind: '$account',
      },
      {
        $lookup: {
          from: 'tbl_field_cv',
          localField: '_id',
          foreignField: 'id_cv',
          as: 'field_cv',
        },
      },
      {
        $lookup: {
          from: 'tbl_field',
          localField: 'field_cv.id_field',
          foreignField: '_id',
          as: 'fields',
        },
      },
    ]);
    return { data: data[0] };
  }

  async update(
    id: number,
    updateCvDto: UpdateCvDto,
    file_cv?: Express.Multer.File,
  ) {
    const {
      fields,
      title,
      status,
      update_id,
      experience,
      summary,
      certificate,
      speciality,
    } = updateCvDto;
    const dataUpdate: any = {
      title,
      experience,
      summary,
      certificate,
      speciality,
      status: status === 'true' ? true : false,
      update_id: +update_id,
      update_date: new Date(),
    };
    if (file_cv) {
      console.log('file_cv', file_cv);
      const path = file_cv.path.split('\\');
      dataUpdate.file_cv = `${path[1]}/${path[2]}`;
    }
    if (fields) {
      const fieldsArray = fields.split(',');
      const fieldsNumber = fieldsArray.map((field) => {
        return +field;
      });
      const dataCreateFieldCV = { id_cv: id, fields: fieldsNumber };
      const createFieldCV = await this.fieldCvService.create(dataCreateFieldCV);
    }
    const resultUpdate = await this.cvModel.updateOne({ _id: id }, dataUpdate);
    console.log(resultUpdate);
    return resultUpdate;
  }

  async findAll(query: QueryParamCVDto) {
    const { field, status, search, id_student, pageIndex, pageSize } = query;
    console.log('field', field);
    console.log('status', status);
    console.log('search', search);
    console.log('pageIndex', pageIndex);
    console.log('pageSize', pageSize);
    console.log('id_student', id_student);
    const condition = {};

    const rgx = (pattern) => new RegExp(`.*${pattern}.*`);
    const searchRgx = rgx(search ? search : '');

    if (status === '1') {
      condition['status'] = true;
    }
    if (status === '0') {
      condition['status'] = false;
    }

    if (id_student) {
      condition['id_student'] = +id_student;
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
    console.log('field_condition', field_condition);
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
    const cvList = await this.cvModel.aggregate([
      //account not delete
      {
        $lookup: {
          from: 'tbl_student',
          localField: 'id_student',
          foreignField: '_id',
          as: 'student',
        },
      },
      {
        $unwind: '$student',
      },
      {
        $lookup: {
          from: 'tbl_account',
          localField: 'student._id',
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
          from: 'tbl_field_cv',
          localField: '_id',
          foreignField: 'id_cv',
          as: 'field_cv',
          pipeline: [
            {
              $group: {
                _id: '$id_cv',
                id_fields: {
                  $push: '$id_field',
                },
              },
            },
          ],
        },
      },
      {
        $unwind: '$field_cv',
      },
      {
        $addFields: {
          //search
          result: {
            // $or: [
            //   {
            //     $regexMatch: {
            //       input: '$',
            //       regex: searchRgx,
            //       options: 'i',
            //     },
            //   },
            // {
            $regexMatch: {
              input: '$title',
              regex: searchRgx,
              options: 'i',
            },
            // },
            // ],
          },
          id_fields: '$field_cv.id_fields',
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
    let total = 0;
    if (cvList.length) {
      //calculate total
      const studentListTotal = await this.cvModel.aggregate([
        //account not delete
        {
          $lookup: {
            from: 'tbl_student',
            localField: 'id_student',
            foreignField: '_id',
            as: 'student',
          },
        },
        {
          $unwind: '$student',
        },
        {
          $lookup: {
            from: 'tbl_account',
            localField: 'student._id',
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
        //add field
        {
          $lookup: {
            from: 'tbl_field_cv',
            localField: '_id',
            foreignField: 'id_cv',
            as: 'field_cv',
            pipeline: [
              {
                $group: {
                  _id: '$id_cv',
                  id_fields: {
                    $push: '$id_field',
                  },
                },
              },
            ],
          },
        },
        {
          $unwind: '$field_cv',
        },
        {
          $addFields: {
            //search
            result: {
              // $or: [
              //   {
              //     $regexMatch: {
              //       input: '$level',
              //       regex: searchRgx,
              //       options: 'i',
              //     },
              //   },
              //   {
              //   $regexMatch: {
              //     input: '$way_working',
              //     regex: searchRgx,
              //     options: 'i',
              //   },
              // },
              // {
              $regexMatch: {
                input: '$title',
                regex: searchRgx,
                options: 'i',
              },
              // },
              // ],
            },
            id_fields: '$field_cv.id_fields',
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
        {
          $count: 'total',
        },
      ]);
      total = studentListTotal[0].total;
    }
    console.log(cvList);
    return {
      data: cvList,
      pageSize: +pageIndex,
      pageIndex: +pageSize,
      total: total,
    };
  }
}
