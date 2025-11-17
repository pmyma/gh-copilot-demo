using Microsoft.Data.SqlClient;
using System.Data;
using System.Text;
using System.IO;

namespace UnsecureApp.Controllers
{
    public class MyController
    {
        // Whitelist of allowed directories for file access
        private readonly string[] allowedDirectories = new[] { "/app/data", "/app/uploads" };

        /// <summary>
        /// Reads a file from an allowed directory.
        /// </summary>
        /// <param name="userInput">The filename to read (not full path)</param>
        /// <returns>File contents as string</returns>
        /// <exception cref="UnauthorizedAccessException">Thrown when path is not in allowed directories</exception>
        public string ReadFile(string userInput)
        {
            // Validate input
            if (string.IsNullOrWhiteSpace(userInput))
                throw new ArgumentException("File name cannot be empty", nameof(userInput));

            // Prevent path traversal attacks
            string fileName = Path.GetFileName(userInput);
            string basePath = allowedDirectories[0]; // Use first allowed directory
            string fullPath = Path.Combine(basePath, fileName);
            string normalizedPath = Path.GetFullPath(fullPath);

            // Verify the normalized path is within allowed directory
            if (!normalizedPath.StartsWith(Path.GetFullPath(basePath), StringComparison.OrdinalIgnoreCase))
                throw new UnauthorizedAccessException("Access to this path is not allowed");

            using (FileStream fs = File.Open(normalizedPath, FileMode.Open, FileAccess.Read))
            using (StreamReader reader = new StreamReader(fs, Encoding.UTF8))
            {
                return reader.ReadToEnd();
            }
        }

        /// <summary>
        /// Retrieves the product ID for a given product name from the database using parameterized queries.
        /// </summary>
        /// <param name="productName">The name of the product to search for in the Products table.</param>
        /// <returns>The ProductId of the first matching product, or -1 if not found.</returns>
        /// <exception cref="SqlException">Thrown when there's an error executing the SQL command.</exception>
        public int GetProduct(string productName)
        {
            if (string.IsNullOrWhiteSpace(productName))
                throw new ArgumentException("Product name cannot be empty", nameof(productName));

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open(); // FIX: Open the connection
                
                // FIX: Use parameterized query to prevent SQL injection
                using (SqlCommand sqlCommand = new SqlCommand(
                    "SELECT ProductId FROM Products WHERE ProductName = @ProductName",
                    connection))
                {
                    sqlCommand.CommandType = CommandType.Text;
                    sqlCommand.Parameters.AddWithValue("@ProductName", productName);

                    using (SqlDataReader reader = sqlCommand.ExecuteReader())
                    {
                        // FIX: Check if data exists before reading
                        if (reader.Read())
                        {
                            return reader.GetInt32(0);
                        }
                        return -1; // Product not found
                    }
                }
            }
        }

        public void GetObject()
        {
            try
            {
                object? o = null;
                o?.ToString();
            }
            catch (Exception e)
            {
                // Generate a correlation ID for tracking
                var correlationId = Guid.NewGuid().ToString();
                // Log the exception securely with the correlation ID
                Console.WriteLine($"An error occurred while processing the request. Error ID: {correlationId}");
                Console.WriteLine($"[Error ID: {correlationId}] Exception: {e.Message}\n{e.StackTrace}");
            }
        }

        private string connectionString = "";
    }
}