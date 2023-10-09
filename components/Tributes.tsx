import Tribute from "../components/tribute.tsx";
import { MessageOut } from "../routes/api/index.ts";

export default function Tributes(props: { tributes: Array<MessageOut> }) {
  return (
    <div class="col-span-12 min-h-screen px-6">
      <div class="grid grid-flow-row gap-6 grid-cols-6 items-start">
        {props.tributes.map(function (d) {
          return <Tribute message={d} />;
        })}
      </div>
    </div>
  );
}
