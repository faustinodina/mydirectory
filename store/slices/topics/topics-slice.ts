import type { RootState } from '@/store';
import { TopicsState, ITopicEditable, ITopicToAdd, ResetTopicsPayload } from "@/store/slices/topics/topics-types";
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { NO_NodeId, NodeId, TreeViewType } from '@/store/slices/tree-list/tree-list-types';
import { memoize } from "proxy-memoize";

const initialState: TopicsState = {
  topicsDict: {},
};

export const accountsSlice = createSlice({
  name: 'accounts',
  initialState,
  reducers: {

    setInitialState: (state, action: PayloadAction<TopicsState>) => {
      return action.payload;  
    },

    resetTopics: (state, action: PayloadAction<ResetTopicsPayload>) => {
      const resetTopicsPayload = action.payload;
      state.topicsDict = resetTopicsPayload.topicsState.topicsDict;
    },
  
    addTopic: (state, action: PayloadAction<{nodeId: NodeId, topicToAdd: ITopicToAdd}>) => {
      const {nodeId: nodeId, topicToAdd: topicToAdd } = action.payload;
      state.topicsDict[nodeId] = {id: nodeId, ...topicToAdd.topic};
    },

    updateTopic: (state, action: PayloadAction<ITopicEditable>) => {
      const modifiedTopicData = action.payload;
      const topicToModify = state.topicsDict[modifiedTopicData.topicId];
      if (!topicToModify) { return; }
      topicToModify.name = modifiedTopicData.name;
      topicToModify.alias = modifiedTopicData.alias;
      topicToModify.description = modifiedTopicData.description;
    },

    removeTopic: (state, action: PayloadAction<NodeId>) => {
      const nodeId = action.payload;
      delete state.topicsDict[nodeId];
    },

    // reset the state to state before loading from db
    clearState: (state, action: PayloadAction<void>) => {
      state.topicsDict = {};
    },
  },

  extraReducers: (builder) => {
  },
});

export const { resetTopics, setInitialState } = accountsSlice.actions;


export default accountsSlice.reducer;
