 <h1 align="center">MangoDb, Express, React, Node, Material UI, SASS, Redux, Jest, React Testing Library, Prettier, esLint, Boilerplate</h1>

## Invoice App

The Invoice App is a comprehensive application designed to facilitate the process of generating invoices for registered users. It offers a range of features aimed at streamlining invoicing procedures and maintaining organized records. Users have the capability to manage a database of clients, including their contact information and billing details. Additionally, the application allows users to maintain a catalog of products or services offered, complete with descriptions and pricing.

One of the key functionalities of the Invoice App is its ability to create and manage invoices efficiently. Users can easily generate new invoices, add line items for products or services provided, specify quantities, and calculate totals. The app also maintains a centralized list of all issued invoices, providing users with quick access to past transactions.

Furthermore, the Invoice App offers robust editing capabilities, allowing users to modify specific details within issued invoices. Whether it's updating client information, adjusting line item descriptions, or revising pricing, users can make necessary changes with ease.

Overall, the Invoice App serves as a comprehensive tool for invoice management, empowering users to create, maintain, and edit invoices in a user-friendly and efficient manner.

## Getting Started

To run the application using Docker, follow these steps:

1. **Install Docker and Docker Compose:**
   Make sure you have Docker and Docker Compose installed on your machine.

2. **Clone the repository:**
   Clone the repository to your local environment:
   ```bash
   git clone [repository_url]
   cd [repository_name]
   ```

- **Build and run the application using Docker Compose:**
  In the project directory containing the `docker-compose.yml` file, run the following command:

```bash
docker-compose up -d --build
```

his command will build Docker images and start containers as per the configuration in the docker-compose.yml file.

Now, your application should be running in Docker containers, with the frontend and backend operating on their respective ports. Open a web browser and check localhost:3000 for the frontend and the specified address for the backend.

## History of commits.

"The Invoice App is a revitalized project aimed at enhancing the functionality of an existing application. Previously comprised of separate frontend and backend components, the project has been revitalized with the integration of Docker for improved containerization and deployment processes. The frontend component, accessible at [\[link to frontend GitHub repository\]](https://github.com/effectiveone/InvoiceApp-Frontend), and the backend component, accessible at [\[link to backend GitHub repository\]](https://github.com/effectiveone/InvoiceApp-backend), provide a glimpse into the project's earlier iterations.
