CREATE DATABASE Users;
USE Users;

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblUsers](
	[UserId] [numeric](18, 0) IDENTITY(1,1) NOT NULL,
	[UserIdentity] [uniqueidentifier] NULL,
	[FirstName] [varchar](100) NULL,
	[LastName] [varchar](100) NULL,
PRIMARY KEY CLUSTERED 
(
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO