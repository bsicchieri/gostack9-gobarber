// configuração dos uploads

import multer from 'multer';
import crypto from 'crypto'; // gerar caracteres
import { extname, resolve } from 'path';

export default {
  // como o multer vai guardar os arq de img
  storage: multer.diskStorage({
    destination: resolve(__dirname, '..', '..', 'tmp', 'uploads'),
    filename: (req, file, cb) => {
      // código único antes do nome da imagem, arq único
      crypto.randomBytes(16, (err, res) => {
        if (err) return cb(err);

        return cb(null, res.toString('hex') + extname(file.originalname));
      });
    },
  }),
};
