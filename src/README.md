**`README.md`:**

```markdown
# Financial Portfolio Management System (Angular 12)

This is a front-end application for managing financial portfolios. It allows users to view a dashboard with key performance indicators and add new investments through a form with client-side validation.

## Features Implemented

-   **Dashboard:** Displays key portfolio information (mocked data) such as total value and change percentage. Includes an interactive line chart visualizing portfolio performance over time.
-   **Add Investment Form:** A form for users to input investment details (asset type, quantity, purchase price, and date).
-   **Investment List:** Displays a list of all investments.
-   **Client-Side Validation:** Implemented using Angular's reactive forms to ensure data accuracy and completeness before submission.
-   **Mock Backend:** A service (`MockBackendService`) simulates API calls for fetching portfolio performance and adding investments.
-   **State Management:** Implemented using NgRx for managing application state.
-   **Interactive Chart:** Uses Chart.js to create a dynamic line chart.
-   **Currency Format Pipe:** Formats numbers as Indian Rupees (INR).
-   **Highlight Directive:** A custom directive to highlight elements on mouse hover.
-   **Responsive Design:** Basic responsiveness implemented for the dashboard.
-   **TypeScript Type Checks:** Utilizes TypeScript's strong typing.
-   **Dependency Injection:** Proper use of Angular's dependency injection.
-   **Pipes and Directives:** Includes a custom pipe (`CurrencyFormatPipe`) and a custom directive (`HighlightDirective`).
-   **Observables/Subjects:** Uses RxJS Observables for handling asynchronous operations and NgRx.

## How to Run the Application

1.  **Clone the repository** (if you haven't already).
2.  **Navigate to the project directory:**
    ```bash
    cd financial-portfolio-app
    ```
3.  **Install dependencies:**
    ```bash
    npm install
    ```
4.  **Start the development server:**
    ```bash
    ng serve -o
    ```
    This command will build the application and serve it at `http://localhost:4200/`. The `-o` flag will automatically open the application in your default web browser.

## Notes

-   This application uses a mock backend service (`src/app/core/mock-backend.service.ts`) to simulate API interactions. No actual backend server is required to run this front-end implementation.
-   The `node_modules` and `.angular` directories are not included in this shared code. You will need to run `npm install` to generate them.

## Further Development (Good to Have)

-   **HTTP Interceptors:** Implement HTTP interceptors for tasks like adding authentication headers or handling errors globally (though not strictly needed with a mock backend).
-   **Written Test Cases:** Add unit and integration tests using a testing framework like Jasmine and Karma.
-   **Lazy Loading:** Configure lazy loading for modules to improve initial load time for larger applications.
