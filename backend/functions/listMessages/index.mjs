import {
  ScanCommand as ScanCmd,
  QueryCommand as QueryCmd,
} from "@aws-sdk/client-dynamodb";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });

const sendResponse = (statusCode, body) => ({
  statusCode,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin":
      "http://shui-board-frontend.s3-website.eu-north-1.amazonaws.com",
    "Access-Control-Allow-Credentials": true,
  },
  body: JSON.stringify(body),
});

const formatItem = (item) => ({
  id: item.messageId.S,
  username: item.username.S,
  text: item.text.S,
  createdAt: item.createdAt.S,
});

export const handler = async (event) => {
  try {
    const queryParams = event.queryStringParameters || {};
    console.log("Query parameters recibidos:", queryParams);

    const username = queryParams.username?.trim();
    const sort = queryParams.sort === "asc" ? "asc" : "desc";

    console.log("Username recibido:", username);
    if (username) {
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

      return sendResponse(200, items);
    } else {
      console.log("No se envió username válido → haciendo scan completo");

      const result = await client.send(
        new ScanCmd({ TableName: process.env.TABLE_NAME || "ShuiMessages" })
      );

      let items = (result.Items || []).map(formatItem);

      items.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
      if (sort === "asc") items.reverse();

      return sendResponse(200, items);
    }
  } catch (error) {
    console.error("listMessages error:", error);
    return sendResponse(500, { error: "Internal error" });
  }
};
