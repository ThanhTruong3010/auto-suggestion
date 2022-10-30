import React, { useEffect, useState } from "react";
import { settingsDefault } from "../App";

interface Settings {
  title: string;
  name: string;
  checked: boolean;
}

interface IProps {
  settings?: Settings[];
}

function SettingDisplayBlockResult({ settings = settingsDefault }: IProps) {
  const [settingState, setSettingState] = useState(settings);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = settingState.find((item) => item.name === e.target.name);
    if (newValue) {
      newValue.checked = e.target.checked;
    }
    localStorage.setItem("setting", JSON.stringify(settingState));
    setSettingState([...settingState]);
  };

  useEffect(() => {
    let settingFromLocalStorage = JSON.parse(
      localStorage.getItem("setting") || "[]"
    );
    if (settingFromLocalStorage.length) {
      setSettingState(settingFromLocalStorage);
    }
  }, []);

  return (
    <div className="flex justify-center flex-row">
      <div className="max-w-5xl w-full mt-10">
        <div className="block p-6 bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Seting Display Block Suggestion Result
          </h5>
          {settingState.map((item) => {
            return (
              <div className="mt-4" key={item.name}>
                <label className="inline-flex relative items-center mb-4 cursor-pointer">
                  <input
                    checked={item.checked}
                    onChange={onChange}
                    type="checkbox"
                    name={item.name}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                    {item.title}
                  </span>
                </label>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default SettingDisplayBlockResult;
