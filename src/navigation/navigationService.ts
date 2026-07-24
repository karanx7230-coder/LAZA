import { createNavigationContainerRef } from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef<any>();

let pendingNavigation: { name: string; params?: any } | null = null;

export function navigate(name: string, params?: any) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  } else {
    // save it for later — container isn't mounted yet
    pendingNavigation = { name, params };
  }
}

export function flushPendingNavigation() {
  if (pendingNavigation && navigationRef.isReady()) {
    navigationRef.navigate(pendingNavigation.name, pendingNavigation.params);
    pendingNavigation = null;
  }
}