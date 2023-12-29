export default function ButtonClear({ getSearch, onClick, title }) {
  return (
    <>
      <span
        id="badge-dismiss-red"
        className="inline-flex items-center px-2 py-1 me-2 text-sm font-medium text-red-800 bg-red-100 rounded dark:bg-red-900 dark:text-red-300"
      >
        {title || getSearch}
        <button
          type="button"
          className="inline-flex items-center p-1  ms-2 text-sm text-red-400 bg-transparent rounded-sm hover:bg-red-200 hover:text-red-900 dark:hover:bg-red-800 dark:hover:text-red-300"
          data-dismiss-target="#badge-dismiss-red"
          aria-label="Remove"
          onClick={onClick}
        >
          <svg
            className="w-2 h-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path stroke="currentColor" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
          </svg>
          <span className="sr-only">Remove badge</span>
        </button>
      </span>
    </>
  );
}
