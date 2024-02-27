import { getProjectsAPI, getTabsAPI } from "@/app";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface ProjectCard {
  image: string;
  title: string;
  description1: string;
  description2: string;
  cardSize: number;
}
interface ProjectTab {
  title: string;
}

type LandingState = {
  projectTabs: ProjectTab[] | null;
  projectData: ProjectCard[] | null;
};

const initialState: LandingState = {
  projectTabs: [{title:'all'}],
  projectData: null
}

export const getTabs = createAsyncThunk(
  "landing/tabs",
  async (
    params: null,
    thunkAPI
  ) => {
    try {
      console.log('first')
      const res = await getTabsAPI();
      console.log(res)
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getProjectData = createAsyncThunk(
  "landing/projects",
  async (
    params: {tab:string},
    thunkAPI
  ) => {
    try {
      const res = await getProjectsAPI();
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const landingSlice = createSlice({
  name: "landing",
  initialState,
  reducers: {
    setProjectTabs: (state, action: PayloadAction<ProjectTab[] | null>) => {
      state.projectTabs = action.payload;
    },
    setProjectData: (state, action: PayloadAction<ProjectCard[] | null>) => {
      state.projectData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTabs.fulfilled, (state, action) => {
        state.projectTabs = action.payload
    })
      .addCase(getProjectData.fulfilled, (state, action) => {
        state.projectData = action.payload
    })
  },
});

export const { setProjectTabs, setProjectData } =
  landingSlice.actions;

const landingReducer = landingSlice.reducer;
export default landingReducer;
