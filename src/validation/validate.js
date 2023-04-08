/* eslint-disable prefer-regex-literals */
const Joi = require('joi');

module.exports = {
  async validateTransaction(dataToValidate) {
    const schema = Joi.object({
      accountExternalIdDebit: Joi.number().integer().min(1).max(999999)
        .required(),
      accountExternalIdCredit: Joi.number().integer().min(1).max(999999)
        .required(),
      transferTypeId: Joi.number().integer().min(1).max(999),
      value: Joi.string().required()
        .min(1)
        .message('El campo value debe tener minimo 1 caracter')
        .max(15)
        .message('El campo value debe tener máximo 15 caracteres')
        .pattern(new RegExp('^[0-9]+([.][0-9]+)?$')),
    });
    const result = await schema.validateAsync(dataToValidate);
    console.log('result: ', result);
    return result;
  },
};
