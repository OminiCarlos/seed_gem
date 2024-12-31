# Seed Gem - A gardening management tool

## Introduction
Seed Gem is a comprehensive system for managing and tracking plants within a garden, focusing on the plant growth data analytics. The system accommodates various plant types and stages, tracks scheduled and ad-hoc events, and provides traceability from seed purchase through to harvest and distribution. Its functionality includes maintaining records of plant event such as watering, weeding, etc., observations such as bud breaking, fruiting, etc. and generating timelines and analytics for efficient garden management.\

## How to run this website?

### Prerequisites
Before you begin, ensure you have met the following requirements:
- Node.js (version 18 or later)
- npm (Node Package Manager)
- Supabase account (for database management)

### Installation
To install the project, follow these steps:

1. Clone the repository:
    ```sh
    git clone <repository-url>
    cd <repository-directory>
    ```

2. Install the dependencies:
    ```sh
    npm install
    ```

3. Set up the environment variables:
    - Create a [.env](http://_vscodecontentref_/0) file in the root directory of the project.
    - Add the necessary environment variables (refer to devcontainer.json for any required variables).

4. Initialize the database:
    - Ensure your Supabase account is set up and the necessary tables are created.
    - Connect to the database: use this command to establish postgre client coneection with supabase. (You need to know the database's password.)
    ```
    export $(cat .env | xargs) && psql -h aws-0-us-west-1.pooler.supabase.com -p 5432 -d postgres -U postgres.hcwkiyqibkgkluouhkib
    ```

### Running the Project
To run the project, follow these steps:

1. Start the server:
    ```sh
    sh remote-start.sh
    ```

2. Open your browser and navigate to:
    ```
    http://localhost:<PORT>
    ```
    Replace `<PORT>` with the port number specified in your [.env](http://_vscodecontentref_/1) file.

## License
This project is licensed under the ISC License.