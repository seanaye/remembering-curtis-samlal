import { HandlerContext, Handlers } from "$fresh/server.ts";
import {
  object,
  string,
  minLength,
  optional,
  parse,
} from "https://deno.land/x/valibot@v0.18.0/mod.ts";

const db = await Deno.openKv();
type MessageIn = {
  text: string;
  from: string;
  imagePointer?: string;
};
type MessageOut = MessageIn & { id: string; timestamp: number };

const PREFIX = "messages";

async function writeMessage(msg: MessageIn): Promise<MessageOut> {
  const date = new Date().getTime();
  const id = crypto.randomUUID();
  await db.set([PREFIX, date, id], msg);
  return {
    ...msg,
    id,
    timestamp: date,
  };
}

const MessageSchema = object({
  text: string([minLength(10)]),
  from: string([minLength(1)]),
});

async function listMessages(): Promise<Array<MessageOut>> {
  const res = db.list<MessageIn>({ prefix: [PREFIX] });
  const out: Array<MessageOut> = [];
  for await (const entry of res) {
    out.push({
      id: entry.key[2] as string,
      timestamp: entry.key[1] as number,
      ...entry.value,
    });
  }
  return out.sort(() => Math.random() - 0.5);
}

export const handler: Handlers = {
  GET: async () => {
    const list = await listMessages();
    const body = JSON.stringify({ messages: list });
    return new Response(body, {
      headers: { "Content-Type": "application/json " },
    });
  },
  POST: async (req) => {
    try {
      const body = await req.formData();
      const validated = parse(MessageSchema, body);
      console.log({ validated });
      const image = body.get("image");
      let imagePointer = undefined;
      if (image instanceof File) {
        // todo upload images to s3
        console.log({ image });
      }
      await writeMessage({ ...validated, imagePointer });
      return new Response("OK");
    } catch (e) {
      return new Response(e.message, { status: 400 });
    }
  },
};
