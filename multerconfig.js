import multer from 'multer';

const storage = multer.diskStorage({
    // where to store files
    destination: (req, file, cb) => { cb(null, './uploads/'); },
    filename: (req, file, cb) => { cb(null, Date.now() + '-' + file.originalname); }
});

// only accept image mimetypes (jpeg/png/gif/webp/etc.)
const fileFilter = (req, file, cb) => {
    if (file && file.mimetype && file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Only image files are allowed'));
    }
};

// limit file size to 10MB
const limits = { fileSize: 10 * 1024 * 1024 };

// create a multer helper for export
const upload = multer({ storage, fileFilter, limits });

export default upload;