import React, { useMemo, useState } from "react";
import AutoSuggestion, { BlockConfigs } from "../components/AutoSuggestion";

function Home() {
  const [searchResult, setSearchResult] = useState<any>({});

  const fetchSearch = async (endpoint: string) => {
    const res = await fetch(endpoint);
    const data = await res.json();
    setSearchResult(data);
  };

  // NOTE: This function is hardcode for testing.
  const search = (input: string) => {
    if (input === "") {
      setSearchResult({});
    } else if (input.toLocaleLowerCase() === "t") {
      fetchSearch("https://mocki.io/v1/e30e5d59-7de6-46b0-970a-c3d99fe5b032");
    } else if (input.toLocaleLowerCase() === "to") {
      fetchSearch("https://mocki.io/v1/ab823b59-46ea-4cf6-99cd-43d3e70e66f2");
    } else {
      // TODO: do something.
    }
  };

  const settingFromLocalStorage = JSON.parse(
    localStorage.getItem("setting") || "[]"
  );

  const blockConfigs: BlockConfigs[] = useMemo(
    () => [
      {
        key: "suggestions",
        title: "Suggestions",
        renderItem: (blockConfig: BlockConfigs) => {
          return (
            <>
              <div className="bg-green-100 p-2 text-gray-600">
                {blockConfig.title.toLocaleUpperCase()}
              </div>
              {searchResult[blockConfig.key]?.map((item: any) => (
                <div
                  className="cursor-pointer hover:bg-gray-200 p-2 px-2 py-1"
                  key={item.id}
                >
                  <span>{item.term}</span>
                </div>
              ))}
            </>
          );
        },
      },
      {
        key: "collections",
        title: "Collections",
        renderItem: (blockConfig: BlockConfigs) => {
          return (
            <>
              <div className="bg-green-100 p-2 text-gray-600">
                {blockConfig.title.toLocaleUpperCase()}
              </div>
              {searchResult[blockConfig.key]?.map((item: any) => (
                <div
                  className="cursor-pointer hover:bg-gray-200 p-2 px-2 py-1"
                  key={item.id}
                >
                  <span>{item.title}</span>
                </div>
              ))}
            </>
          );
        },
      },
      {
        key: "products",
        title: "Products",
        renderItem: (blockConfig: BlockConfigs) => {
          return (
            <>
              <div className="bg-green-100 p-2 text-gray-600">
                {blockConfig.title.toLocaleUpperCase()}
              </div>
              {searchResult[blockConfig.key]?.map((item: any) => (
                <div
                  className="cursor-pointer hover:bg-gray-200 p-2 px-2 py-1"
                  key={item.id}
                >
                  <div className="flex">
                    <img
                      className="bg-contain bg-center w-15 h-28"
                      src={item.image}
                      alt=""
                    />
                    <div className="ml-4 flex flex-col">
                      <span className="font-medium">{item.title}</span>
                      <span className="text-gray-500 text-sm">
                        {item.brand}
                      </span>
                      <span className="font-bold">${item.price}</span>
                    </div>
                  </div>
                </div>
              ))}
            </>
          );
        },
      },
    ],
    [searchResult]
  );

  return (
    <div className="flex justify-center flex-row">
      <div className="max-w-5xl w-full mt-10">
        <h1 className="flex justify-center text-4xl">Auto Suggestion Search</h1>
        <AutoSuggestion
          blockConfigs={blockConfigs}
          searchResult={searchResult}
          onSearch={search}
        />
      </div>
    </div>
  );
}

export default Home;
