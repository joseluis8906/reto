var crypto = require('crypto');
var nodemailer = require('nodemailer');
var fs = require('fs');

module.exports = {

  random: function(howMany, chars) {
    chars = chars ||
      "abcdefghijklmnopqrstuwxyzABCDEFGHIJKLMNOPQRSTUWXYZ0123456789";
    var rnd = crypto.randomBytes(howMany),
      value = new Array(howMany),
      len = chars.length;

    for (var i = 0; i < howMany; i++) {
      value[i] = chars[rnd[i] % len]
    };

    return value.join('');
  },

  sendMail: function(destino, asunto, mensaje, res) {
    var transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'consumoyaapp@gmail.com',
        pass: '@ConsumoYa'
      }
    });
  },

  var mailOptions = {
            from: 'consumo ya cesar <consumoyaapp@gmail.com>',
            to: destino,
            subject: asunto,
            html: mensaje
        };

}
