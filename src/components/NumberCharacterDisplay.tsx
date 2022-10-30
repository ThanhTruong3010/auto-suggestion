import React, { useEffect, useState } from "react";
import { characterDisplayDefault } from "../App";

function NumberCharacterDisplay() {
  const [value, setValue] = useState<number>(characterDisplayDefault);

  useEffect(() => {
    const ch = JSON.parse(
      localStorage.getItem("characterDisplayDefault") || "1"
    );
    if (ch === undefined) {
      setValue(characterDisplayDefault);
    }
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(+e.target.value);
  };

  const onSave = () => {
    localStorage.setItem("characterDisplayDefault", JSON.stringify(value));
  };

  return (
    <div className="mt-10">
      <div className="flex justify-center flex-row">
        <div className="max-w-5xl w-full mt-10">
          <div className="block p-6 bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Config number of character is display autosuggestion
            </h5>
            <div className="mt-4">
              <input
                onChange={onChange}
                value={value}
                type="number"
                className="bg-gray-50 border w-full border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="1"
                required
              />
            </div>
            <button
              type="button"
              onClick={onSave}
              className="text-white mt-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NumberCharacterDisplay;
