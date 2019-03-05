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
    public List<byte[]> bytes = new List<byte[]>();
    // Received data string.  
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

    //public async Task<Received> Receive()
    //{
    //    var result = await Client.ReceiveAsync();
    //    return new Received()
    //    {
    //        Message = Encoding.ASCII.GetString(result.Buffer, 0, result.Buffer.Length),
    //        Sender = result.RemoteEndPoint
    //    };
    //}
}

//Server
class UdpListener : UdpBase
{
    string serverIPAddress = "40.113.64.172";
    int port = 32129;
    
    private IPEndPoint listenOn;
    private IPEndPoint RemoteIpEndPoint;

    private int blocksReceived { get; set; }
    private int bytesReceived { get; set; }
    private int blocksSent { get; set; }
    private int bytesSent { get; set; }

    public UdpListener()
    {
        bytesReceived = 0;
        blocksReceived = 0;
        bytesSent = 0;
        blocksSent = 0;
        //IPAddress ipAddress = IPAddress.Parse(serverIPAddress);
        IPEndPoint endpoint = new IPEndPoint(IPAddress.Any, port);
        listenOn = endpoint;
        Client = new UdpClient(listenOn);
    }

    public UdpListener(IPEndPoint endpoint)
    {
        bytesReceived = 0;
        blocksReceived = 0;
        bytesSent = 0;
        blocksSent = 0;
        listenOn = endpoint;
        Client = new UdpClient(listenOn);
    }

    public void Send(byte[] datagram)
    {
        Client.Send(datagram, datagram.Length, RemoteIpEndPoint);
        blocksSent++;
        bytesSent += datagram.Length;
    }

    public void SendAck()
    {
        var datagram = new byte[1];
        datagram[0] = 1;
        Send(datagram);
    }

    public bool ReceiveAck()
    {
        var bytes = Receive();
        if (bytes.Length == 1 && bytes[0] == 1)
            return true;
        return false;
    }

    public byte[] Receive()
    {
        //Creates an IPEndPoint to record the IP Address and port number of the sender. 
        // The IPEndPoint will allow you to read datagrams sent from any source.
        RemoteIpEndPoint = new IPEndPoint(IPAddress.Any, 0);

        // Blocks until a message returns on this socket from a remote host.
        byte[] receiveBytes = Client.Receive(ref RemoteIpEndPoint);
        blocksReceived++;
        bytesReceived += receiveBytes.Length;
        return receiveBytes;
    }

    public void Receive3EOF(SendType type = SendType.StopAndWait, long blockSize = 1024)
    {
        byte[] response;
        string responseStr = "";
        while (true)
        {

            response = Receive();

            responseStr = Encoding.ASCII.GetString(response, 0, response.Length);

            if (type == SendType.StopAndWait)
            {
                SendAck();
            }

            if (responseStr.Contains("<EOF><EOF>"))
            {
                break;
            }
        }
    }

        public async Task<byte[]> ReceiveFile(string dirpath, SendType type = SendType.StopAndWait, long blockSize = 1024, byte[] bytesLeft = null)
    {
        int intBlockSize = (int)blockSize;
        long bytesSoFar = 0;
        Task writeTask = null;
        byte[] response;
        string responseStr;

        if (bytesLeft != null)
        {
            responseStr = Encoding.ASCII.GetString(bytesLeft, 0, bytesLeft.Length);
            if (!responseStr.Contains("<EOF>"))
            {
                response = Receive();
                responseStr = responseStr + Encoding.ASCII.GetString(response, 0, response.Length);
            }
        }
        else
        {
            response = Receive();
            responseStr = Encoding.ASCII.GetString(response, 0, response.Length);
        }
        string numberOfBytesStr;
        string[] words = responseStr.Split("<EOF>");
        var inputFilepath = words[0];

        Console.WriteLine(inputFilepath);

        if (words.Length <= 2)
        {
            response = Receive();
            if (words.Length == 2)
                responseStr = words[1] + Encoding.ASCII.GetString(response, 0, response.Length);
            else
                responseStr = Encoding.ASCII.GetString(response, 0, response.Length);

            words = responseStr.Split("<EOF>");
            numberOfBytesStr = words[0];
            if (words.Length >= 2)
            {
                bytesLeft = Encoding.ASCII.GetBytes(words[1]);
            }
        }
        else
        {
            numberOfBytesStr = words[1];
            bytesLeft = Encoding.ASCII.GetBytes(words[2]);
        }

        var numBytes = Int64.Parse(numberOfBytesStr);
        Console.WriteLine(numBytes);

        var filename = Path.GetFileName(inputFilepath);
        FileStream fs = new FileStream(Path.Join(dirpath, filename),
                               FileMode.Create,
                               FileAccess.Write);

        var bw = new BinaryWriter(fs);

        if (bytesLeft != null)
        {
            writeTask = fs.WriteAsync(bytesLeft, 0, bytesLeft.Length);
            bytesSoFar += bytesLeft.Length;
        }

        bytesLeft = null;
        while (bytesSoFar < numBytes)
        {
            response = Receive();

            if (writeTask != null)
            {
                await writeTask;
            }

            if (numBytes - bytesSoFar < response.Length)
            {
                var numBytesRecevied = (int)(numBytes - bytesSoFar);
                writeTask = fs.WriteAsync(response, 0, numBytesRecevied);
                bytesLeft = response.Skip(numBytesRecevied).Take(response.Length - numBytesRecevied).ToArray();
            }
            else
                writeTask = fs.WriteAsync(response, 0, response.Length);
            bytesSoFar += response.Length;
            Console.WriteLine(bytesSoFar);

            if (type == SendType.StopAndWait)
            {
                SendAck();
            }
        }

        if (writeTask != null)
        {
            writeTask.Wait();
        }
        bw.Close();
        fs.Close();
        return bytesLeft;
    }

    public void PrintInfo()
    {
        Console.WriteLine("Protocol type: UDP");
        Console.WriteLine("Number of blocks received: " + blocksReceived.ToString());
        Console.WriteLine("Number of bytes received: " + bytesReceived.ToString());
    }
}

//Client
class UdpUser : UdpBase
{
    private UdpUser() { }

    public static UdpUser ConnectTo(string hostname, int port)
    {
        var connection = new UdpUser();
        connection.Client.Connect(hostname, port);
        return connection;
    }

    public void Send(string message)
    {
        var datagram = Encoding.ASCII.GetBytes(message);
        Client.Send(datagram, datagram.Length);
    }
}


class FileTcpServer
{
    int Port = 32129;
    private TcpListener listener;
    private Socket socket;

    private int blocksReceived { get; set; }
    private int bytesReceived { get; set; }
    private int blocksSent { get; set; }
    private int bytesSent { get; set; }

    public FileTcpServer()
    {
        bytesReceived = 0;
        blocksReceived = 0;
        bytesSent = 0;
        blocksSent = 0;

        listener = new TcpListener(IPAddress.Any, Port);
        listener.Start();

        socket = listener.AcceptSocket();

    }

    public void Send(byte[] datagram)
    {
        socket.Send(datagram, datagram.Length, SocketFlags.Partial);

        blocksSent++;
        bytesSent += datagram.Length;
    }

    public void SendAck()
    {
        var datagram = new byte[1];
        datagram[0] = 1;
        Send(datagram);
    }

    public byte[] Receive(int bufferSize = 1024)
    {
        byte[] buffer = new byte[bufferSize];

        int blkBytesReceived = socket.Receive(buffer);

        blocksReceived++;
        bytesReceived += blkBytesReceived;
        
        return buffer.Take(blkBytesReceived).ToArray();
    }

    public bool ReceiveAck()
    {
        var bytes = Receive();
        if (bytes.Length == 1 && bytes[0] == 1)
            return true;
        return false;
    }

    public async Task<byte[]> ReceiveFile(string dirpath, SendType type = SendType.StopAndWait, long blockSize = 1024, byte[] bytesLeft = null, bool writeContent=false)
    {
        int intBlockSize = (int)blockSize;
        long bytesSoFar = 0;
        Task writeTask = null;
        byte[] response;
        string responseStr;

        if (bytesLeft != null)
        {
            responseStr = Encoding.ASCII.GetString(bytesLeft, 0, bytesLeft.Length);
            if (!responseStr.Contains("<EOF>"))
            {
                response = Receive();
                responseStr = responseStr + Encoding.ASCII.GetString(response, 0, response.Length);
            }
        }
        else
        {
            response = Receive();
            responseStr = Encoding.ASCII.GetString(response, 0, response.Length);
        }
        string numberOfBytesStr;
        string[] words = responseStr.Split("<EOF>");
        var inputFilepath = words[0];

        Console.WriteLine(inputFilepath);

        if (words.Length <= 2)
        {
            response = Receive(intBlockSize);
            if (words.Length == 2)
                responseStr = words[1] + Encoding.ASCII.GetString(response, 0, response.Length);
            else
                responseStr = Encoding.ASCII.GetString(response, 0, response.Length);
             
            words = responseStr.Split("<EOF>");
            numberOfBytesStr = words[0];
            if (words.Length >= 2)
            {
                bytesLeft = Encoding.ASCII.GetBytes(words[1]);
            }
        }
        else
        {
            numberOfBytesStr = words[1];
            bytesLeft = Encoding.ASCII.GetBytes(words[2]);
        }

        var numBytes = Int64.Parse(numberOfBytesStr);
        Console.WriteLine(numBytes);

        var filename = Path.GetFileName(inputFilepath);
        FileStream fs = null;
        BinaryWriter bw = null;
        if (writeContent)
        {
            fs = new FileStream(Path.Join(dirpath, filename),
                               FileMode.Create,
                               FileAccess.Write);

            bw = new BinaryWriter(fs);
        }
        
        if (bytesLeft != null)
        {
            if (writeContent)
                writeTask = fs.WriteAsync(bytesLeft, 0, bytesLeft.Length);
            bytesSoFar += bytesLeft.Length;
        }

        bytesLeft = null;
        while (bytesSoFar < numBytes)
        {
            response = Receive(intBlockSize);

            if (writeTask != null)
            {
                await writeTask;
            }

            if (numBytes - bytesSoFar < response.Length)
            {
                var numBytesRecevied = (int)(numBytes - bytesSoFar);
                if (writeContent)
                {
                    writeTask = fs.WriteAsync(response, 0, numBytesRecevied);
                }
                    bytesLeft = response.Skip(numBytesRecevied).Take(response.Length - numBytesRecevied).ToArray();
            }
            else if (writeContent)
                writeTask = fs.WriteAsync(response, 0, response.Length);
            bytesSoFar += response.Length;
            Console.WriteLine(bytesSoFar);

            if (type == SendType.StopAndWait)
            {
                SendAck();
            }
        }

        if (writeContent)
        {
            if (writeTask != null)
            {
                writeTask.Wait();
            }
            bw.Close();
            fs.Close();
        }
        return bytesLeft;
    }

        public void PrintInfo()
    {
        Console.WriteLine("Protocol type: TCP");
        Console.WriteLine("Number of blocks received: " + blocksReceived.ToString());
        Console.WriteLine("Number of bytes received: " + bytesReceived.ToString());
    }
}

class Homework1Server
{
    public static void SimpleTcpServer()
    {
        int Port = 500;

        TcpListener listener = new TcpListener(IPAddress.Any, Port);
        listener.Start();


        Socket socket = listener.AcceptSocket();

        int bufferSize = 1024;
        byte[] buffer = null;
        byte[] header = null;
        string headerStr = "";
        string filename = "";
        int filesize = 0;


        header = new byte[bufferSize];

        socket.Receive(header);

        headerStr = Encoding.ASCII.GetString(header);


        string[] splitted = headerStr.Split(new string[] { "\r\n" }, StringSplitOptions.None);
        Dictionary<string, string> headers = new Dictionary<string, string>();
        foreach (string s in splitted)
        {
            if (s.Contains(":"))
            {
                headers.Add(s.Substring(0, s.IndexOf(":")), s.Substring(s.IndexOf(":") + 1));
            }

        }
        //Get filesize from header
        filesize = Convert.ToInt32(headers["Content-length"]);
        //Get filename from header
        filename = headers["Filename"];

        int bufferCount = Convert.ToInt32(Math.Ceiling((double)filesize / (double)bufferSize));
        
        FileStream fs = new FileStream(filename, FileMode.OpenOrCreate);

        while (filesize > 0)
        {
            buffer = new byte[bufferSize];

            int size = socket.Receive(buffer, SocketFlags.Partial);

            fs.Write(buffer, 0, size);

            filesize -= size;
        }


        fs.Close();

    }

    static void ShowHelp(OptionSet p)
    {
        Console.WriteLine("Usage: ./Homework1Server [OPTIONS]");
        Console.WriteLine("Transfers images using various protocols and settings");
        Console.WriteLine();
        Console.WriteLine("Options:");
        p.WriteOptionDescriptions(Console.Out);
    }

    static void Main(string[] args)
    {
        bool show_help = false;
        string protocol = "tcp";
        int blockSize = 1024;
        SendType sendType = SendType.StopAndWait;
        string outDir = @"C:\Users\Andrei Iacob\Downloads\Test\PCD1";
        Console.WriteLine("Waiting for connection...");


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
    { "d|outDir=", "Path to where the files will be copied to",
       v  => outDir = v },
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

        if (show_help)
        {
            ShowHelp(p);
            return;
        }

        Console.WriteLine(protocol);
        Console.WriteLine(sendType);

        var watch = new System.Diagnostics.Stopwatch();

        watch.Start();
        
        if (protocol.ToLower() == "tcp")
        {
            var tcpServer = new FileTcpServer();

            var response = tcpServer.Receive();
            var responseStr = Encoding.ASCII.GetString(response, 0, response.Length);
            string[] words = responseStr.Split("<EOF>");
            var numFiles = int.Parse(words[0]);
            var bytesLeft = Encoding.ASCII.GetBytes(string.Join("<EOF>", words.Skip(1).ToArray()));

            for (int i = 0; i < numFiles; i++)
            {
                var task = tcpServer.ReceiveFile(outDir, sendType, blockSize, bytesLeft);
                task.Wait();
                bytesLeft = task.Result;
            }
            tcpServer.PrintInfo();
        }
        else
        {
            var udpServer = new UdpListener();

            udpServer.Receive3EOF(sendType, blockSize);

            //var response = udpServer.Receive();
            //var responseStr = Encoding.ASCII.GetString(response, 0, response.Length);
            //string[] words = responseStr.Split("<EOF>");
            //var numFiles = int.Parse(words[0]);
            //var bytesLeft = Encoding.ASCII.GetBytes(string.Join("<EOF>", words.Skip(1).ToArray()));

            //for (int i = 0; i < numFiles; i++)
            //{
            //    var task = udpServer.ReceiveFile(outDir, sendType, blockSize, bytesLeft);
            //    task.Wait();
            //    bytesLeft = task.Result;
            //}
            udpServer.PrintInfo();
        }
        watch.Stop();

        Console.WriteLine($"Execution Time: {watch.ElapsedMilliseconds} ms");

        Console.ReadKey();
    }
}

public class AsyncTcpServer
{
    // The response from the remote device.  
    private byte[] response = null;
    private long bytesRead = 0;
    private long messagesRead = 0;
    // Thread signal.  
    public static ManualResetEvent allDone = new ManualResetEvent(false);
    private ManualResetEvent connectDone = new ManualResetEvent(false);
    private ManualResetEvent sendDone = new ManualResetEvent(false);
    private ManualResetEvent receiveDone = new ManualResetEvent(false);
    private ManualResetEvent fileSent = new ManualResetEvent(false);
    private ManualResetEvent fileRecevied = new ManualResetEvent(false);
    bool acknowledged = false;
    // The port number for the remote device.  
    private const int port = 32123;
    private const string dirPath = @"C:\Users\Andrei Iacob\Pictures\Desktop\Space";
    private const string outDir = @"C:\Users\Andrei Iacob\Downloads\Test\PCD1";

    public AsyncTcpServer()
    {
    }

    public void StartListening()
    {
        // Establish the local endpoint for the socket.  
        var SERVER_IP = "127.0.0.1";
        IPAddress ipAddress = IPAddress.Parse(SERVER_IP);
        IPEndPoint localEndPoint = new IPEndPoint(ipAddress, port);

        // Create a TCP/IP socket.  
        Socket listener = new Socket(ipAddress.AddressFamily,
            SocketType.Stream, ProtocolType.Tcp);

        // Bind the socket to the local endpoint and listen for incoming connections.  
        try
        {
            listener.Bind(localEndPoint);
            listener.Listen(100);

            while (true)
            {
                // Set the event to nonsignaled state.  
                allDone.Reset();

                // Start an asynchronous socket to listen for connections.  
                Console.WriteLine("Waiting for a connection...");
                listener.BeginAccept(
                    new AsyncCallback(AcceptCallback),
                    listener);

                // Wait until a connection is made before continuing.  
                allDone.WaitOne();
            }

        }
        catch (Exception e)
        {
            Console.WriteLine(e.ToString());
        }

        Console.WriteLine("\nPress ENTER to continue...");
        Console.Read();

    }

    public void SimpleAcceptCallback(IAsyncResult ar)
    {
        // Signal the main thread to continue.  
        allDone.Set();

        // Get the socket that handles the client request.  
        Socket listener = (Socket)ar.AsyncState;
        Socket handler = listener.EndAccept(ar);

        // Create the state object.  
        StateObject state = new StateObject();
        state.workSocket = handler;
        handler.BeginReceive(state.buffer, 0, StateObject.BufferSize, 0,
            new AsyncCallback(ReceiveCallback), state);
        receiveDone.WaitOne();

        var content = Encoding.ASCII.GetString(response, 0, response.Length);
        Console.WriteLine("Read {0} bytes from socket. \n Data : {1}",
     content.Length, content);
        // Echo the data back to the client.  
        Send(handler, content);
    }

    public void AcceptCallback(IAsyncResult ar)
    {
        // Signal the main thread to continue.  
        allDone.Set();

        // Get the socket that handles the client request.  
        Socket listener = (Socket)ar.AsyncState;
        Socket handler = listener.EndAccept(ar);

        // Create the state object.  
        StateObject state = new StateObject();
        state.workSocket = handler;

        handler.BeginReceive(state.buffer, 0, StateObject.BufferSize, 0,
    new AsyncCallback(ReceiveCallback), state);

        receiveDone.Reset();
        Receive(handler, 0);
        receiveDone.WaitOne();
        var numberOfFilesStr = Encoding.ASCII.GetString(response, 0, response.Length);
        var numFiles = Int32.Parse(numberOfFilesStr);
        Console.WriteLine(numFiles);
        receiveDone.Reset();

        for (int i = 0; i < numFiles; i++)
        {
            fileRecevied.Reset();
            ReceiveFile(outDir, handler);
            fileRecevied.WaitOne();
        }

        handler.Shutdown(SocketShutdown.Both);
        handler.Close();
    }



    public void ReadCallback(IAsyncResult ar)
    {
        // Retrieve the state object and the handler socket  
        // from the asynchronous state object.  
        StateObject state = (StateObject)ar.AsyncState;
        Socket handler = state.workSocket;

        // Read data from the client socket.   
        int bytesRead = handler.EndReceive(ar);

        if (bytesRead > 0)
        {
            // There  might be more data, so store the data received so far.  
            var bytes = new byte[bytesRead];
            Array.Copy(state.buffer, 0, bytes, 0, bytesRead);
            state.bytes.Add(bytes);
            
            // Not all data received. Get more.  
            handler.BeginReceive(state.buffer, 0, StateObject.BufferSize, 0,
            new AsyncCallback(ReadCallback), state);
        } else
        {
            if (state.bytes.Count >= 1)
            {
                var list = new List<byte>();
                foreach (var byteBlock in state.bytes)
                {
                    list.AddRange(byteBlock);
                }
                response = list.ToArray();
            }
            receiveDone.Set();
        }
    }

    public void Send(Socket handler, String data)
    {
        // Convert the string data to byte data using ASCII encoding.  
        byte[] byteData = Encoding.ASCII.GetBytes(data);

        // Begin sending the data to the remote device.  
        handler.BeginSend(byteData, 0, byteData.Length, 0,
            new AsyncCallback(SendCallback), handler);
    }

    public void EndSendCallback(IAsyncResult ar)
    {
        try
        {
            // Retrieve the socket from the state object.  
            Socket handler = (Socket)ar.AsyncState;

            // Complete sending the data to the remote device.  
            int bytesSent = handler.EndSend(ar);
            Console.WriteLine("Sent {0} bytes to client.", bytesSent);

            handler.Shutdown(SocketShutdown.Both);
            handler.Close();

        }
        catch (Exception e)
        {
            Console.WriteLine(e.ToString());
        }
    }

    public void SendCallback(IAsyncResult ar)
    {
        try
        {
            // Retrieve the socket from the state object.  
            Socket handler = (Socket)ar.AsyncState;

            // Complete sending the data to the remote device.  
            int bytesSent = handler.EndSend(ar);
            sendDone.Set();

        }
        catch (Exception e)
        {
            Console.WriteLine(e.ToString());
        }
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

    public void ReceiveAck(Socket handler)
    {
        try
        {
            // Create the state object.  
            StateObject state = new StateObject();
            state.workSocket = handler;
            acknowledged = false;

            // Begin receiving the data from the remote device.  
            handler.BeginReceive(state.buffer, 0, StateObject.BufferSize, 0,
                new AsyncCallback(ReceiveAckCallback), state);
        }
        catch (Exception e)
        {
            Console.WriteLine(e.ToString());
        }
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

    public void Receive(Socket client, long numBytes=-1)
    {
        try
        {
            // Create the state object.  
            StateObject state = new StateObject();
            state.workSocket = client;
            
            if (numBytes < 0)
            {
                client.BeginReceive(state.buffer, 0, StateObject.BufferSize, 0,
                    new AsyncCallback(ReceiveNumberOfBytesCallback), state);
            }
            else
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

    public async void ReceiveFile(string dirpath, Socket handler, SendType type = SendType.StopAndWait, long blockSize = 1024)
    {
        int intBlockSize = (int)blockSize;

        long bytesSoFar = 0;
        Task writeTask = null;

        receiveDone.Reset();
        Receive(handler, 0);
        receiveDone.WaitOne();
        var inputFilepath = Encoding.ASCII.GetString(response, 0, response.Length);
        Console.WriteLine(inputFilepath);

        sendDone.Reset();
        SendAck(handler);
        sendDone.WaitOne();

        receiveDone.Reset();
        Receive(handler, 0);
        receiveDone.WaitOne();
        var numberOfBytesStr = Encoding.ASCII.GetString(response, 0, response.Length);
        var numBytes = Int64.Parse(numberOfBytesStr);
        Console.WriteLine(numBytes);

        var filename = Path.GetFileName(inputFilepath);
        FileStream fs = new FileStream(Path.Join(dirpath, filename),
                               FileMode.Create,
                               FileAccess.Write);

        sendDone.Reset();
        SendAck(handler);
        sendDone.WaitOne();

        var bw = new BinaryWriter(fs);

        while (bytesSoFar < numBytes)
        {
            receiveDone.Reset();
            Receive(handler, 0);
            receiveDone.WaitOne();

            if (writeTask != null)
            {
                await writeTask;
            }

            if(numBytes - bytesSoFar < response.Length)
                writeTask = fs.WriteAsync(response, 0, (int)(numBytes - bytesSoFar));
            else 
                writeTask = fs.WriteAsync(response, 0, response.Length);
            bytesSoFar += response.Length;
            Console.WriteLine(bytesSoFar);

            if (type == SendType.StopAndWait)
            {
                sendDone.Reset();
                SendAck(handler);
                sendDone.WaitOne();
            }
        }
        Console.WriteLine("Waiting");
        sendDone.Reset();
        SendByte(handler, 2);
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
        receiveDone.Reset();
        Receive(handler, 0);
        receiveDone.WaitOne();
        Console.WriteLine("Done File");

        br.Close();
        fs.Close();
        fileSent.Set();
    }


    public int TcpMain(String[] args)
    {
        StartListening();
        return 0;
    }
}