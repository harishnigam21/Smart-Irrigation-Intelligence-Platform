import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export interface Alert {
  _id: string;
  type: string;
  deviceId: {
    _id: string;
    nickName: string;
  };
  status: boolean;
  star: boolean;
  deleted: boolean;
  important: boolean;
  severity: "LOW" | "MEDIUM" | "HIGH";
  message: string;
  createdAt: Date;
}
export interface fullAlert extends Alert {
  farmId: {
    _id: string;
    nickName: string;
  };
}
interface stateProps {
  alerts: Alert[] | null;
  selectedAlert: fullAlert | null;
  nextCursor: string | null;
  prevCursor: string | null;
  totalPages: number;
  currentPage: number;
  switchLoading: { status: boolean; switch: string };
  selectedSidebarItem: "inbox" | "star" | "important" | "trash";
  selectedAlerts: { _id: string; type: string[] }[];
}
const initialState: stateProps = {
  alerts: null,
  selectedAlert: null,
  nextCursor: null,
  prevCursor: null,
  totalPages: 1,
  currentPage: 1,
  switchLoading: { status: false, switch: "" },
  selectedSidebarItem: "inbox",
  selectedAlerts: [],
};
const AlertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    addAlertWS: (state, action: PayloadAction<Alert>) => {
      if (state.currentPage !== 1) return;
      if (state.alerts) {
        state.alerts.unshift(action.payload);
        if (state.alerts.length > 25) {
          state.alerts = state.alerts.slice(0, 25);
          state.prevCursor = state.alerts[1]._id;
          state.nextCursor = state.alerts[24]._id;
        }
      } else {
        state.alerts = [action.payload];
      }
    },
    setAlert: (state, action: PayloadAction<Alert[]>) => {
      state.alerts = action.payload;
    },
    setNextCursor: (state, action: PayloadAction<string | null>) => {
      state.nextCursor = action.payload;
    },
    setPrevCursor: (state, action: PayloadAction<string | null>) => {
      state.prevCursor = action.payload;
    },
    setPages: (
      state,
      action: PayloadAction<{ total: number; current: number }>,
    ) => {
      const total = action.payload.total;
      const current = action.payload.current;
      if (total && current) {
        state.totalPages = total;
        state.currentPage = current;
      }
    },
    setAlertStatus: (
      state,
      action: PayloadAction<{ _id: string; status: boolean }>,
    ) => {
      if (action.payload) {
        if (state.alerts) {
          const findIndex = state.alerts.findIndex(
            (item) => item._id == action.payload._id,
          );
          if (findIndex !== -1) {
            state.alerts[findIndex].status = action.payload.status;
          }
        }
        if (
          state.selectedAlert &&
          state.selectedAlert._id === action.payload._id
        ) {
          state.selectedAlert.status = action.payload.status;
        }
      }
    },
    deleteAlert: (state, action: PayloadAction<string[]>) => {
      if (!action.payload) {
        return;
      }
      if (
        state.selectedAlert &&
        action.payload.includes(state.selectedAlert._id)
      ) {
        state.selectedAlert = null;
      }
      if (!state.alerts) {
        return;
      }
      state.alerts = state.alerts.filter(
        (item) => !action.payload.includes(item._id),
      );
    },
    markStar: (state, action: PayloadAction<string[]>) => {
      if (!action.payload || action.payload.length == 0) {
        return;
      }
      if (state.alerts && state.alerts.length > 0) {
        state.alerts.forEach((item) => {
          if (action.payload.includes(item._id)) {
            item.star = true;
          }
        });
      }
    },
    markUnStar: (state, action: PayloadAction<string[]>) => {
      if (!action.payload || action.payload.length == 0) {
        return;
      }
      if (state.alerts && state.alerts.length > 0) {
        state.alerts.forEach((item) => {
          if (action.payload.includes(item._id)) {
            item.star = false;
          }
        });
      }
    },
    markRead: (state, action: PayloadAction<string[]>) => {
      if (!action.payload || action.payload.length == 0) {
        return;
      }
      if (state.alerts && state.alerts.length > 0) {
        state.alerts.forEach((item) => {
          if (action.payload.includes(item._id)) {
            item.status = false;
          }
        });
      }
    },
    markUnRead: (state, action: PayloadAction<string[]>) => {
      if (!action.payload || action.payload.length == 0) {
        return;
      }
      if (state.alerts && state.alerts.length > 0) {
        state.alerts.forEach((item) => {
          if (action.payload.includes(item._id)) {
            item.status = true;
          }
        });
      }
    },
    markImportant: (state, action: PayloadAction<string[]>) => {
      if (!action.payload || action.payload.length == 0) {
        return;
      }
      if (state.alerts && state.alerts.length > 0) {
        state.alerts.forEach((item) => {
          if (action.payload.includes(item._id)) {
            item.important = true;
          }
        });
      }
    },
    markUnImportant: (state, action: PayloadAction<string[]>) => {
      if (!action.payload || action.payload.length == 0) {
        return;
      }
      if (state.alerts && state.alerts.length > 0) {
        state.alerts.forEach((item) => {
          if (action.payload.includes(item._id)) {
            item.important = false;
          }
        });
      }
    },
    setSwitchLoading: (
      state,
      action: PayloadAction<{ status: boolean; switch: string }>,
    ) => {
      if (action.payload) {
        state.switchLoading = action.payload;
      }
    },
    setSelectedSidebarItem: (
      state,
      action: PayloadAction<"inbox" | "star" | "important" | "trash">,
    ) => {
      if (action.payload) {
        state.selectedSidebarItem = action.payload;
      }
    },
    setSelectedAlerts: (
      state,
      action: PayloadAction<{ _id: string; type: string[] } | null>,
    ) => {
      if (action.payload) {
        state.selectedAlerts.push(action.payload);
      } else {
        state.selectedAlerts = [];
      }
    },
    removeSelectedAlert: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const current = state.selectedAlerts;
      if (id) {
        state.selectedAlerts = current.filter((inthere) => inthere._id !== id);
      }
    },
  },
});
export const {
  addAlertWS,
  setAlert,
  setNextCursor,
  setPrevCursor,
  setPages,
  setAlertStatus,
  deleteAlert,
  markStar,
  markUnStar,
  markRead,
  markUnRead,
  markImportant,
  markUnImportant,
  setSwitchLoading,
  setSelectedSidebarItem,
  setSelectedAlerts,
  removeSelectedAlert,
} = AlertSlice.actions;
export default AlertSlice.reducer;
