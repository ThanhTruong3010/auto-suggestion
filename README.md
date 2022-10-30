# auto-suggestion

## Installation

```bash
$ yarn install
```

## Server demo

https://aesthetic-zuccutto-3275a3.netlify.app/

## Running the app

```bash
# development
$ yarn dev

# production mode
$ npm build
```

## Project Structure

```
  .
  ├── public            # Contains assets (image, fonts, icons, ...) used by the application
  ├── node_modules      # Contains libraries downloaded from npm
  ├── src               # Contains our App codebase
  │   ├── components    # shared components used by others
  │   ├── pages         # are one to one map of the router routes (the concept that NextJS takes)
  │   ├── utils
  │   └── ...
  └── ...
```

## Question 1

- I sent about 10 mins to do it.
  https://jsfiddle.net/6fevy8t7/67/

## Question 2

- I sent about 5 mins to do it.
  https://jsfiddle.net/qzt6ejmg/27/

## Apply feature to any Search box(Question 3)

Please follow props of AutoSugestion component as below:

```
export interface BlockConfigs {
    key: string;
    title: string;
    renderItem: (item: any) => React.ReactNode;
    [key: string]: any;
}
interface IProps {
    searchResult: any; // result search, required.
    classNameWrapper?: string;
    classNameInput?: string;
    classNameSearchResult?: string;
    onSearch: (search: string) => void; // this function used to call api search, required.
    blockConfigs?: BlockConfigs[];
}
```

- For AutoSugestion: You just need to apply `AutoSugestion` component to other Search box and you have to pass searchResult and onSearch props to component(required)
- For Setting: You will need to redirect to setting page(eg: http://127.0.0.1:5173/setting) in order to setting display block suggestion result and number of character is display autosuggestion
- Note: We can just search with `t` and `to` typing.

## Question 4

- How can I change the order of three blocks in the Suggestion result (Suggestion term, Collection and Product)?

  Answer: In my opinion, we should add more function drag and drop in setting block in the Suggestion result.
  Eg: With default position first(Sugesstion), second(Collection), third(Product)
  When we drag and drop Collection from position 2 to 1 then Collection'll displayed first instead of second and Sugesstion'll displayed second instead of first(It swap position).

- How can I integrate your feature to a specific textbox?

- I see currently, there is only one character to display the Suggestion when I type in the Search box. Can I increase the number of character to two?

  Answer: Yes we can, as you can know we have a config number of character is display autosuggestion functtion. So you can configure the number of character to two in seting page(Config number of character is display autosuggestion). You can refe my demo video how it works.

- I would like to customize the layout of the Product section in the Suggestion result. I have knowledge in JS and CSS so I can do it by myself. Can you please give me some instructions on how to do it?

  Answer: First of all, you should have a look to `BlockConfigs` interface. I defined `renderItem` type with type `(item: any) => React.ReactNode`. That mean you can pass a `ReactNode` to `renderItem` in `blockConfigs` object to customize the layout of the Product section like this:

  ```
  const blockConfigs: BlockConfigs[] = useMemo(
    () => [
      {
        key: "products",
        title: "Products",
        renderItem: (blockConfig: BlockConfigs) => { // You need to update here.
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
      ...
    [searchResult]
  );
    return(
         <AutoSuggestion
            blockConfigs={blockConfigs}
            searchResult={searchResult}
            onSearch={search}
        />
    )
  ```
