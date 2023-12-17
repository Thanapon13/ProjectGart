export default function Footer() {
  const dataFooter = [
    "More Behance",
    "English",
    "TOU",
    "Privacy",
    "Community",
    "Help",
    "Cookie preferences"
  ];
  // console.log("dataFooter:", dataFooter);

  return (
    <footer className="m-[0] p-[0] box-border bg-fixed bg-white border-t-2 ">
      <div className="w-full  h-[33px] mx-auto container md:p-6 p-4 md:flex md:items-center md:justify-between">
        <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
          {/* {dataFooter.map((el, idx) => (
            <li key={idx}>
              <button className="hover:underline md:mr-6">{el}</button>
            </li>
          ))} */}
          <li>Project G-art</li>
        </ul>
      </div>
    </footer>
  );
}
