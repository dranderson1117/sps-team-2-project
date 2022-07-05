/*import com.google.sps.User;
import com.google.gson.Gson;
import java.io.IOException;
import java.util.Date;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/** Servlet that responds with the current date. 
@WebServlet("/get-user")
public class UserServlet extends HttpServlet {

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    /*  User u = new User("name", "email", "phoneNumber", "major", "minor");
      String json = convertToJsonUsingGson(u);

    response.setContentType("application/json;");
    //response.getWriter().println("The server's current date is " + new Date());
    response.getWriter().println(json);


    Class.forName("com.mysql.jdbc.GoogleDriver");
    Url = "jdbc:google:mysql://ppID:practice/practice_database? user=root";
    Connection con = DriverManager.getConnection (Url);
  }
  private String convertToJsonUsingGson(User u) {
    Gson gson = new Gson();
    String json = gson.toJson(u);
    return json;
  }
}*/

import java.io.*;
import java.sql.*;
import javax.servlet.http.*;
import com.google.appengine.api.utils.SystemProperty;
import java.io.IOException;
import java.util.Date;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class UserServlet extends HttpServlet {
  @Override
  public void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException {
    String url = null;
    try {
      if (SystemProperty.environment.value() ==
          SystemProperty.Environment.Value.Production) {
        // Load the class that provides the new "jdbc:google:mysql://" prefix.
        Class.forName("com.mysql.jdbc.GoogleDriver");
        url = "jdbc:google:mysql://pminchu-sps-summer22:practice/guestbook?user=root";
      } else {
        // Local MySQL instance to use during development.
        Class.forName("com.mysql.jdbc.Driver");
        url = "jdbc:mysql://127.0.0.1:3306/guestbook?user=root";

        // Alternatively, connect to a Google Cloud SQL instance using:
        // jdbc:mysql://ip-address-of-google-cloud-sql-instance:3306/guestbook?user=root
      }
    } catch (Exception e) {
      e.printStackTrace();
      return;
    }

    PrintWriter out = resp.getWriter();
    try {
      Connection conn = DriverManager.getConnection(url);
      try {
        String fname = req.getParameter("fname");
        String content = req.getParameter("content");
        if (fname == "" || content == "") {
          out.println(
              "<html><head></head><body>You are missing either a message or a name! Try again! " +
              "Redirecting in 3 seconds...</body></html>");
        } else {
          String statement = "INSERT INTO entries (guestName, content) VALUES( ? , ? )";
          PreparedStatement stmt = conn.prepareStatement(statement);
          stmt.setString(1, fname);
          stmt.setString(2, content);
          int success = 2;
          success = stmt.executeUpdate();
          if (success == 1) {
            out.println(
                "<html><head></head><body>Success! Redirecting in 3 seconds...</body></html>");
          } else if (success == 0) {
            out.println(
                "<html><head></head><body>Failure! Please try again! " +
                "Redirecting in 3 seconds...</body></html>");
          }
        }
      } finally {
        conn.close();
      }
    } catch (SQLException e) {
      e.printStackTrace();
    }
    resp.setHeader("Refresh", "3; url=/guestbook.jsp");
  }
}