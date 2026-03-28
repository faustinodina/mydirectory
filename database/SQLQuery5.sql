USE [MyDirectory]
GO

/****** Object:  Table [dbo].[VisibleTreeNode]    Script Date: 3/26/2026 2:54:55 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[VisibleTreeNode](
	[VisibleTreeNodeId] [uniqueidentifier] NOT NULL,
	[ViewId] [uniqueidentifier] NOT NULL,
	[NodeId] [uniqueidentifier] NOT NULL,
 CONSTRAINT [PK_VisibleTreeNode] PRIMARY KEY CLUSTERED 
(
	[VisibleTreeNodeId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[VisibleTreeNode]  WITH CHECK ADD  CONSTRAINT [FK_VisibleTreeNode_TreeNode] FOREIGN KEY([NodeId])
REFERENCES [dbo].[TreeNode] ([NodeId])
GO

ALTER TABLE [dbo].[VisibleTreeNode] CHECK CONSTRAINT [FK_VisibleTreeNode_TreeNode]
GO

ALTER TABLE [dbo].[VisibleTreeNode]  WITH CHECK ADD  CONSTRAINT [FK_VisibleTreeNode_TreeView] FOREIGN KEY([ViewId])
REFERENCES [dbo].[TreeView] ([ViewID])
GO

ALTER TABLE [dbo].[VisibleTreeNode] CHECK CONSTRAINT [FK_VisibleTreeNode_TreeView]
GO


