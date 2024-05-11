const MatchHeader = ({ event, stage, gameOf, bestOf }) => {
  return (
    <div
      className="row flex items-center z-10 border-t-8 border-secondary bg-secondary md:bg-transparent"
      id="match-details"
    >
      <svg
        className="absolute left-1/2 ml-[-25%] w-1/2 hidden md:block"
        width="400"
        height="200"
        viewBox="0 0 400 200"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <polygon points="7,35 393,35 355,200 45,200" className="fill-white" />
        <polygon
          points="10,10 390,10 350,190 50,190"
          className="fill-secondary"
        />
      </svg>
      <div className="col text-center max-w-[482px]">
        <h2 className="match-title h2">{event}</h2>
        <h4 className="match-stage">{stage}</h4>
        <h6 className="match-config">
          Game of: {gameOf} | Best of {bestOf}
        </h6>
      </div>
    </div>
  );
};

export { MatchHeader };
