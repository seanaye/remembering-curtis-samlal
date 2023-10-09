import Tribute from "../components/tribute.tsx";
import { MessageOut } from "./api/index.ts";

export default function Tributes(props: { tributes: any[] }) {
  return (
    <div class="w-3/5 border border-gray-600 h-auto  border-t-0">
      {props.tributes.map(function (d) {
        return <Tribute props={d}></Tribute>;
      })}
    </div>
  );
}
