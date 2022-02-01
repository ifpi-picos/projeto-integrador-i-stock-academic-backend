class ResponsesFactory {
  constructor() {}

  success(code = 200, data = {}, message = 'Sucesso!') {
    return ({
      code: code || 200,
      data: data || {},
      message: message || 'Sucesso!'
    })
  }

  error(code = 400, data = {}, message = 'Deu tudo errado!') {
    return ({
      code: code || 400,
      data: data || {},
      message: message || 'Deu tudo errado!'
    })
  }
}

module.exports = { ResponsesFactory }