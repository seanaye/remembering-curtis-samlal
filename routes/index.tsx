import { useSignal } from "@preact/signals";
import Form from "../components/Form.tsx";
import { HandlerContext } from "$fresh/server.ts";
import { listMessageArray } from "./api/index.ts";
import Tributes from "../components/Tributes.tsx";

const text =
  "Curtis was, without a doubt, the life of the party. He had an incredible zest for life and an enthusiasm that was contagious. He knew how to have a good time and how to make sure everyone else did too. His laughter echoed through the best moments of our lives, and we will forever cherish the joy he brought us. /n Beyond his creative talents and his ability to bring joy to any occasion, Curtis was a devoted family man. He cherished his loved ones and held them close to his heart. His family was the center of his universe, and he never missed an opportunity to express his love and gratitude for them. Curtis was also a logical thinker, a quality that served him well in his creative endeavors. He approached his work with precision and attention to detail, ensuring that every decoration and every event was a masterpiece. As we say our final goodbyes to Curtis, let us remember the legacy he leaves behind. A legacy of creativity, friendship, family, logic, and, above all, a legacy of being the life of the party. He brought us together, made our lives more beautiful, and filled our hearts with happiness. Though Curtis may no longer be with us in person, his spirit lives on in the memories we hold dear. Let us celebrate his life, his creativity, his kindness, and his infectious spirit. Curtis Samlal will forever remain in our hearts, a shining star in the tapestry of our lives.";

export default async function Home(req: Request, ctx: HandlerContext) {
  const invalidForm = new URL(req.url).searchParams.get("invalid") === "true";

  const tributes = await listMessageArray(100);

  return (
    <div class="bg-gradient-to-b from-yellow-400 via-red-500 to-pink-500">
      <div class="mx-auto max-w-7xl py-10  sm:py-10 lg:px-8 px-4">
        <div class="flex min-h-screen items-center">
          <div class="mx-auto max-w-2xl lg:max-w-none">
            <div class="max-w-3xl">
              <p class="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Remembering Curtis Samlal
              </p>
            </div>

            <div class="mt-1 space-y-16 border-t border-gray-200 pt-1 sm:mt-5 sm:pt-5">
              <div class="flex flex-col-reverse lg:grid lg:grid-cols-12 lg:items-center lg:gap-x-8">
                <div class="flex-auto lg:col-span-5 xl:col-span-6">
                  <div class="aspect-h-2 aspect-w-6 overflow-hidden rounded-lg bg-gray-100">
                    <img
                      src="landing_pic.jpg"
                      alt="Printed photo of bag being tossed into the sky on top of grass."
                      class="object-cover object-center"
                    />
                  </div>
                </div>
                <div class="mt-6 lg:col-span-6 lg:mt-0 xl:col-span-6">
                  <h3 class="text-lg font-medium text-gray-900">
                    Curtis Samlal
                  </h3>
                  <p class="mt-2 text-sm text-gray-500">{text}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="min-h-screen flex items-center">
          <Form invalid={invalidForm} />
        </div>
        <Tributes tributes={tributes} />
      </div>
    </div>
  );
}
