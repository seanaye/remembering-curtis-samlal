import Tribute from "../components/tribute.tsx";
import { MessageOut } from "../routes/api/index.ts";

export default function Tributes(props: { tributes: Array<MessageOut> }) {
  const d = props.tributes.reduce((acc, cur, i) => {
    const mod = i % 3;
    if (mod === 0) {
      return [...acc, [cur]];
    }
    acc.at(-1)?.push(cur);
    return acc;
  }, [] as MessageOut[][]);
  console.log(d);
  return (
    <div class="col-span-12 min-h-screen px-6" id="tributes">
      <div class="grid grid-flow-row auto-rows-max gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-start">
        {d.map((g) => (
          <div class="grid gap-6 w-full">
            {g.map((t) => <Tribute message={t} />)}
          </div>
        ))}
      </div>
    </div>
  );
}
