using System;
using System.Net;
using System.Net.Sockets;
using System.Threading;
using System.Text;
using System.Threading.Tasks;
using System.Diagnostics;
using System.IO;
using System.Collections.Generic;
using System.Linq;
using NDesk.Options;

// State object for receiving data from remote device.  
public class StateObject
{
    // Client socket.  
    public Socket workSocket = null;
    // Size of receive buffer.  
    public const int BufferSize = 1024;
    // Number of bytes left to read.  
    public long bytesLeft = 0;
    // Receive buffer.  
    public byte[] buffer = new byte[BufferSize];
    // Received data.  
    public List<byte[]> bytes = new List<byte[]>();
    //public StringBuilder sb = new StringBuilder();
}

public struct Received
{
    public IPEndPoint Sender;
    public string Message;
}

public enum SendType { Stream, StopAndWait };

abstract class UdpBase
{
    protected UdpClient Client;

    protected UdpBase()
    {
        Client = new UdpClient();
    }

}

//Server
class UdpListener : UdpBase
{
    private IPEndPoint _listenOn;

    public UdpListener() : this(new IPEndPoint(IPAddress.Any, 32123))
    {
    }

    public UdpListener(IPEndPoint endpoint)
    {
        _listenOn = endpoint;
        Client = new UdpClient(_listenOn);
    }

    public void Reply(string message, IPEndPoint endpoint)
    {
        var datagram = Encoding.ASCII.GetBytes(message);
        Client.Send(datagram, datagram.Length, endpoint);
    }

}

//Client
class UdpUser : UdpBase
{
    string ServerIPAddress = "40.113.64.172";

    //string ServerIPAddress = "127.0.0.1";
    int Port = 32129;

    private int blocksReceived { get; set; }
    private int bytesReceived { get; set; }
    private int blocksSent { get; set; }
    private int bytesSent { get; set; }

    public UdpUser()
    {
        bytesReceived = 0;
        blocksReceived = 0;
        bytesSent = 0;
        blocksSent = 0;

        Client = new UdpClient();
        Client.Connect(ServerIPAddress, Port);
        Client.Client.SendTimeout = 5000;
        Client.Client.ReceiveTimeout = 5000;
    }

    public static UdpUser ConnectTo(string hostname, int port)
    {
        var connection = new UdpUser();
        connection.Client.Connect(hostname, port);
        return connection;
    }

    public void Send(byte[] datagram)
    {
        Client.Send(datagram, datagram.Length);
        blocksSent++;
        bytesSent += datagram.Length;
    }

    public bool ReceiveAck()
    {
        var bytes = Receive();

        if (bytes != null && bytes.Length == 1 && bytes[0] == 1)
            return true;
        return false;
    }

    public byte[] Receive()
    {
        var timeToWait = TimeSpan.FromSeconds(10);
        var asyncResult = Client.BeginReceive(null, null);
        asyncResult.AsyncWaitHandle.WaitOne(timeToWait);
        byte[] receiveBytes = null;
        if (asyncResult.IsCompleted)
        {
            try
            {
                IPEndPoint remoteEP = null;
                receiveBytes = Client.EndReceive(asyncResult, ref remoteEP);

                blocksReceived++;
                bytesReceived += receiveBytes.Length;

                return receiveBytes;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                // EndReceive failed and we ended up here
            }
        }


        //Creates an IPEndPoint to record the IP Address and port number of the sender. 
        // The IPEndPoint will allow you to read datagrams sent from any source.
        //IPEndPoint RemoteIpEndPoint = new IPEndPoint(IPAddress.Any, 0);

        //// Blocks until a message returns on this socket from a remote host.
        //byte[] receiveBytes = Client.Receive(ref RemoteIpEndPoint);

        //blocksReceived++;
        //bytesReceived += receiveBytes.Length;

        return receiveBytes;
    }

    public async Task SendFile(string filepath, SendType type = SendType.StopAndWait, long blockSize = 1024)
    {
        int intBlockSize = (int)blockSize;
        byte[] byteData = null;
        byte[] nextByteData = new byte[intBlockSize];
        FileStream fs = new FileStream(filepath,
                                       FileMode.Open,
                                       FileAccess.Read);
        BinaryReader br = new BinaryReader(fs);
        long numBytes = new FileInfo(filepath).Length;
        long bytesSoFar = 0;
        bool doResend = false;
        bool acknowledged;
        Task<int> readTask;
        readTask = fs.ReadAsync(nextByteData, 0, intBlockSize);

        byteData = Encoding.ASCII.GetBytes(filepath + "<EOF>" + numBytes.ToString() + "<EOF>");
        Send(byteData);

        if (type == SendType.StopAndWait)
        {

            acknowledged = ReceiveAck();

            if (!acknowledged)
                doResend = true;
        }

        int bytesRead = 1024;
        while (bytesSoFar < numBytes)
        {
            if (!doResend)
            {
                bytesRead = await readTask;
                bytesSoFar += bytesRead;
                byteData = nextByteData.Take(bytesRead).ToArray();
                Console.WriteLine(bytesSoFar);
                nextByteData = new byte[intBlockSize];
                if (numBytes - bytesSoFar <= blockSize)
                {
                    readTask = fs.ReadAsync(nextByteData, 0, (int)(numBytes - bytesSoFar));
                }
                else
                {
                    readTask = fs.ReadAsync(nextByteData, 0, intBlockSize);
                }
            }
            doResend = false;
            
            Send(byteData);
            
            if (type == SendType.StopAndWait)
            {

                acknowledged = ReceiveAck();

                if (!acknowledged)
                {
                    doResend = true;
                    Client = new UdpClient();
                    Client.Connect(ServerIPAddress, Port);
                }
            }
        }

        br.Close();
        fs.Close();
    }

    public void PrintInfo()
    {
        Console.WriteLine("Protocol type: UDP");
        Console.WriteLine("Number of blocks sent: " + blocksSent.ToString());
        Console.WriteLine("Number of bytes sent: " + bytesSent.ToString());
    }
}


class FileTcpClient
{
    string ServerIPAddress = "40.113.64.172";
    //string ServerIPAddress = "127.0.0.1";
    int Port = 32129;
    private TcpClient tcpClient;

    private int blocksReceived { get; set; }
    private int bytesReceived { get; set; }
    private int blocksSent { get; set; }
    private int bytesSent { get; set; }

    public FileTcpClient()
    {
        bytesReceived = 0;
        blocksReceived = 0;
        bytesSent = 0;
        blocksSent = 0;

        tcpClient = new TcpClient(ServerIPAddress, Port);
        tcpClient.SendTimeout = 600000;
        tcpClient.ReceiveTimeout = 600000;
    }

    public void Send(byte[] datagram)
    {
        tcpClient.Client.Send(datagram, datagram.Length, SocketFlags.Partial);

        blocksSent++;
        bytesSent += datagram.Length;
    }

    public byte[] Receive(int blockSize = 1024)
    {
        byte[] buffer = new byte[blockSize];

        int blkBytesReceived = tcpClient.Client.Receive(buffer);

        blocksReceived++;
        bytesReceived += bytesReceived;

        return buffer.Take(blkBytesReceived).ToArray();
    }
    
    public bool ReceiveAck()
    {
        var bytes = Receive();
        if (bytes.Length == 1 && bytes[0] == 1)
            return true;
        return false;
    }

    public async Task SendFile(string filepath, SendType type = SendType.StopAndWait, long blockSize = 1024)
    {
        int intBlockSize = (int)blockSize;
        byte[] byteData = null;
        byte[] nextByteData = new byte[intBlockSize];
        FileStream fs = new FileStream(filepath,
                                       FileMode.Open,
                                       FileAccess.Read);
        BinaryReader br = new BinaryReader(fs);
        long numBytes = new FileInfo(filepath).Length;
        long bytesSoFar = 0;
        bool doResend = false;
        bool acknowledged;
        Task<int> readTask;
        readTask = fs.ReadAsync(nextByteData, 0, intBlockSize);

        byteData = Encoding.ASCII.GetBytes(filepath + "<EOF>" + numBytes.ToString() + "<EOF>");
        Send(byteData);

        int bytesRead = 1024;
        while (bytesSoFar < numBytes)
        {
            if (!doResend)
            {
                bytesRead = await readTask;
                bytesSoFar += bytesRead;
                byteData = nextByteData.Take(bytesRead).ToArray();
                Console.WriteLine(bytesSoFar);
                nextByteData = new byte[intBlockSize];
                if (numBytes - bytesSoFar <= blockSize)
                {
                    readTask = fs.ReadAsync(nextByteData, 0, (int)(numBytes - bytesSoFar));
                }
                else
                {
                    readTask = fs.ReadAsync(nextByteData, 0, intBlockSize);
                }
            }
            doResend = false;

            Send(byteData);

            if (type == SendType.StopAndWait)
            {

                acknowledged = ReceiveAck();
                
                if (!acknowledged)
                    doResend = true;
            }
        }

        br.Close();
        fs.Close();
    }

    public void PrintInfo()
    {
        Console.WriteLine("Protocol type: TCP");
        Console.WriteLine("Number of blocks sent: " + blocksSent.ToString());
        Console.WriteLine("Number of bytes sent: " + bytesSent.ToString());
    }
}

class Homework1Client
{

    public static void SimpleTcpClient()
    {
        string IPAddress = "";
        int Port = 500;

        string Filename = @"C:\Users\Ben\Desktop\TT.zip";

        int bufferSize = 1024;
        byte[] buffer = null;
        byte[] header = null;
        
        FileStream fs = new FileStream(Filename, FileMode.Open);

        int bufferCount = Convert.ToInt32(Math.Ceiling((double)fs.Length / (double)bufferSize));

        TcpClient tcpClient = new TcpClient(IPAddress, Port);
        tcpClient.SendTimeout = 600000;
        tcpClient.ReceiveTimeout = 600000;

        string headerStr = "Content-length:" + fs.Length.ToString() + "\r\nFilename:" + @"C:\Users\Administrator\Desktop\" + "test.zip\r\n";
        header = new byte[bufferSize];
        Array.Copy(Encoding.ASCII.GetBytes(headerStr), header, Encoding.ASCII.GetBytes(headerStr).Length);

        tcpClient.Client.Send(header);

        for (int i = 0; i < bufferCount; i++)
        {
            buffer = new byte[bufferSize];
            int size = fs.Read(buffer, 0, bufferSize);

            tcpClient.Client.Send(buffer, size, SocketFlags.Partial);
        }

        tcpClient.Client.Close();

        fs.Close();

    }

    static void Main(string[] args)
    {
        bool show_help = false;
        string protocol = "tcp";
        int blockSize = 512;
        SendType sendType = SendType.Stream;
        //string outDir = @"C:\Users\Andrei Iacob\Downloads\Test\PCD1";
        string dirPath = @"C:\Users\Andrei Iacob\Pictures\Pictures";

        var p = new OptionSet() {
    { "p|protocol=", "TCP or UDP",
       v => protocol = v },
    { "s|sendType=",
       "Stream or StopAndWait",
        v => {
        if(v.ToLower() == "StopAndWait".ToLower() )
            sendType = SendType.StopAndWait;
        else
            sendType = SendType.Stream;
        }},
    { "b|blockSize=", "The size of a single block that is transfered",
       (int v)  => blockSize = v },
    { "d|dir=", "Path to where the files will be copied from",
       v  => dirPath = v },
    { "h|help",  "show this message and exit",
       v => show_help = v != null },
    };

        List<string> extra;
        try
        {
            extra = p.Parse(args);
        }
        catch (OptionException e)
        {
            Console.Write("greet: ");
            Console.WriteLine(e.Message);
            Console.WriteLine("Try `greet --help' for more information.");
            return;
        }
        //string outDir = @"C:\Users\Andrei Iacob\Downloads\Test\PCD1";
        
        DirectoryInfo d = new DirectoryInfo(dirPath);//Assuming Test is your Folder
        FileInfo[] Files = d.GetFiles("*.jpg"); //Getting Text files
        var numFilesBytes = Encoding.ASCII.GetBytes(Files.Length.ToString() + "<EOF>");

        var watch = new System.Diagnostics.Stopwatch();

        watch.Start();

        if (protocol.ToLower() == "tcp")
        {
            var tcpClient = new FileTcpClient();
            tcpClient.Send(numFilesBytes);

            foreach (FileInfo file in Files)
            {
                Console.WriteLine(file.Name);
                var task = tcpClient.SendFile(file.FullName, sendType, blockSize);
                task.Wait();
            }
            Console.WriteLine();
            tcpClient.PrintInfo();

            //AsyncTcpClient tcpClient = new AsyncTcpClient();
            //tcpClient.StartClient();
        } else
        {
            Console.WriteLine("UDP");
            var udpClient = new UdpUser();
            udpClient.Send(numFilesBytes);

            foreach (FileInfo file in Files)
            {
                Console.WriteLine(file.Name);
                var task = udpClient.SendFile(file.FullName, sendType, blockSize);
                task.Wait();
            }
            Console.WriteLine();
            udpClient.PrintInfo();

            for(int i=0; i<5; i++)
            {
                udpClient.Send(Encoding.ASCII.GetBytes("<EOF><EOF><EOF>"));
            }


            //create a new client
            //var client = UdpUser.ConnectTo("127.0.0.1", 32123);

            ////wait for reply messages from server and send them to console 
            //Task.Factory.StartNew(async () => {
            //    while (true)
            //    {
            //        try
            //        {
            //            var received = client.Receive();
            //        }
            //        catch (Exception ex)
            //        {
            //            Debug.Write(ex);
            //        }
            //    }
            //});
        }

        watch.Stop();

        Console.WriteLine($"Execution Time: {watch.ElapsedMilliseconds} ms");

        Console.ReadKey();

    }
}

public class AsyncTcpClient
{
    // The port number for the remote device.  
    private const int port = 32123;
    private const string outDir = @"C:\Users\Andrei Iacob\Downloads\Test\PCD1";
    private const string dirPath = @"C:\Users\Andrei Iacob\Pictures\Desktop\Space";

    // ManualResetEvent instances signal completion.  
    private ManualResetEvent connectDone = new ManualResetEvent(false);
    private ManualResetEvent sendDone = new ManualResetEvent(false);
    private ManualResetEvent receiveDone = new ManualResetEvent(false);
    private ManualResetEvent fileRecevied = new ManualResetEvent(false);
    private ManualResetEvent fileSent = new ManualResetEvent(false);
    private bool acknowledged = false;

    // The response from the remote device.  
    private byte[] response = null;
    private long bytesRead = 0;
    private long messagesRead = 0;


    public void StartClient()
    {
        // Connect to a remote device.  
        try
        {
            // Establish the remote endpoint for the socket.
            var SERVER_IP = "127.0.0.1";
            IPAddress ipAddress = IPAddress.Parse(SERVER_IP);
            IPEndPoint remoteEP = new IPEndPoint(ipAddress, port);

            // Create a TCP/IP socket.  
            Socket client = new Socket(ipAddress.AddressFamily,
                SocketType.Stream, ProtocolType.Tcp);

            // Connect to the remote endpoint.  
            client.BeginConnect(remoteEP,
                new AsyncCallback(ConnectCallback), client);
            connectDone.WaitOne();

            DirectoryInfo d = new DirectoryInfo(dirPath);//Assuming Test is your Folder
            FileInfo[] Files = d.GetFiles("*.jpg"); //Getting Text files

            Send(client, Files.Length.ToString());
            sendDone.WaitOne();
            sendDone.Reset();

            foreach (FileInfo file in Files)
            {
                fileSent.Reset();
                SendFile(file.FullName, client);
                Console.WriteLine(file.Name);
                fileSent.WaitOne();
            }


            //// Send test data to the remote device.  
            //Send(client, "This is a test<EOF>");
            //sendDone.WaitOne();

            //// Receive the response from the remote device.  
            //Receive(client, 0);
            //receiveDone.WaitOne();

            //var responseStr = Encoding.ASCII.GetString(response, 0, response.Length);
            //// Write the response to the console.  
            //Console.WriteLine("Response received : {0}", responseStr);

            // Release the socket.  
            client.Shutdown(SocketShutdown.Both);
            client.Close();

        }
        catch (Exception e)
        {
            Console.WriteLine(e.ToString());
        }
    }

    public void ConnectCallback(IAsyncResult ar)
    {
        try
        {
            // Retrieve the socket from the state object.  
            Socket client = (Socket)ar.AsyncState;

            // Complete the connection.  
            client.EndConnect(ar);

            Console.WriteLine("Socket connected to {0}",
                client.RemoteEndPoint.ToString());

            // Signal that the connection has been made.  
            connectDone.Set();
        }
        catch (Exception e)
        {
            Console.WriteLine(e.ToString());
        }
    }

    public void ReceiveAck(Socket client)
    {
        try
        {
            // Create the state object.  
            StateObject state = new StateObject();
            state.workSocket = client;
            acknowledged = false;

            // Begin receiving the data from the remote device.  
            client.BeginReceive(state.buffer, 0, StateObject.BufferSize, 0,
                new AsyncCallback(ReceiveAckCallback), state);
        }
        catch (Exception e)
        {
            Console.WriteLine(e.ToString());
        }
    }


    public async void ReceiveFile(string dirpath, Socket client, SendType type = SendType.StopAndWait, long blockSize = 1024)
    {
        int intBlockSize = (int)blockSize;
        
        long bytesSoFar = 0;
        Task writeTask = null;

        receiveDone.Reset();
        Receive(client, 0);
        receiveDone.WaitOne();
        var inputFilepath = Encoding.ASCII.GetString(response, 0, response.Length);
        Console.WriteLine(inputFilepath);

        sendDone.Reset();
        SendAck(client);
        sendDone.WaitOne();

        receiveDone.Reset();
        Receive(client, 0);
        receiveDone.WaitOne();
        var numberOfBytesStr = Encoding.ASCII.GetString(response, 0, response.Length);
        var numBytes = Int64.Parse(numberOfBytesStr);
        Console.WriteLine(numBytes);

        var filename = Path.GetFileName(inputFilepath);
        FileStream fs = new FileStream(Path.Join(dirpath, filename),
                               FileMode.Create,
                               FileAccess.Write);

        sendDone.Reset();
        SendAck(client);
        sendDone.WaitOne();

        var bw = new BinaryWriter(fs);

        while (bytesSoFar < numBytes)
        {
            receiveDone.Reset();
            Receive(client, 0);
            receiveDone.WaitOne();

            if (writeTask != null)
            {
                await writeTask;
            }
            writeTask = fs.WriteAsync(response, 0, response.Length);
            bytesSoFar += response.Length;
            Console.WriteLine(bytesSoFar);

            if (type == SendType.StopAndWait)
            {
                sendDone.Reset();
                SendAck(client);
                sendDone.WaitOne();
            }
        }
        sendDone.Reset();
        SendByte(client, 2);
        sendDone.WaitOne();
        Console.WriteLine("Done File");

        if (writeTask != null)
        {
            await writeTask;
        }
        bw.Close();
        fs.Close();
        fileRecevied.Set();
    }

    public void ReceiveAckCallback(IAsyncResult ar)
    {
        try
        {
            // Retrieve the state object and the client socket   
            // from the asynchronous state object.  
            StateObject state = (StateObject)ar.AsyncState;
            Socket handler = state.workSocket;

            // Read data from the remote device.  
            int bytesRead = handler.EndReceive(ar);

            if (bytesRead == 1)
            {
                if (state.buffer[0] == 1)
                    acknowledged = true;
            }
            receiveDone.Set();

            //else if (bytesRead > 0)
            //{
            //    var bytes = new byte[state.buffer.Length];
            //    Array.Copy(state.buffer, 0, bytes, 0, state.buffer.Length);
            //    state.bytes.Add(bytes);
            //    // There might be more data, so store the data received so far.  
            //    //state.sb.Append(Encoding.ASCII.GetString(state.buffer, 0, bytesRead));

            //    // Get the rest of the data.  
            //    handler.BeginReceive(state.buffer, 0, StateObject.BufferSize, 0,
            //        new AsyncCallback(ReceiveCallback), state);
            //}
            //else
            //{
            //    // All the data has arrived; put it in response.  
            //    if (state.bytes.Count >= 1)
            //    {
            //        var list = new List<byte>();
            //        foreach (var byteBlock in state.bytes)
            //        {
            //            list.AddRange(byteBlock);
            //        }
            //        response = list.ToArray();
            //    }
            //    // Signal that all bytes have been received.  
            //    receiveDone.Set();
            //}
        }
        catch (Exception e)
        {
            Console.WriteLine(e.ToString());
        }
    }

    public void Receive(Socket client, long numBytes = -1)
    {
        try
        {
            // Create the state object.  
            StateObject state = new StateObject();
            state.workSocket = client;

            if(numBytes < 0)
            {
                client.BeginReceive(state.buffer, 0, StateObject.BufferSize, 0,
                    new AsyncCallback(ReceiveNumberOfBytesCallback), state);
            } else
            {
                state.bytesLeft = numBytes;
            }

            // Begin receiving the data from the remote device.  
            client.BeginReceive(state.buffer, 0, StateObject.BufferSize, 0,
                new AsyncCallback(ReceiveCallback), state);
        }
        catch (Exception e)
        {
            Console.WriteLine(e.ToString());
        }
    }

    public void ReceiveNumberOfBytesCallback(IAsyncResult ar)
    {
        try
        {
            // Retrieve the state object and the client socket   
            // from the asynchronous state object.  
            StateObject state = (StateObject)ar.AsyncState;
            Socket client = state.workSocket;

            // Read data from the remote device.  
            int bytesRead = client.EndReceive(ar);
            var numStr = Encoding.ASCII.GetString(state.buffer, 0, bytesRead);
            state.bytesLeft = Int64.Parse(numStr);
            receiveDone.Set();
        }
        catch (Exception e)
        {
            Console.WriteLine(e.ToString());
        }
    }

    public void ReceiveCallback(IAsyncResult ar)
    {
        try
        {
            // Retrieve the state object and the client socket   
            // from the asynchronous state object.  
            StateObject state = (StateObject)ar.AsyncState;
            Socket client = state.workSocket;

            // Read data from the remote device.  
            int bytesRead = client.EndReceive(ar);

            if (bytesRead > 0)
            {
                var bytes = new byte[bytesRead];
                Array.Copy(state.buffer, 0, bytes, 0, bytesRead);
                state.bytes.Add(bytes);
                // There might be more data, so store the data received so far.  
                //state.sb.Append(Encoding.ASCII.GetString(state.buffer, 0, bytesRead));

                state.bytesLeft -= bytesRead;
                if (state.bytesLeft > 0)
                {
                    state.bytesLeft -= bytesRead;

                    // Get the rest of the data.  
                    client.BeginReceive(state.buffer, 0, StateObject.BufferSize, 0,
                        new AsyncCallback(ReceiveCallback), state);
                }
                else
                {
                    // All the data has arrived; put it in response.  
                    if (state.bytes.Count >= 1)
                    {
                        var list = new List<byte>();
                        foreach (var byteBlock in state.bytes)
                        {
                            list.AddRange(byteBlock);
                        }
                        response = list.ToArray();
                    }
                    // Signal that all bytes have been received.  
                    receiveDone.Set();
                }
            }
            else
            {
                // All the data has arrived; put it in response.  
                if (state.bytes.Count >= 1)
                {
                    var list = new List<byte>();
                    foreach (var byteBlock in state.bytes)
                    {
                        list.AddRange(byteBlock);
                    }
                    response = list.ToArray();
                }
                // Signal that all bytes have been received.  
                receiveDone.Set();
            }
        }
        catch (Exception e)
        {
            Console.WriteLine(e.ToString());
        }
    }

    public async void SendFile(string filepath, Socket handler, SendType type = SendType.StopAndWait, long blockSize = 1024)
    {
        int intBlockSize = (int)blockSize;
        byte[] byteData = null;
        byte[] nextByteData = new byte[intBlockSize];
        FileStream fs = new FileStream(filepath,
                                       FileMode.Open,
                                       FileAccess.Read);
        BinaryReader br = new BinaryReader(fs);
        long numBytes = new FileInfo(filepath).Length;
        long bytesSoFar = 0;
        bool doResend = false;
        Task<int> readTask;
        readTask = fs.ReadAsync(nextByteData, 0, intBlockSize);

        byteData = Encoding.ASCII.GetBytes(filepath);
        sendDone.Reset();
        handler.BeginSend(byteData, 0, byteData.Length, 0,
            new AsyncCallback(SendCallback), handler);
        sendDone.WaitOne();

        receiveDone.Reset();
        ReceiveAck(handler);
        receiveDone.WaitOne();

        byteData = Encoding.ASCII.GetBytes(numBytes.ToString());
        sendDone.Reset();
        handler.BeginSend(byteData, 0, byteData.Length, 0,
            new AsyncCallback(SendCallback), handler);
        sendDone.WaitOne();

        receiveDone.Reset();
        ReceiveAck(handler);
        receiveDone.WaitOne();

        int bytesRead = 1024;
        while (bytesSoFar < numBytes)
        {
            if (!doResend)
            {
                bytesRead = await readTask;
                bytesSoFar += bytesRead;
                byteData = nextByteData;
                Console.WriteLine(bytesSoFar);
                nextByteData = new byte[intBlockSize];
                if (numBytes - bytesSoFar <= blockSize)
                {
                    readTask = fs.ReadAsync(nextByteData, 0, (int)(numBytes - bytesSoFar));
                }
                else
                {
                    readTask = fs.ReadAsync(nextByteData, 0, intBlockSize);
                }
            }
            doResend = false;

            sendDone.Reset();
            // Begin sending the data to the remote device.  
            handler.BeginSend(byteData, 0, bytesRead, 0,
                new AsyncCallback(SendCallback), handler);
            sendDone.WaitOne();
            
            if (type == SendType.StopAndWait)
            {

                // Receive the response from the remote device.  
                acknowledged = false;
                receiveDone.Reset();
                ReceiveAck(handler);
                receiveDone.WaitOne();

                if (!acknowledged)
                    doResend = true;
            }
        }

        Console.WriteLine("Waiting");
        receiveDone.Reset();
        Receive(handler, 0);
        receiveDone.WaitOne();
        Console.WriteLine("Done File");

        br.Close();
        fs.Close();
        fileSent.Set();
    }

    public void Send(Socket client, String data)
    {
        // Convert the string data to byte data using ASCII encoding.  
        byte[] byteData = Encoding.ASCII.GetBytes(data);

        // Begin sending the data to the remote device.  
        client.BeginSend(byteData, 0, byteData.Length, 0,
            new AsyncCallback(SendCallback), client);
    }

    public void SendByte(Socket client, byte val)
    {
        // Convert the string data to byte data using ASCII encoding.  
        byte[] byteData = new byte[1];
        byteData[0] = val;

        // Begin sending the data to the remote device.  
        client.BeginSend(byteData, 0, byteData.Length, 0,
            new AsyncCallback(SendCallback), client);
    }

    public void SendAck(Socket client)
    {
        SendByte(client, 1);
    }

    public void SendCallback(IAsyncResult ar)
    {
        try
        {
            // Retrieve the socket from the state object.  
            Socket client = (Socket)ar.AsyncState;

            // Complete sending the data to the remote device.  
            int bytesSent = client.EndSend(ar);
            //Console.WriteLine("Sent {0} bytes to server.", bytesSent);

            // Signal that all bytes have been sent.  
            sendDone.Set();
        }
        catch (Exception e)
        {
            Console.WriteLine(e.ToString());
        }
    }

    public int TcpMain(String[] args)
    {
        StartClient();
        return 0;
    }
}