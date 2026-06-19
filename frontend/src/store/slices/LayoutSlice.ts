import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface screenSizeType {
  width: number;
  height: number;
}
interface stateProps {
  screenSize: screenSizeType;
  headerHeight: number | null;
}
const initialState: stateProps = {
  screenSize: {
    width: 0,
    height: 0,
  },
  headerHeight: null,
};
const LayoutSlice = createSlice({
  name: "mainLayout",
  initialState,
  reducers: {
    setScreenSize: (state, action: PayloadAction<screenSizeType>) => {
      state.screenSize = action.payload;
    },
    setHeaderHeight: (state, action: PayloadAction<number | null>) => {
      state.headerHeight = action.payload;
    },
  },
});
export default LayoutSlice.reducer;
export const { setScreenSize, setHeaderHeight } = LayoutSlice.actions;
