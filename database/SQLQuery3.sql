USE [MyDirectory]
GO

/****** Object:  Table [dbo].[TreeNode]    Script Date: 3/26/2026 2:54:34 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[TreeNode](
	[NodeId] [uniqueidentifier] NOT NULL,
	[ParentNodeId] [uniqueidentifier] NULL,
	[Level] [int] NULL,
	[SortOrder] [real] NULL,
	[Updated] [datetime2](7) NOT NULL,
 CONSTRAINT [PK_TreeNode] PRIMARY KEY CLUSTERED 
(
	[NodeId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[TreeNode]  WITH CHECK ADD  CONSTRAINT [FK_TreeNode_TreeNode] FOREIGN KEY([ParentNodeId])
REFERENCES [dbo].[TreeNode] ([NodeId])
GO

ALTER TABLE [dbo].[TreeNode] CHECK CONSTRAINT [FK_TreeNode_TreeNode]
GO


