import { EStaticDirectory } from './../../config/constants';
import {
  NODE_APP_PORT,
  NODE_APP_SERVER_ADDRESS,
} from './../../config/common-configs';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import * as multer from 'multer';

export const imageFileFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  cb: any,
) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

export const getFileUrl = (directory: EStaticDirectory, fileName: string) => {
  return `${NODE_APP_SERVER_ADDRESS}/${directory}/${fileName}`;
};

export class FilesUploadTool {
  static uploadImages: MulterOptions = {
    storage: multer.diskStorage({
      destination: './uploads/images',
      filename: (req: Express.Request, file: Express.Multer.File, cb) => {
        const fileName = file.originalname;
        cb(null, fileName);
      },
    }),
    fileFilter: imageFileFilter,
  };
}
