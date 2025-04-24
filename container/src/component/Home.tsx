import React from "react";

export default function Home() {
  return (
    <div className="font-[sans-serif]">
      <div className="mt-12 flex fle-col items-center justify-center py-6 px-4">
        <div className="grid md:grid-cols-2 items-center gap-40 max-w-6xl w-full ">
          <div className="hidden lg:block w-full">
            <h1 className="animate-pulse lg:text-8xl text-6xl font-extrabold lg:leading-[55px] tracking-wider text-opacity-40 text-pretty text-red-400 ">
              Housing Price Prediction Model
            </h1>
          </div>

          <div className="text-blue-900 text-3xl font-bold mb-0 p-2 m-0 place-self-center">
            <h2> (Microfrontend Container)</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
