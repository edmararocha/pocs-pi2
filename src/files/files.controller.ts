import { Controller, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { AuthGuard } from '@nestjs/passport';
import { extname } from 'path';

@Controller('upload')
export class FilesController {
  @UseGuards(AuthGuard('jwt'))
  @Post()
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads',
      filename: (_, file, cb) => {
        const unique = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, `${unique}${extname(file.originalname)}`);
      }
    }),
  }))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return { message: 'Upload realizado com sucesso', filePath: file.path };
  }
}