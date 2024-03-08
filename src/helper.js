export const getPlayerName = (side, players) => {
  console.log("🪵");
  console.log({ side, players });

  return (
    players[side].name +
    (players[side + 2] ? " & " + players[side + 2].name : "")
  );
};
