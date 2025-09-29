import { PutItemCommand } from "@aws-sdk/client-dynamodb";
import { client } from "../../services/db.mjs";
import { sendResponse } from "../../utils/responses.mjs";
import { nanoid } from "nanoid";

export const handler = async (event) => {
  try {
    const body = JSON.parse(event.body || "{}");
    const { username, text } = body;
    if (!username || !text) {
      return sendResponse(400, { error: "username and text required" });
    }

    const id = nanoid();
    const createdAt = new Date().toISOString();

    const Item = {
      id: { S: id },
      username: { S: username },
      text: { S: text },
      createdAt: { S: createdAt },
    };

    await client.send(
      new PutItemCommand({
        TableName: process.env.TABLE_NAME || "ShuiMessages",
        Item,
      })
    );

    return sendResponse(201, { id, username, text, createdAt });
  } catch (err) {
    console.error("createMessage error", err);
    return sendResponse(500, { error: "Internal error" });
  }
};
