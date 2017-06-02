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

    var mailOptions = {
      from: 'consumo ya cesar <consumoyaapp@gmail.com>',
      to: destino,
      subject: asunto,
      html: mensaje
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        var error = {
          status: 500
        };
        return res.render('error', {
          error: error,
          message: "Parece que tenemos problemas con el servidor, tu solicitud no pudo ser procesada"
        });
      }
    });
  },

  msjRegistro: function(email, code) {
        var host = "http://172.16.16.72:8080"
        var mensaje = '<!DOCTYPE html>';
        mensaje = mensaje + '<html xmlns="http://www.w3.org/1999/xhtml" style="margin:0;padding:0;font-family: " Helvetica Neue ", "Helvetica ", Helvetica, Arial, sans-serif;font-size: 100%;line-height: 1.6;">';
        mensaje = mensaje + '<head style="margin:0;padding:0;font-family: " Helvetica Neue ", "Helvetica ", Helvetica, Arial, sans-serif;font-size: 100%;line-height: 1.6;"> <meta name="viewport" content="width=device-width" style="margin:0;padding:0;font-family: " Helvetica Neue ", "Helvetica ", Helvetica, Arial, sans-serif;font-size: 100%;line-height: 1.6;">';
        mensaje = mensaje + '<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" style="margin:0;padding:0;font-family: " Helvetica Neue ", "Helvetica ", Helvetica, Arial, sans-serif;font-size: 100%;line-height: 1.6;"> <title style="margin:0;padding:0;font-family: " Helvetica Neue ", "Helvetica ", Helvetica, Arial, sans-serif;font-size: 100%;line-height: 1.6;">Agro Report</title> </head> <body bgcolor="#f6f6f6" style="margin:0;padding:0;font-family:Helvetica, Arial,';
        mensaje = mensaje + 'sans-serif;font-size:100%;line-height:1.6;-webkit-font-smoothing:antialiased;-webkit-text-size-adjust:none;width:100%!important;height:100%;"><table class="body-wrap" style="margin:0;padding:20px;font-family:Helvetica, Arial, sans-serif;font-size:100%;line-height:1.6;width:100%;"> <tr style="margin:0;padding:0;font-family: " Helvetica Neue ", "Helvetica ", Helvetica, Arial, sans-serif;font-size: 100%;line-height: 1.6;"> <td style="margin:0;padding:0;font-family:"';
        mensaje = mensaje + 'Helvetica Neue ", "Helvetica ", Helvetica, Arial, sans-serif;font-size: 100%;line-height: 1.6;"></td> <td class="container" bgcolor="#FFFFFF" style="margin:0 auto!important;padding:20px;font-family:Helvetica, Arial, sans-serif;font-size:100%;line-height:1.6;display:block!important;max-width:600px!important;clear:both!important;border:1px solid #f0f0f0;"> <div class="content" style="margin:0 auto;padding:0;font-family:Helvetica, Arial, ';
        mensaje = mensaje + 'sans-serif;font-size:100%;line-height:1.6;max-width:600px;display:block;"> <table style="margin:0;padding:0;font-family:Helvetica, Arial, sans-serif;font-size:100%;line-height:1.6;width:100%;"> <tr style="margin:0;padding:0;font-family: " Helvetica Neue ", "Helvetica ", Helvetica, Arial, sans-serif;font-size: 100%;line-height: 1.6;"> <td class="center" style="margin:0;padding:0;font-family:Helvetica, Arial, ';
        mensaje = mensaje + 'sans-serif;font-size:100%;line-height:1.6;text-align:center;"> <div class="logo" style="margin:0;padding:0;font-family:Helvetica, Arial, sans-serif;font-size:100%;line-height:1.6;display:inline-block;width:399px;height:85px;max-width:90%;"> <img src="https://agroreport.neverdesk.com/images/logo-email.png" alt="ChartBlocks logo" style="margin:0;padding:0;font-family:Helvetica, Arial, sans-serif;font-size:100%;line-height:1.6;max-width:100%;"> </div> </td> </tr> <tr ';
        mensaje = mensaje + 'style="margin:0;padding:0;font-family: " Helvetica Neue ", "Helvetica ", Helvetica, Arial, sans-serif;font-size: 100%;line-height: 1.6;"> <td style="margin:0;padding:0;font-family: " Helvetica Neue ", "Helvetica ", Helvetica, Arial, sans-serif;font-size: 100%;line-height: 1.6;"> <h2 style="margin:40px 0 10px;padding:0;font-family:" Helvetica Neue ", Helvetica, Arial, "Lucida Grande ", ';
        mensaje = mensaje + 'sans-serif;font-size:28px;line-height:1.2;margin-bottom:15px;color:#000;font-weight:200;text-align:center;">Activa tu cuenta</h2> <p style="margin:0;padding:0;font-family:Helvetica, Arial, sans-serif;font-size:15px;line-height:1.6;margin-bottom:10px;font-weight:normal;">Hola,</p> <p style="margin:0;padding:0;font-family:Helvetica, Arial, sans-serif;font-size:15px;line-height:1.6;margin-bottom:10px;font-weight:normal;">Gracias por crear una cuenta de Agro Report. ';
        mensaje = mensaje + 'Para usar la dirección de correo electrónico ' + email + ', verifique su cuenta haciendo clic en el botón de abajo.</p> <table style="margin:0;padding:0;font-family:Helvetica, Arial, sans-serif;font-size:100%;line-height:1.6;width:100%;"> <tr style="margin:0;padding:0;font-family: " Helvetica Neue ", "Helvetica ", Helvetica, Arial, sans-serif;font-size: 100%;line-height: 1.6;"> <td class="padding center" style="margin:0;padding:10px 0;font-family:Helvetica,';
        mensaje = mensaje + 'Arial, sans-serif;font-size:100%;line-height:1.6;text-align:center;"> <p style="margin:0;padding:0;font-family:Helvetica, Arial, sans-serif;font-size:15px;line-height:1.6;margin-bottom:10px;font-weight:normal;"><a href="'+host+'/verify?email=' + email + '&code=' + code + '" class="btn-primary" style="margin:0;padding:0;font-family:Helvetica, Arial, ';
        mensaje = mensaje + 'sans-serif;font-size:100%;line-height:2;color:#FFF;text-decoration:none;background-color:#40a244;border:solid #40a244;border-width:10px 20px;font-weight:bold;margin-right:10px;text-align:center;cursor:pointer;display:inline-block;border-radius:25px;">Confirmar</a></p> </td> </tr> </table> <p style="margin:0;padding:0;font-family:Helvetica, Arial, sans-serif;font-size:15px;line-height:1.6;margin-bottom:10px;font-weight:normal;">O copiar y pegar <a ';
        mensaje = mensaje + 'href='+host+'"/verify?email=' + email + '&code=' + code + '"style="margin:0;padding:0;font-family:Helvetica, Arial, sans-serif;font-size:100%;line-height:1.6;color:#348eda;">'+host+'/verify?email=' + email + '&code=' + code + '</a>                                    En la barra de direcciones de su navegador.</p> <p style="margin:0;padding:0;font-family:Helvetica, Arial, ';
        mensaje = mensaje + 'sans-serif;font-size:15px;line-height:1.6;margin-bottom:10px;font-weight:normal;">Gracias,<br style="margin:0;padding:0;font-family: " Helvetica Neue ", "Helvetica ", Helvetica, Arial, sans-serif;font-size: 100%;line-height: 1.6;"><strong style="margin:0;padding:0;font-family:Helvetica, Arial, sans-serif;font-size:18px;line-height:1.6;font-weight:normal;">Equipo de Agro Report</strong> <br style="margin:0;padding:0;font-family: " Helvetica Neue ", "Helvetica ", ';
        mensaje = mensaje + 'Helvetica, Arial, sans-serif;font-size: 100%;line-height: 1.6;"></p> <p class="footnote" style="margin:0;padding:0;font-family:Helvetica, Arial, sans-serif;font-size:14px;line-height:1.6;margin-bottom:10px;font-weight:normal;color:#444;">Esperamos que encuentres Agro Report fácil de usar, pero si tienes algún problema, envía un correo electrónico a soporte@neverdesk.com y te responderemos de inmediato.</p> </td> <td style="margin:0;padding:0;font-family:';
        mensaje = mensaje + '" Helvetica Neue ", "Helvetica ", Helvetica, Arial, sans-serif;font-size: 100%;line-height: 1.6;"></td> </tr> </table></div> </td> <td style="margin:0;padding:0;font-family: " Helvetica Neue ", "Helvetica ", Helvetica, Arial, sans-serif;font-size: 100%;line-height: 1.6;"></td> </tr> </table> </body> </html>';
        return mensaje;
    },

    errorServidor: function(res) {
        var error = {
            status: 500
        };
        return res.render('error', {
            error: error,
            message: "Parece que tenemos problemas con el servidor, tu solicitud no pudo ser procesada."
        });
    }

}
