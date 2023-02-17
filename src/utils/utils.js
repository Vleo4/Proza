import { useMediaQuery } from '@material-ui/core';
export const TWO_COL_MIN_WIDTH = 496;
export const SHOW_MINI_SIDEBAR_BREAKPOINT = 792;
export const SHOW_FULL_SIDEBAR_BREAKPOINT = 1313;

export const useIsMobileView = () => !useMediaQuery(`(min-width: ${TWO_COL_MIN_WIDTH}px)`);

export const useShouldOpenSidebarDrawer = () =>
    !useMediaQuery(`(min-width:${SHOW_FULL_SIDEBAR_BREAKPOINT}px)`);

export const useMinWidthToShowFullSidebar = () =>
    useMediaQuery(`(min-width: ${SHOW_FULL_SIDEBAR_BREAKPOINT}px)`);

export const useShouldShowMiniSidebar = () =>
    useMediaQuery(`(min-width: ${SHOW_MINI_SIDEBAR_BREAKPOINT}px)`);
