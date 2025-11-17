# My ASP.NET Core Application

This is a simple ASP.NET Core 9.0 application that demonstrates the use of MVC architecture with three main views: Index, Users, and Products.

## Project Structure

- **Controllers**: Contains the controllers that handle user requests.
  - `HomeController.cs`: Manages the home page.
  - `UsersController.cs`: Manages user-related actions.
  - `ProductsController.cs`: Manages product-related actions.

- **Models**: Contains the data models used in the application.
  - `User.cs`: Represents a user with properties like Id, Name, and Email.
  - `Product.cs`: Represents a product with properties like Id, Name, and Price.

- **Views**: Contains the Razor views for the application.
  - **Home**
    - `Index.cshtml`: The view for the home page.
  - **Users**
    - `Index.cshtml`: The view for displaying the list of users.
  - **Products**
    - `Index.cshtml`: The view for displaying the list of products.
  - **Shared**
    - `_Layout.cshtml`: The shared layout for the application.
    - `_ViewStart.cshtml`: Sets the layout for the views.
  - `_ViewImports.cshtml`: Contains directives for all views.

- **wwwroot**: Contains static files for the application.
  - **css**
    - `site.css`: CSS styles for the application.
  - **js**
    - `site.js`: JavaScript code for the application.

- **Properties**
  - `launchSettings.json`: Settings for launching the application.

- **Configuration Files**
  - `appsettings.json`: General configuration settings.
  - `appsettings.Development.json`: Development-specific configuration settings.

- **Program.cs**: The entry point of the application.

- **my-aspnet-app.csproj**: The project file containing dependencies and settings.

## Getting Started

1. Clone the repository or download the project files.
2. Open the project in your preferred IDE.
3. Restore the project dependencies.
4. Run the application using the command:
   ```
   dotnet run
   ```
5. Navigate to `http://localhost:5000` to view the application.

## Features

- Home page with welcome message.
- User management with a dedicated view for listing users.
- Product management with a dedicated view for listing products.

## License

This project is licensed under the MIT License.