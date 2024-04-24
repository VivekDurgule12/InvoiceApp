

// export default async function GenPdf({ items, totalBill, name, address, contact }) {
//     try {
//         const currentDate = new Date();
//         const formattedDate = currentDate.toLocaleDateString();
//         const formattedTime = currentDate.toLocaleTimeString();

//         const htmlContent = `
//             <html>
//             <head>
//                 <style>
//                     body {
//                         font-family: 'Arial', sans-serif;
//                     }
//                     table {
//                         width: 100%;
//                         border-collapse: collapse;
//                         border: 1px solid;
//                     }
//                     th, td {
//                         border: 1px solid;
//                         padding: 8px;
//                         text-align: left;
//                     }
//                     th {
//                         background-color: #f2f2f2;
//                     }
//                     h6 {
//                         text-align: center;
//                         margin-top: 3%;
//                     }
//                     h1 {
//                         margin: 5%;
//                     }
//                     hr {
//                         height: 5px;
//                         background: #000;
//                     }
//                     h3 {
//                         margin-bottom: 5px;
//                     }
//                 </style>
//             </head>
//             <body>
//                 <h6>|| श्री ज्योतिबा प्रसन्न ||</h6>
//                 <h1>Dipak Traders</h1>
//                 <hr>
//                 <h3>Customer Name: ${name}</h3>
//                 <h3>Address: ${address}</h3>
//                 <h3>Contact: ${contact}</h3>
//                 <h3>Date: ${formattedDate} Time: ${formattedTime}</h3>
//                 <table style="width:100%; border-collapse: collapse; border: 1px solid;">
//                     <tr>
//                         <th>No</th>
//                         <th>Item</th>
//                         <th>Quantity</th>
//                         <th>Price</th>
//                         <th>Amount</th>
//                     </tr>
//                     ${items.map((item, index) => (`
//                     <tr key=${index}>
//                         <td>${index + 1}</td>
//                         <td>${item.name}</td>
//                         <td>${item.quantity}</td>
//                         <td>${item.price}</td>
//                         <td>${item.totalPrice}</td>
//                     </tr>` )).join('')}
//                 </table>
//                 <h3>Total Bill: ${totalBill}</h3>
//             </body>
//             </html>
//         `;

//         const path = `${RNFS.DocumentDirectoryPath}/invoice.pdf`;
//         await RNFS.writeFile(path, htmlContent, 'utf8');
//         console.log('PDF created successfully:', path);
//         return path;
//     } catch (error) {
//         console.error('Error creating PDF:', error.message);
//         throw new Error('Failed to generate PDF. Please try again.'); // Provide a user-friendly error message
//     }
// }

