# Course Workload Estimator

Course Workload Estimator - a time calculator for instructors to estimate how many hours of work students might be expected to spend on a course.

## Development

Run the project using Docker. With live-reload, use command:

    ```bash
    docker compose up --build
    ```

and open `localhost:3000`.

Use build file from `/dist` folder:

    ```
    docker-compose -f docker-compose.build.yml up --build
    ```

and open `localhost:8080`.
