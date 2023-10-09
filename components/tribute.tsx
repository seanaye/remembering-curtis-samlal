import { MessageOut } from "../routes/api/index.ts";

export default function Tribute(props: { message: MessageOut }) {
  const { text, from } = props.message;
  return (
    <div class="bg-yellow-100 rounded">
      <div class="flex flex-shrink-0 p-4 pb-0">
        <a href="#" class="flex-shrink-0 group block">
          <div class="flex items-center">
            <p class="text-base leading-6 font-medium text-black">{from}</p>
          </div>
        </a>
      </div>
      <div class="flex flex-shrink-0 p-4 pb-4">
        <p class="text-base width-auto font-medium text-black flex-shrink">
          {text}
        </p>
        {props.message.imagePointer && (
          <img
            src={props.message.imagePointer}
            class="w-20 h-20 object-cover"
          />
        )}
      </div>
    </div>
  );
}
