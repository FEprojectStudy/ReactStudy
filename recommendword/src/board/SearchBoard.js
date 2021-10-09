import { React, useState } from "react";
import ShowWord from "./ShowWord";

const SearchBoard = () => {
  const [value, setValue] = useState("");

  return (
    <>
      <form>
        <input onChange={(e) => setValue(e.currentTarget.value)} />
      </form>
      <ShowWord nowValue={value} />
    </>
  );
};
export default SearchBoard;
