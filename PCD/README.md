# Homework 1

The purpose of this homework is to monitor the bytes transfered through both UDP and TCP protocols locally and remotely.

## How to run Homework 1

To compile the server project for use in ubuntu 18.04 the following command must be run:
dotnet publish -c release -r ubuntu.18.04-x64 Homework1Server.csproj

Then copy Homework1Server\bin\release\netcoreapp2.1\ubuntu.18.04-x64\publish folder on the linux machine and run following command:

./Homework1Server [Options]

Options:
  -p, --protocol=VALUE       TCP or UDP
  -s, --sendType=VALUE       Stream or StopAndWait
  -b, --blockSize            The size of a single block that is transfered
  -d, --outDir               Path to where the files will be copied to
  -h, --help                 show this message and exit

For the client a similar procedure must be used, only “Homework1Server” must be replaced with “Homework1Client”

