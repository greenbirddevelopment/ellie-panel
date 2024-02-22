import Spinner from "./Spinner";

const Loading = () => {
  return (
    <div id="loading-overlay" className="flex-col">
      <Spinner />
      <span className="text-white text-lg mt-2">Setting up</span>
    </div>
  );
};

export default Loading;
