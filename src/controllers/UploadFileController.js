module.exports = {
  upload(request, response) {
    console.log(request.file)
    return response.status(201).json({ message: 'uploded' })
  }
}