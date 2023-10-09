import Tribute from "../components/tribute.tsx";
import { MessageOut } from "../routes/api/index.ts";

export default function Tributes(props: { tributes: Array<MessageOut> }) {
  return (
    <div class="col-span-12 min-h-screen px-6" id="tributes">
      <div class="grid grid-flow-row auto-rows-max gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 items-start">
        {props.tributes.map(function (d) {
          return <Tribute message={d} />;
        })}
      </div>
    </div>
  );
}
