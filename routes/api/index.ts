import { HandlerContext, Handlers } from "$fresh/server.ts";
import { instantiate, Client } from "../../lib/rs_lib.generated.js";
import {
  minLength,
  object,
  parse,
  string,
} from "https://deno.land/x/valibot@v0.18.0/mod.ts";

await instantiate();
const client = Client.new(
  Deno.env.get("S3_URL")!,
  Deno.env.get("S3_BUCKET")!,
  Deno.env.get("S3_REGION")!,
  Deno.env.get("S3_PUBLIC_KEY")!,
  Deno.env.get("S3_PRIVATE_KEY")!,
  Deno.env.get("S3_HOST_REWRITE")
);
const db = await Deno.openKv();
type MessageIn = {
  text: string;
  from: string;
  imagePointer?: string;
};
export type MessageOut = MessageIn & { id: string; timestamp: number };

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

async function* listMessages(): AsyncGenerator<MessageOut> {
  const res = db.list<MessageIn>({ prefix: [PREFIX] });
  // const out: Array<MessageOut> = [];
  for await (const entry of res) {
    yield {
      id: entry.key[2] as string,
      timestamp: entry.key[1] as number,
      ...entry.value,
    };
  }
  // return out.sort(() => Math.random() - 0.5);
}

async function listMessageArray(): Promise<Array<MessageOut>> {
  const out: Array<MessageOut> = [];
  for await (const msg of listMessages()) {
    out.push(msg);
  }
  return out.sort(() => Math.random() - 0.5);
}

export const handler: Handlers = {
  GET: async (req) => {
    const list = await listMessages();
    const body = JSON.stringify({ messages: list });
    return new Response(body, {
      headers: { "Content-Type": "application/json " },
    });
  },
  POST: async (req) => {
    try {
      const body = await req.formData();
      const validated = parse(MessageSchema, {
        text: body.get("text"),
        from: body.get("from"),
      });
      const image = body.get("image");
      let imagePointer: string | undefined = undefined;
      if (image instanceof File) {
        // todo upload images to s3
        const id = crypto.randomUUID();
        const obj = client.sign_upload(id);
        const out = await fetch(obj, {
          method: "PUT",
          headers: { "Content-Type": image.type },
          body: image,
        });
        console.log({ out })
        imagePointer = id;
      }
      await writeMessage({ ...validated, imagePointer });
      return new Response("OK");
    } catch (e) {
      console.error(e);
      return new Response(e.message, { status: 400 });
    }
  },
};
