export type NodeId = number;

export const NO_NodeId: NodeId = 0;

export interface ITreeNode {
  id: NodeId;
  children: NodeId[];
  parent: NodeId;        // use NO_AccountId if root;
  level: number;          // 0: root account (but root account will never be displayed so will never be in the list or dict), 1: direct children of root account,...
  sortOrder: number;
}

export type TreeDataSource  = { [key: NodeId]: ITreeNode };
export type TreeDict = TreeDataSource;

export interface INodeVisibility {
  id: NodeId;
  //level: number;        // 0: root account (but root account will never be displayed so will never be in the list or dict), 1: direct children of root account,...
  isExpanded: boolean;  // account without children is considered not expanded (false)
  nodeVisibilityId?: string;  // used only for syncing with the db
}

export type VisibleNodesDict = { [key: NodeId]: INodeVisibility };

export interface ITreeListState {
  nodesDict: TreeDict;            // tree of "pure" nodes
  pathCache: INodePathCacheDict;  // cache of paths from root to each node, used for quick access to the path without recalculating it every time

  // for visibleAccounts note the root account is not displayed so if you have only the root account (initial state) then visibleAccounts dict and list will be empty 
  // these are related to Accounts.tsx views. should be one per accounts tree view; we are using these for the main view
  // visibleNodesDict: VisibleNodesDict; 
  // visibleNodesList: NodeKey[];   // contains the flat list of visible accounts, sorted in the order of appareance
  // selectedNodeKey: NodeKey;       // selected account: will be highlighted, its transactions will be shown on the right panel

  viewsDict: ViewsDict;
};

export interface INodePathCacheDict {
  [nodeId: NodeId]: NodeId[];  // path from root to this node, including the node itself, NOT including the root node
}

export interface INodeToggledEvent {
  nodeId: string;
}

export interface IToggleButtonProps {
  nodeId: NodeId;
  //viewKey: ViewKey;
  treeViewType: TreeViewType;
  // isExpanded: boolean;
  // isExpansible: boolean;
  //onPress: (e: INodeToggledEvent) => void;
  onPress: () => void;
}

export interface IDataViewProps {
  nodeId: NodeId;
  //viewKey: ViewKey;
  treeViewType: TreeViewType;
  // nodeData: ITreeNode;
  // isExpanded: boolean;
  // isExpansible: boolean;
}

export interface ITreeNodePosition {
  parentId: NodeId;
  siblingId?: NodeId;
  // level: number;          // 0: root account (but root account will never be displayed so will never be in the list or dict), 1: direct children of root account,...
  // sortOrder: number;
}

//--- Views ---------
export type TreeViewId = number;
//export type ViewKey = string;
export type TreeViewType = string;
export type NodeVisibilityId = string;

//export const NO_ViewKey: ViewKey = "";
export const NO_TreeViewId: TreeViewId = 0;
export const NO_NodeVisibilityId: NodeVisibilityId = "";

export type TreeListView = {
  treeViewId: TreeViewId;
  viewType: string;
  visibleNodesDict: VisibleNodesDict; 
  visibleNodesList: NodeId[];   // contains the flat list of visible accounts, sorted in the order of appareance
  selectedNodeId: NodeId;       // selected account: will be highlighted, its transactions will be shown on the right panel
  // isDirty: boolean;
  // hasOrderChanged: boolean;
};

export type ViewsDict = { [key: TreeViewType]: TreeListView };

//--- Event arguments ----------------------------------------------
export type EvArgsOnSelectionChange = {
  //viewKey: ViewKey, 
  nodeId: NodeId, 
  isSelected: boolean
};
