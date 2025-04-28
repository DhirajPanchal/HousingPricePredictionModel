"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useAppContext } from "../context/AppContext";

export default function UserContext() {
  const { modules } = useAppContext();
  const router = useRouter();

  const handleItemClick = (route: string) => {
    router.push(`/${route}`);
  };

  const isSingleColumn = modules.length <= 3;
  const middleIndex = Math.ceil(modules.length / 2);
  const firstColumn = modules.slice(0, middleIndex);
  const secondColumn = modules.slice(middleIndex);

  return (
    <div className="min-h-[70vh] bg-white py-10 px-12">
      {/* Title */}
      <h1 className="text-2xl font-bold text-gray-800 mb-8">
        Your Applications:
      </h1>

      {/* Container with reserved height and width */}
      <div className="border-2 border-dashed border-gray-300 p-6 rounded-md bg-white w-[800px] min-h-[500px]">
        {isSingleColumn ? (
          <div className="flex flex-col gap-4">
            {modules.map((module) => (
              <div
                key={module.moduleId}
                className="flex items-center bg-gray-100 hover:bg-gray-200 border border-gray-200 rounded-md p-4 cursor-pointer transition shadow-sm hover:shadow-md w-full max-w-sm"
                onClick={() => handleItemClick(module.route)}
              >
                <Image
                  src={`/${module.route}.png`}
                  alt={module.moduleName}
                  width={36}
                  height={36}
                  className="object-contain mr-4"
                />
                <div className="font-semibold text-gray-800 text-base">
                  {module.moduleName}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex gap-8">
            <div className="flex flex-col gap-4 flex-1">
              {firstColumn.map((module) => (
                <div
                  key={module.moduleId}
                  className="flex items-center bg-gray-100 hover:bg-gray-200 border border-gray-200 rounded-md p-4 cursor-pointer transition shadow-sm hover:shadow-md w-full max-w-sm"
                  onClick={() => handleItemClick(module.route)}
                >
                  <Image
                    src={`/${module.route}.png`}
                    alt={module.moduleName}
                    width={36}
                    height={36}
                    className="object-contain mr-4"
                  />
                  <div className="font-semibold text-gray-800 text-base">
                    {module.moduleName}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-4 flex-1">
              {secondColumn.map((module) => (
                <div
                  key={module.moduleId}
                  className="flex items-center bg-gray-100 hover:bg-gray-200 border border-gray-200 rounded-md p-4 cursor-pointer transition shadow-sm hover:shadow-md w-full max-w-sm"
                  onClick={() => handleItemClick(module.route)}
                >
                  <Image
                    src={`/${module.route}.png`}
                    alt={module.moduleName}
                    width={36}
                    height={36}
                    className="object-contain mr-4"
                  />
                  <div className="font-semibold text-gray-800 text-base">
                    {module.moduleName}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
