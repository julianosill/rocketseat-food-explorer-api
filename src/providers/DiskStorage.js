const fs = require('fs')
const path = require('path')
const { TMP_FOLDER, UPLOADS_FOLDER } = require('../configs/upload')

class DiskStorage {
  async saveFile(file) {
    await fs.promises.rename(
      path.resolve(TMP_FOLDER, file),
      path.resolve(UPLOADS_FOLDER, file)
    )
    return file
  }

  async deleteFile(file, isTmpFile) {
    const filePath = isTmpFile
      ? path.resolve(TMP_FOLDER, file)
      : path.resolve(UPLOADS_FOLDER, file)
    try {
      await fs.promises.stat(filePath)
    } catch (error) {
      return
    }
    await fs.promises.unlink(filePath)
  }
}

module.exports = DiskStorage
