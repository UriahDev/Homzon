// export async function post({fetch}) {
//   const mobileNumber = '0548038467'
//   const resp = await fetch(
//     `https://devp-reqsendmoney-230622-api.hubtel.com/request-money/${mobileNumber}`,
//     {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: 'Basic ' + Buffer.from('Otchere Uriah Darko:Ideaz669645').toString('base64')
//       },
//       body: JSON.stringify({
//         amount: 100,
//         title: 'Omozon Pay',
//         description: 'Payment for selected online payment',
//         clientReference: 'string',
//         callbackUrl: 'http://example.com',
//         cancellationUrl: 'http://example.com',
//         returnUrl: 'http://example.com',
//         logo: 'http://example.com'
//       })
//     }
//   );

//   const data = await resp.json();
//   console.log(data);
// }

// post();