const express = require('express');
const qrcode = require('qrcode');
const cors = require('cors')
// const app = express();
const port = process.env.PORT || 3000;



// Create the Express app & setup middlewares
const app = express();
app.use(express.json());
const allowedOrigins = [
  /http:\/\/(127(\.\d){3}|localhost)/
];
app.use(cors({ origin: allowedOrigins }));
app.options('*', cors());


// app.post('/qrcode', (req, res) => {
//   const { text, img } = req.body;



//   qrcode.toDataURL(text).then(dataUrl => {
//     if (img === undefined) {
//       res.send({ qrcode: dataUrl });
//     }
//     else {
//       res.send(`<img src="${dataUrl}">`);
//     }
//   })
//     .catch(err => {
//       console.error('Error: ', err);
//       res.status(500).send({ error: 'An error occurred trying to generate QR Code.' });
//     });
// });

app.post('/qrcode', (req, res) => {
  const { text, img } = req.body;

  const opts = {
    errorCorrectionLevel: 'H',
    type: 'png',
    quality: 1,
    margin: 1,
    color: {
      dark: "#010599FF",
      light: "#FFBF60FF"
    },
    scale: 10 // Use a high scale factor for a high-resolution image
  };

  qrcode.toDataURL(text, opts)
    .then(dataUrl => {
      if (img === undefined) {
        res.send({ qrcode: dataUrl });
      }
      else {
        res.send(`<img src="${dataUrl}">`);
      }
    })
    .catch(err => {
      console.error('Error: ', err);
      res.status(500).send({ error: 'An error occurred trying to generate QR Code.' });
    });
});


app.listen(port, () => {
  console.log(`Server is running and listening at http://localhost:${port}`);
});
