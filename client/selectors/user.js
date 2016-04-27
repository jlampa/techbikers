import { isEmpty } from "lodash";
import { createSelector } from "reselect";

import { getCurrentRide, getRegistrationsForCurrentRide } from "./ride";

const userSelector = state => state.entities.user || {};
const rideSelector = state => state.entities.ride || {};
const authenticatedUserId = state => {
  const { state: authState, claims } = state.authentication;
  return authState === "authenticated" ? claims.userId : null;
}
const pageEntityIdSelector = state => state.page.entity.id || null;

export const getAuthenticatedUserId = createSelector(
  authenticatedUserId,
  id => id
)

export const getAuthenticatedUser = createSelector(
  [userSelector, authenticatedUserId],
  (users, userId) => users[userId]
)

export const getCurrentUser = createSelector(
  [userSelector, pageEntityIdSelector],
  (users, id) => users[id]
)

export const getUsersOnCurrentRide = createSelector(
  [userSelector, getCurrentRide],
  (users, ride) => ride ? ride.riders.map(id => users[id]) : []
)

export const getRidesForCurrentUser = createSelector(
  [rideSelector, getCurrentUser],
  (rides, user) => user && !isEmpty(rides) ? user.rides.map(id => rides[id]) : []
)

export const getRegistrationForCurrentRideAndUser = createSelector(
  [getRegistrationsForCurrentRide, authenticatedUserId],
  (registrations, userId) => registrations.find(registration => registration.user === userId)
)