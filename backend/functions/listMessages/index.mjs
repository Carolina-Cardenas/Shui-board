import { ScanCommand, QueryCommand } from "@aws-sdk/client-dynamodb";
import { client } from "../../services/db.mjs";
import { sendResponse } from "../../utils/responses.mjs";

const mapItem = (it) => ({
  id: it.messageId.S,
  username: it.username.S,
  text: it.text.S,
  createdAt: it.createdAt.S,
});

export const handler = async (event) => {
  try {
    const qp = event.queryStringParameters || {};
    const username = qp.username;
    const sort = qp.sort || "desc";

    if (username) {
      const params = {
        TableName: process.env.TABLE_NAME || "ShuiMessages",
        IndexName: "ByUserIndex",
        KeyConditionExpression: "username = :u",
        ExpressionAttributeValues: {
          ":u": { S: username },
        },
        ScanIndexForward: sort === "asc",
      };
      const result = await client.send(new QueryCommand(params));
      const items = (result.Items || []).map(mapItem);
      return sendResponse(200, items);
    } else {
      const result = await client.send(
        new ScanCommand({
          TableName: process.env.TABLE_NAME || "ShuiMessages",
        })
      );
      let items = (result.Items || []).map(mapItem);
      items.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
      if (sort === "asc") items.reverse();
      return sendResponse(200, items);
    }
  } catch (err) {
    console.error("listMessages error", err);
    return sendResponse(500, { error: "Internal error" });
  }
};
