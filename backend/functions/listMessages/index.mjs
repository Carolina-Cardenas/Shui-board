// import { ScanCommand as d, QueryCommand as p } from "@aws-sdk/client-dynamodb";
// import { DynamoDBClient as u } from "@aws-sdk/client-dynamodb";
// var o = new u({ region: "eu-north-1" });
// var t = (e, r) => ({
//   statusCode: e,
//   headers: {
//     "Content-Type": "application/json",
//     "Access-Control-Allow-Origin": "*",
//     "Access-Control-Allow-Credentials": !0,
//   },
//   body: JSON.stringify(r),
// });
// var i = (e) => ({
//     id: e.messageId.S,
//     username: e.username.S,
//     text: e.text.S,
//     createdAt: e.createdAt.S,
//   }),
//   w = async (e) => {
//     try {
//       let r = e.queryStringParameters || {},
//         a = r.username,
//         c = r.sort || "desc";
//       if (a) {
//         let m = {
//             TableName: process.env.TABLE_NAME || "ShuiMessages",
//             IndexName: "userIndex",
//             KeyConditionExpression: "username = :u",
//             ExpressionAttributeValues: { ":u": { S: a } },
//             ScanIndexForward: c === "asc",
//           },
//           n = ((await o.send(new p(m))).Items || []).map(i);
//         return t(200, n);
//       } else {
//         let s = (
//           (
//             await o.send(
//               new d({ TableName: process.env.TABLE_NAME || "ShuiMessages" })
//             )
//           ).Items || []
//         ).map(i);
//         return (
//           s.sort((n, l) => l.createdAt.localeCompare(n.createdAt)),
//           c === "asc" && s.reverse(),
//           t(200, s)
//         );
//       }
//     } catch (r) {
//       return (
//         console.error("listMessages error", r),
//         t(500, { error: "Internal error" })
//       );
//     }
//   };
// export { w as handler };
import {
  ScanCommand as ScanCmd,
  QueryCommand as QueryCmd,
} from "@aws-sdk/client-dynamodb";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });

// Función para enviar respuesta HTTP
const sendResponse = (statusCode, body) => ({
  statusCode,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true,
  },
  body: JSON.stringify(body),
});

// Transformar item de DynamoDB a objeto legible
const formatItem = (item) => ({
  id: item.messageId.S,
  username: item.username.S,
  text: item.text.S,
  createdAt: item.createdAt.S,
});

// Función principal
export const handler = async (event) => {
  try {
    // 🔊 Imagina que estamos abriendo el carrito para ver qué query llega
    const queryParams = event.queryStringParameters || {};
    console.log("Query parameters recibidos:", queryParams);

    const username = queryParams.username?.trim(); // eliminar espacios en blanco
    const sort = queryParams.sort === "asc" ? "asc" : "desc";

    // Si hay username válido, usar índice secundario
    console.log("Username recibido:", username);
    if (username) {
      // 🏷️ "Etiqueta del estante": username
      const params = {
        TableName: process.env.TABLE_NAME || "ShuiMessages",
        IndexName: "userIndex",
        KeyConditionExpression: "username = :u",
        ExpressionAttributeValues: { ":u": { S: username } },
        ScanIndexForward: sort === "asc", // true = ascendente
      };

      console.log("Query DynamoDB con índice userIndex:", params);

      const result = await client.send(new QueryCmd(params));
      const items = (result.Items || []).map(formatItem);

      // 🎨 Asociación visual: ordenar los mensajes como si fueran post-its en el tablero
      return sendResponse(200, items);
    } else {
      // Si no hay username, hacemos un scan general
      console.log("No se envió username válido → haciendo scan completo");

      const result = await client.send(
        new ScanCmd({ TableName: process.env.TABLE_NAME || "ShuiMessages" })
      );

      let items = (result.Items || []).map(formatItem);

      // Orden descendente por defecto
      items.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
      if (sort === "asc") items.reverse();

      return sendResponse(200, items);
    }
  } catch (error) {
    console.error("listMessages error:", error);
    // 🔊 Nemotecnia auditiva: DynamoDB grita “500 Internal Error” si no puede procesar tu carrito
    return sendResponse(500, { error: "Internal error" });
  }
};
