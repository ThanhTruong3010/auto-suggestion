import clsx from "clsx";
import React, { useState } from "react";
import isEmpty from "lodash/isEmpty";

export interface BlockConfigs {
  key: string;
  title: string;
  renderItem: (item: any) => React.ReactNode;
  [key: string]: any;
}

interface IProps {
  searchResult: any;
  classNameWrapper?: string;
  classNameInput?: string;
  classNameSearchResult?: string;
  onSearch: (search: string) => void;
  blockConfigs?: BlockConfigs[];
}

function AutoSuggestion({
  searchResult,
  onSearch,
  blockConfigs,
  classNameWrapper = "",
  classNameInput = "",
  classNameSearchResult = "",
}: IProps) {
  const [search, setSearch] = useState("");

  const onHandleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const ch = JSON.parse(
      localStorage.getItem("characterDisplayDefault") || "1"
    );
    setSearch(e.target.value);
    if (e.target.value?.length === +ch) onSearch(e.target.value);
  };

  const settingFromLocalStorage = JSON.parse(
    localStorage.getItem("setting") || "[]"
  );

  return (
    <>
      <div className={clsx(classNameWrapper, "flex items-center mt-10")}>
        <div className="relative w-full">
          <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
          <input
            value={search}
            onChange={onHandleSearch}
            type="text"
            id="simple-search"
            className={clsx(
              classNameInput,
              "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            )}
            placeholder="Search"
            required
          />
        </div>
      </div>
      {!isEmpty(searchResult) && (
        <div
          className={clsx(
            classNameSearchResult,
            "mt-4 shadow-lg shadow-cyan-50 border border-slate-100"
          )}
        >
          {blockConfigs?.map((blockConfig) => {
            const isDisplay = settingFromLocalStorage.some(
              (item: any) => item.name === blockConfig.key && item.checked
            );
            if (!isDisplay) return null;
            return (
              <div key={blockConfig.key}>
                {blockConfig.renderItem(blockConfig)}
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}

export default AutoSuggestion;
