export const LoadingScreen = () => {
  return (
    <div className="loading-screen animate-fadeIn">
      <div className="loading-content">
        <div className="cssload-thecube">
          <div className="cssload-cube cssload-c1"></div>
          <div className="cssload-cube cssload-c2"></div>
          <div className="cssload-cube cssload-c4"></div>
          <div className="cssload-cube cssload-c3"></div>
        </div>
        <h1 className="font-sans text-lg">Please wait while we load the data</h1>
      </div>
      {/* <img className="object-cover" src="/loading1.gif" alt="loading" /> */}
    </div>
  );
};
