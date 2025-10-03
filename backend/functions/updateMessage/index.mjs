import { GetItemCommand, UpdateItemCommand } from "@aws-sdk/client-dynamodb";
import { client } from "../../services/db.mjs";

export const handler = async (event) => {
  try {
    const id = event.pathParameters && event.pathParameters.id;
    if (!id) return sendResponse(400, { error: "Missing id" });

    const body = JSON.parse(event.body || "{}");
    const { text } = body;
    if (!text) return sendResponse(400, { error: "text required" });

    const get = await client.send(
      new GetItemCommand({
        TableName: process.env.TABLE_NAME || "ShuiMessages",
        Key: { messageId: { S: id } },
      })
    );
    if (!get.Item) return sendResponse(404, { error: "Message not found" });

    const now = new Date().toISOString();
    await client.send(
      new UpdateItemCommand({
        TableName: process.env.TABLE_NAME || "ShuiMessages",
        Key: { messageId: { S: id } },
        UpdateExpression: "SET #t = :text, updatedAt = :u",
        ExpressionAttributeNames: { "#t": "text" },
        ExpressionAttributeValues: {
          ":text": { S: text },
          ":u": { S: now },
        },
      })
    );

    return sendResponse(200, {
      id,
      text,
      username: get.Item.username.S,
      createdAt: get.Item.createdAt.S,
      updatedAt: now,
    });
  } catch (err) {
    console.error("updateMessage error", err);
    return sendResponse(500, { error: "Internal error" });
  }
};
const sendResponse = (statusCode, body) => ({
  statusCode,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": "true",
  },
  body: JSON.stringify(body),
});
