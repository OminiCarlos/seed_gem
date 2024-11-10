# Seed Germ - A gardening management tool
Seed Germ is a comprehensive system for managing and tracking plants within a garden, focusing on the plant growth data analytics. The system accommodates various plant types and stages, tracks scheduled and ad-hoc events, and provides traceability from seed purchase through to harvest and distribution. Its functionality includes maintaining records of plant event such as watering, weeding, etc., observations such as bud breaking, fruiting, etc. and generating timelines and analytics for efficient garden management.\
Deploy instructions:
Starting the Sample Project:

Navigate to the remote directory of the sample project.
Run the project's start script:
This script is essential for starting the project on the remote server, as it includes important configurations for the node runtime environment.
```
sh ./remote-start.sh
```

After running the script, you should see a message in the terminal similar to: Server running at `http://localhost:<node starting port number>/`. Note down the `<node starting port number>`.

If you see an error like Syntax error: "elif" unexpected (expecting "then") and you are on a Windows machine, it may be the case that the line endings are causing an issue. Run sed -i 's/\r$//' remote-start.sh and sed -i 's/\r$//' .env to fix the issue.
Building an SSH Tunnel to the Remote Node Application:

Sometimes, IDEs like Visual Studio Code can automatically handle port forwarding for you when you start the application remotely within their built-in SSH connection session. In such cases, you don't need to perform this step manually and you can directly access your application on that port.

With VS Code, you can simply click on the the "port" tab to see the webpage on the local browser.

Alternatively, UBC teaching team has provided a script to facilitate the SSH tunnel creation to the remote node application:

Open a new terminal in your local project folder.
Depending on your operating system:

`Mac users:
sh ./scripts/mac/server-tunnel.sh`

`Windows users:
.\scripts\win\server-tunnel.cmd`


Follow the instructions in the terminal. You'll need to enter the node starting port number you noted earlier. The subsequent steps resemble the process of starting an SSH connection to the ugrad server.

Accessing the Sample Project:

After you've input your node's starting port number in the previous step, you should see a message similar to:

-------------------------------------------------------------------------- 
        You will be able to access your application at: 
        http://localhost:<Local Accessing Port Number> 
        after completing the steps below... 
--------------------------------------------------------------------------
At this point, you can access the sample project via the provided URL.
`http://localhost:<node starting port number>/`

David made some changes to test merging
David added changes A to main