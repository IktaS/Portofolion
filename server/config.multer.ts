import multer from "multer"

let storage = multer.diskStorage({
    destination: (req, file, callback ) => {
        callback(null, 'uploads');
    },
    filename: (req, file, callback) => {
        callback(null, req.user!.username + '-' + file.fieldname + '-' + Date.now());
    }
});

export const upload = multer({ storage: storage });