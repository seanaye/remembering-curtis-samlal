import { MessageOut } from "../routes/api/index.ts";

export default function Tribute(props: { message: MessageOut }) {
  const { text, from } = props.message;
  return (
    <div class="bg-white border-2 border-orange-300 rounded flex-grow">
      <div class="flex flex-shrink-0 p-4 pb-0">
        <a href="#" class="flex-shrink-0 group block">
          <div class="flex items-center">
            <p class="text-base leading-6 font-medium text-yellow-700 uppercase">
              {from}
            </p>
          </div>
        </a>
      </div>
      <div class="flex-col gap-x-4 flex-shrink-0 p-4 pb-4">
        <p class="text-base width-auto font-medium text-black flex-shrink pb-2">
          {text}
        </p>
        {props.message.imagePointer && (
          <img
            src={props.message.imagePointer}
            class="w-full h-24 object-contain"
          />
        )}
      </div>
    </div>
  );
}
