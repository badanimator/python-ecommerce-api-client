import Nav from "../components/Nav";
import Header from "../components/Header";
import { useState } from "react";


const Page = ({children, title, loading, types, categories }) => {
  const [open, setOpen] = useState(false);
  const [grid, setGrid] = useState(4);
  const [sortOpen, setSortOpen] = useState(false);
  return (
    <>
      <Header title={title} />
      <div className="w-full min-h-screen bg-gray-200 pb-10">
        <Nav />
        <div className="max-w-6xl mx-auto pt-14 md:px-0">
          {children}
        </div>
      </div>
    </>
  );
};

export default Page;
