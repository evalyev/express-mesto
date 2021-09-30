module.exports.checkPermissionsCard = (card, thisUser) => {
  if (card.owner === thisUser._id) {
    return true;
  }
  return false;
};
