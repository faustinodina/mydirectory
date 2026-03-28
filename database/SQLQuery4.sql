USE [MyDirectory]
GO

/****** Object:  Table [dbo].[TreeView]    Script Date: 3/26/2026 2:54:46 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[TreeView](
	[ViewID] [uniqueidentifier] NOT NULL,
	[ViewName] [nvarchar](50) NOT NULL,
	[SelectedNodeId] [uniqueidentifier] NOT NULL,
	[Updated] [datetime2](7) NOT NULL,
 CONSTRAINT [PK_TreeView] PRIMARY KEY CLUSTERED 
(
	[ViewID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO


