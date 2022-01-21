module.exports = {
  upload(request, response) {
    const { publicUrl } = request.file
    console.log(publicUrl)
    return response.status(201).json({ message: 'uploded' })
  }
}