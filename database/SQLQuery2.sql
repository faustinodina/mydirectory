USE [MyDirectory]
GO

/****** Object:  Table [dbo].[Note]    Script Date: 3/26/2026 2:54:25 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Note](
	[NoteId] [uniqueidentifier] NOT NULL,
	[NodeId] [uniqueidentifier] NOT NULL,
	[Title] [nvarchar](max) NULL,
	[Description] [nvarchar](max) NULL,
	[Text] [nvarchar](max) NULL,
	[Updated] [datetime2](7) NOT NULL,
 CONSTRAINT [PK_Note] PRIMARY KEY CLUSTERED 
(
	[NoteId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

ALTER TABLE [dbo].[Note]  WITH CHECK ADD  CONSTRAINT [FK_Note_TreeNode] FOREIGN KEY([NodeId])
REFERENCES [dbo].[TreeNode] ([NodeId])
GO

ALTER TABLE [dbo].[Note] CHECK CONSTRAINT [FK_Note_TreeNode]
GO


