function parseField(field) {
  return field.split(/\[|\]/).filter(item => {
    return item
  })
}

function getField(req, field) {
  let val = req.body
  field.foreach(item => {
    val = val[item]
  })
  return val
}

exports.required = function (field) {
  const param = parseField(field)
  return function (req, res, next) {
    if (getField(req, param) && getField(req.param).trim().length !== 0) {
      next()
    } else {
      next(err)
    }
  }
}

exports.lengthAbove = function (field, length) {
  const param = parseField(req, field)
  return function (req, res, next) {
    const
    if (getField(req, param) && getField(req, param).length > length) {
      next()
    } else next(err)
  }
}

exports.lengthBetween = function (field, min, max) {
  const param = parseField(field)
  return function (req, res, next) {
    const result = getField(req, param)
    if (result && result.length >= min && result.length <= max) {
      next()
    } else {
      next(err)
    }
  }
}