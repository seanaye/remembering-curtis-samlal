import Tribute from "../components/tribute.tsx";
import { MessageOut } from "./api/index.ts";

export default function Tributes(tributes: any[]) {
  return (
    <div>
      {tributes.map(function (d) {
        return <Tribute props={d}></Tribute>;
      })}
    </div>
  );
}
