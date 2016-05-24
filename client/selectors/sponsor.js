import { createSelector } from "reselect";

import { getCurrentRide } from "./ride";

const sponsorSelector = (state) => state.entities.sponsor || {};
const rideSponsorSelector = (state) => state.entities.rideSponsor || {};

export const getAllSponsors = createSelector(
  [sponsorSelector],
  (sponsors) => Object.keys(sponsors).map(id => sponsors[id])
)

export const getRideSponsors = createSelector(
  [rideSponsorSelector],
  (rideSponsors) => Object.keys(rideSponsors).map(id => rideSponsors[id])
)

const getSponsorsByCurrentRideAndLevel = level => {
  return createSelector(
    [sponsorSelector, getRideSponsors, getCurrentRide],
    (sponsors, rideSponsors, ride) => rideSponsors.filter(rideSponsor => {
      return ride && (rideSponsor.ride === ride.id) && (rideSponsor.sponsor_level === level);
    }).map(rideSponsor => sponsors[rideSponsor.sponsor])
  )
}

export const getSponsorsByCurrentRide = createSelector(
  [
    getSponsorsByCurrentRideAndLevel("gold"),
    getSponsorsByCurrentRideAndLevel("silver"),
    getSponsorsByCurrentRideAndLevel("bronze"),
    getSponsorsByCurrentRideAndLevel("bottle"),
    getSponsorsByCurrentRideAndLevel("kit"),
    getSponsorsByCurrentRideAndLevel("inkind"),
    getSponsorsByCurrentRideAndLevel("homecoming")
  ],
  (gold, silver, bronze, bottle, kit, inkind, homecoming) => {
    return { gold, silver, bronze, bottle, kit, inkind, homecoming };
  }
)