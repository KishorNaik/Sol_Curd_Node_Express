CREATE PROCEDURE uspSetUser
(
    @Command Varchar(50)=null,

    @UserIdentity UNIQUEIDENTIFIER,
    @FirstName VARCHAR(50),
    @LastName VARCHAR(50)
)
AS
    DECLARE @ErrorMessage Varchar(MAX)

    IF @Command='AddUser'
        BEGIN
            BEGIN TRY
                BEGIN TRANSACTION

                    INSERT INTO tblUsers
                    (
                        UserIdentity,
                        FirstName,
                        LastName
                    )
                    OUTPUT
                    (
                        inserted.UserIdentity
                    )
                    VALUES
                    (
                        NEWID(),
                        @FirstName,
                        @LastName
                    )

                COMMIT TRANSACTION

            END TRY

            BEGIN CATCH
                SET @ErrorMessage=ERROR_MESSAGE();
                RAISERROR(@ErrorMessage,16,1);
                ROLLBACK TRANSACTION;
            END CATCH
        END
     IF @Command='UpdateUser'
        BEGIN
            BEGIN TRY
                BEGIN TRANSACTION

                   UPDATE tblUsers
                    SET 
                        FirstName=@FirstName,
                        LastName=@LastName
                    WHERE
                        UserIdentity=@UserIdentity

                COMMIT TRANSACTION

            END TRY

            BEGIN CATCH
                SET @ErrorMessage=ERROR_MESSAGE();
                RAISERROR(@ErrorMessage,16,1);
                ROLLBACK TRANSACTION;
            END CATCH
        END
    IF @Command='DeleteUser'
        BEGIN
            BEGIN TRY
                BEGIN TRANSACTION

                   DELETE FROM tblUsers WHERE UserIdentity=@UserIdentity

                COMMIT TRANSACTION

            END TRY

            BEGIN CATCH
                SET @ErrorMessage=ERROR_MESSAGE();
                RAISERROR(@ErrorMessage,16,1);
                ROLLBACK TRANSACTION;
            END CATCH
        END
GO