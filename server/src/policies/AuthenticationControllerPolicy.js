const Joi = require('joi')

module.exports = {
  register (req, res, next) {
    const schema = {
      email: Joi.string().email(),
      password: Joi.string().regex(
        new RegExp('^[a-zA-Z0-9]{8,32}$')
      ),
      username: Joi.string(),
      lastName: Joi.string(),
      firstName: Joi.string(),
      isAdmin: Joi.string()
    }

    const {error} = Joi.validate(req.body, schema)

    if (error) {
      switch (error.details[0].context.key) {
        case 'email':
          res.status(400).send({
            error: 'Neodgovarajuca e-mail adresa. Ukucajte validan e-mail.'
          })
          break
        case 'password':
          res.status(400).send({
            error: `Lozinka mora biti duga barem 8 karaktera, i ne sme sadržati specijalne znake.`
          })
          break
        default:
          res.status(400).send({
            error: 'Registrovanje nije uspelo.'
          })
      }
    } else {
      next()
    }
  }
}