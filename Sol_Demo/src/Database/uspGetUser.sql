CREATE PROCEDURE uspGetUser
(
    @Command Varchar(50)=null,

    @UserIdentity UNIQUEIDENTIFIER
)
AS
    DECLARE @ErrorMessage Varchar(MAX)

    IF @Command='GetAllUsers'
        BEGIN
            BEGIN TRY
                BEGIN TRANSACTION

                    SELECT 
                        U.UserIdentity,
                        U.FirstName,
                        U.LastName
                    FROM 
                        tblUsers As U WITH(NOLOCK)

                COMMIT TRANSACTION

            END TRY

            BEGIN CATCH
                SET @ErrorMessage=ERROR_MESSAGE();
                RAISERROR(@ErrorMessage,16,1);
                ROLLBACK TRANSACTION;
            END CATCH
        END
  
GO