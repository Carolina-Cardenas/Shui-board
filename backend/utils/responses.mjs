// export const sendResponse = (statusCode, body) => {
//   return {
//     statusCode,
//     headers: {
//       "Content-Type": "application/json",
//       "Access-Control-Allow-Origin": "*",
//       "Access-Control-Allow-Credentials": true,
//     },
//     body: JSON.stringify(body),
//   };
// };
const sendResponse = (statusCode, body) => ({
  statusCode,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "http://localhost:5173", // dominio exacto
    "Access-Control-Allow-Credentials": "true",
  },
  body: JSON.stringify(body),
});
