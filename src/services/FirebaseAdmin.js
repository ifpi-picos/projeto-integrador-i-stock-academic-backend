const { initializeApp, cert } = require('firebase-admin/app')
const { getStorage } = require('firebase-admin/storage')
const FirebaseCredentials = require('../config/secret_key_firebase.json')

initializeApp({
    credential: cert(FirebaseCredentials),
    storageBucket: process.env.FIREBASE_BUCKET_NAME
})

class FirebaseAdmin {
    constructor() {
        this.storage = getStorage()
    }

    async destroyFile(pathFile) {
        try {
            const resp = await this.storage.bucket().file(pathFile).delete()

            return resp
        } catch (error) {
            throw error
        }
    }
}

module.exports = { FirebaseAdmin }