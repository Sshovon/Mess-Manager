const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const ownerChecker = require("../middleware/ownerChecker");
const User = require("../models/userModel");
const Mess = require("../models/messModel");
const { route } = require("./membersRoutes");
const nodemailer = require("nodemailer");

router.post("/", auth, async (req, res) => {
  try {
    const { email } = req.body;
    const messID=req.mess._id;
    const messName=req.mess.messName;

    let mailTransporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "devmail6199@gmail.com",
        pass: "rzeuktcvmdfztbku",
      },
    });
    let mailDetails = {
      from: "devmail6199@gmail.com",
      to: email,
      subject: `Invitation for joining ${req.mess.messName}`,
      html: `
            <!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
            <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
            <head>
            <!--[if gte mso 9]>
            <xml>
              <o:OfficeDocumentSettings>
                <o:AllowPNG/>
                <o:PixelsPerInch>96</o:PixelsPerInch>
              </o:OfficeDocumentSettings>
            </xml>
            <![endif]-->
              <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <meta name="x-apple-disable-message-reformatting">
              <!--[if !mso]><!--><meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]-->
              <title></title>
             
                <style type="text/css">
                  table, td { color: #000000; } a { color: #0000ee; text-decoration: underline; }
            @media only screen and (min-width: 670px) {
              .u-row {
                width: 650px !important;
              }
              .u-row .u-col {
                vertical-align: top;
              }
           
              .u-row .u-col-100 {
                width: 650px !important;
              }
           
            }
           
            @media (max-width: 670px) {
              .u-row-container {
                max-width: 100% !important;
                padding-left: 0px !important;
                padding-right: 0px !important;
              }
              .u-row .u-col {
                min-width: 320px !important;
                max-width: 100% !important;
                display: block !important;
              }
              .u-row {
                width: calc(100% - 40px) !important;
              }
              .u-col {
                width: 100% !important;
              }
              .u-col > div {
                margin: 0 auto;
              }
            }
            body {
              margin: 0;
              padding: 0;
            }
           
            table,
            tr,
            td {
              vertical-align: top;
              border-collapse: collapse;
            }
           
            p {
              margin: 0;
            }
           
            .ie-container table,
            .mso-container table {
              table-layout: fixed;
            }
           
            * {
              line-height: inherit;
            }
           
            a[x-apple-data-detectors='true'] {
              color: inherit !important;
              text-decoration: none !important;
            }
           
            </style>
             
             
           
            <!--[if !mso]><!--><link href="https://fonts.googleapis.com/css?family=Cabin:400,700&display=swap" rel="stylesheet" type="text/css"><link href="https://fonts.googleapis.com/css?family=Montserrat:400,700&display=swap" rel="stylesheet" type="text/css"><link href="https://fonts.googleapis.com/css?family=Pacifico&display=swap" rel="stylesheet" type="text/css"><!--<![endif]-->
           
            </head>
           
            <body class="clean-body u_body" style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #f2f2f2;color: #000000">
              <!--[if IE]><div class="ie-container"><![endif]-->
              <!--[if mso]><div class="mso-container"><![endif]-->
              <table style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #f2f2f2;width:100%" cellpadding="0" cellspacing="0">
              <tbody>
              <tr style="vertical-align: top">
                <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #f2f2f2;"><![endif]-->
               
           
            <div class="u-row-container" style="padding: 25px 10px 0px;background-color: rgba(255,255,255,0)">
              <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 650px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
                <div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
                  <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 25px 10px 0px;background-color: rgba(255,255,255,0);" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:650px;"><tr style="background-color: #ffffff;"><![endif]-->
                 
            <!--[if (mso)|(IE)]><td align="center" width="650" style="width: 650px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
            <div class="u-col u-col-100" style="max-width: 320px;min-width: 650px;display: table-cell;vertical-align: top;">
              <div style="width: 100% !important;">
              <!--[if (!mso)&(!IE)]><!--><div style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
             
            <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
              <tbody>
                <tr>
                  <td style="overflow-wrap:break-word;word-break:break-word;padding:30px 20px;font-family:arial,helvetica,sans-serif;" align="left">
                   
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="padding-right: 0px;padding-left: 0px;" align="center">
                 
                  <img align="center" border="0" src="https://cdn.discordapp.com/attachments/829418444679807046/918630227087855626/mess-management-logo.png" alt="Image" title="Image" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 100%;max-width: 150px;" width="150"/>
                 
                </td>
              </tr>
            </table>
           
                  </td>
                </tr>
              </tbody>
            </table>
           
              <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
              </div>
            </div>
            <!--[if (mso)|(IE)]></td><![endif]-->
                  <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                </div>
              </div>
            </div>
           
           
           
            <div class="u-row-container" style="padding: 0px 10px;background-color: rgba(255,255,255,0)">
              <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 650px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #454545;">
                <div style="border-collapse: collapse;display: table;width: 100%;background-image: url('images/image-1.png');background-repeat: repeat;background-position: center top;background-color: transparent;">
                  <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px 10px;background-color: rgba(255,255,255,0);" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:650px;"><tr style="background-image: url('images/image-1.png');background-repeat: repeat;background-position: center top;background-color: #454545;"><![endif]-->
                 
            <!--[if (mso)|(IE)]><td align="center" width="650" style="width: 650px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
            <div class="u-col u-col-100" style="max-width: 320px;min-width: 650px;display: table-cell;vertical-align: top;">
              <div style="width: 100% !important;">
              <!--[if (!mso)&(!IE)]><!--><div style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
             
            <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
              <tbody>
                <tr>
                  <td style="overflow-wrap:break-word;word-break:break-word;padding:50px 20px 20px;font-family:arial,helvetica,sans-serif;" align="left">
                   
              <div style="color: #29ffd8; line-height: 120%; text-align: center; word-wrap: break-word;">
                <p style="font-size: 14px; line-height: 120%;"><span style="font-family: Montserrat, sans-serif; font-size: 40px; line-height: 48px;"><span style="line-height: 48px; font-size: 40px;">Mess Invitation</span></span></p>
            <p style="font-size: 14px; line-height: 120%;"><span style="font-family: Montserrat, sans-serif; font-size: 20px; line-height: 24px;"><span style="line-height: 24px; font-size: 20px;"><span style="font-family: Pacifico, cursive; font-size: 20px; line-height: 24px; color: #edf1f1;">No more messy life <br> 'cause your app manages</span></span></span></p>
            <p style="font-size: 14px; line-height: 120%;"><span style="font-family: Cabin, sans-serif; font-size: 20px; line-height: 24px; color: #edf1f1;">You are invited to join ${messName} via <span style="color: #c3e0f5; font-size: 20px; line-height: 24px;"><a rel="noopener" href="https://google.com" target="_blank">this link</a></span> or use this code "${messID}" to join on <a rel="noopener" href="https://google.com" target="_blank">this link</a></span></p>
              </div>
           
                  </td>
                </tr>
              </tbody>
            </table>
           
              <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
              </div>
            </div>
            <!--[if (mso)|(IE)]></td><![endif]-->
                  <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                </div>
              </div>
            </div>
           <br>
           
           
            <div class="u-row-container" style="padding: 0px 10px;background-color: rgba(255,255,255,0)">
              <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 650px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
                <div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
                  <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px 10px;background-color: rgba(255,255,255,0);" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:650px;"><tr style="background-color: #ffffff;"><![endif]-->
                 
            <!--[if (mso)|(IE)]><td align="center" width="650" style="width: 650px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
            <div class="u-col u-col-100" style="max-width: 320px;min-width: 650px;display: table-cell;vertical-align: top;">
              <div style="width: 100% !important;">
              <!--[if (!mso)&(!IE)]><!--><div style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
             
            <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
              <tbody>
                <tr>
                  <td style="overflow-wrap:break-word;word-break:break-word;padding:10px 20px;font-family:arial,helvetica,sans-serif;" align="left">
                   
              <table height="0px" align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 1px solid #CCC;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                <tbody>
                  <tr style="vertical-align: top">
                    <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                      <span>&#160;</span>
                    </td>
                  </tr>
                </tbody>
              </table>
           
                  </td>
                </tr>
              </tbody>
            </table>
           
              <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
              </div>
            </div>
            <!--[if (mso)|(IE)]></td><![endif]-->
                  <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                </div>
              </div>
            </div>
           
           
                <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                </td>
              </tr>
              </tbody>
              </table>
              <!--[if mso]></div><![endif]-->
              <!--[if IE]></div><![endif]-->
            </body>
           
            </html>
            `,
    };

    await mailTransporter.sendMail(mailDetails);
    res.send({ result: "success" });
  } catch (e) {
    error = e.message;
    res.send({ error });
  }
});

module.exports = router;