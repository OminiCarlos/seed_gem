# Seed Germ - A gardening management tool
## !!!! For Project TA: Please find the MileStone 4 report in this path:
MileStone_documents/milestone4_report.pdf

## Introduction
Seed Germ is a comprehensive system for managing and tracking plants within a garden, focusing on the plant growth data analytics. The system accommodates various plant types and stages, tracks scheduled and ad-hoc events, and provides traceability from seed purchase through to harvest and distribution. Its functionality includes maintaining records of plant event such as watering, weeding, etc., observations such as bud breaking, fruiting, etc. and generating timelines and analytics for efficient garden management.\
Deploy instructions:
Starting the Sample Project:

## How to run this website?

This instruction is assuming you are on a unix server. If not, please ask a 304 TA for help to deploy the code on the department server. 

1. Go to the project folder, make sure you are in folder "project_b9d8f_i8r6v_k1l2s".
2. Run sqlplus. When logged in, run this script: `start seed_gem.sql`.
3. Run the project's start script:
        ```
        sh ./remote-start.sh
        ```
        After running the script, you should see a message in the terminal similar to: Server running at `http://localhost:<node starting port number>/`. Note down the `<node starting port number>`. </br>
        
    **Note:** If you see an error like Syntax error: "elif" unexpected (expecting "then") and you are on a Windows machine, it may be the case that the line endings are causing an issue. Run sed -i 's/\r$//' remote-start.sh and sed -i 's/\r$//' .env to fix the issue.
   
4. CPSC304 Teaching team has provided a script to facilitate the SSH tunnel creation to the remote node application:
Open a new terminal in your local project folder on your local machine, not the server.
Depending on your operating system:
Mac users:
```
sh ./scripts/mac/server-tunnel.sh
```
Windows users:
```
.\scripts\win\server-tunnel.cmd
```

Follow the instructions in the terminal. You'll need to enter the node starting port number you noted earlier. The subsequent steps resemble the process of starting an SSH connection to the ugrad server.

5. Accessing the Sample Project:

After you've input your node's starting port number in the previous step, you should see a message similar to:

-------------------------------------------------------------------------- 
        You will be able to access your application at: 
        http://localhost:<Local Accessing Port Number> 
        after completing the steps below... 
--------------------------------------------------------------------------
At this point, you can access the sample project via the provided URL.

**Note:** Alternatively, you can forward the port to your local machine and open it in the local browser. 
