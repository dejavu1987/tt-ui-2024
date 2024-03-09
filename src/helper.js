export const getPlayerName = (side, players) => {
  return (
    players[side].name +
    (players[side + 2] ? " & " + players[side + 2].name : "")
  );
};
