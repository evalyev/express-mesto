module.exports.checkPermissionsCard = (card, thisUser) => {
  if (card.owner.equals(thisUser._id)) {
    return true;
  }
  return false;
};
