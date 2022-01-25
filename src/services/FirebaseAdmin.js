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
      await this.storage.bucket().deleteFiles(pathFile)

      return 'Imagem deletada com sucesso!'
    } catch (error) {
      throw error
    }
  }
}

module.exports = { FirebaseAdmin }