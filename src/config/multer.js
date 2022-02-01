const multer = require('multer')
const FirebaseStorage = require('multer-firebase-storage')
const firebaseCredentials = require('../config/secret_key_firebase.json')
const path = require('path')
const crypto = require('crypto')
const { v4 } = require('uuid')

const storageTypes = {
    local: multer.diskStorage({
        destination: (request, file, callback) => {
            callback(null, path.resolve(__dirname, '..', '..', 'tmp', 'uploads'))
        },
        filename: (request, file, callback) => {
            crypto.randomBytes(16, (error, hash) => {
                if (error) callback(error)

                const fileName = `${hash.toString('hex')}-${file.originalname}`
                callback(null, fileName)
            })
        }
    }),
    firebase: FirebaseStorage({
        bucketName: process.env.FIREBASE_BUCKET_NAME,
        credentials: {
            clientEmail: firebaseCredentials.client_email,
            privateKey: firebaseCredentials.private_key,
            projectId: firebaseCredentials.project_id
        },
        namePrefix: v4() + '-',
        public: true
    }),
}

module.exports = {
    dest: path.resolve(__dirname, '..', '..', 'tmp', 'uploads'),
    storage: storageTypes.firebase,
    limits: {
        fileSize: 2 * 1024 ** 2
    },
    fileFilter: (request, file, callback) => {
        const allowedMimes = [
            'image/jpeg',
            'image/pjpeg',
            'image/png',
            'image/gif'
        ]

        if (allowedMimes.includes(file.mimetype)) {
            callback(null, true)
        } else {
            callback(new Error('Formato de arquivo inválido seu bocó!'))
        }
    }
}