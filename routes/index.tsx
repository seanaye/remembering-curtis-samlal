import { useSignal } from "@preact/signals";

export default function Home() {
  return (
    <div class="grid min-h-screen grid-cols-12">
      <div class="col-span-4 min-h-screen bg-gray-100">
        <img src="logo.svg" alt="logo" />
      </div>
      <div class="col-span-8 min-h-screen bg-gray-200">this is placeholder</div>
      <div class="col-span-12 min-h-screen flex justify-center items-center">
        <div class="p-4 rounded bg-gray-200">this is more content</div>
      </div>
    </div>
  );
}
