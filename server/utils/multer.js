import multer from 'multer';

import {v4 as uuid} from 'uuid';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
       return cb(null, './uploads');
        
    },
    filename: (req, file, cb) => {
       return cb(null, uuid() + file.originalname);
    },
    
})


export const singleUpload = multer({storage}).single('photo')