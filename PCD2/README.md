# MultiplayerPacman

This is a modification of a javascript implementation of pacman made by luciopanepinto which aims to add multiplayer through websockets and Azure services. The original implementation can be found here: https://github.com/luciopanepinto/pacman

This project uses websockets to comunticate the state of the game between players. The state of the game is stored in an Azure Cosmos Database and the high scores and users are stored in an Azure SQL Database. Azure Functions are used to access the Azure Cosmos Database.
