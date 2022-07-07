// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package com.google.sps.servlets;
import com.google.api.client.util.Key;
import com.google.cloud.datastore.Datastore;
import com.google.cloud.datastore.DatastoreOptions;
import com.google.cloud.datastore.Entity;
import com.google.cloud.datastore.FullEntity;
import com.google.cloud.datastore.KeyFactory;
import org.jsoup.Jsoup;
import org.jsoup.safety.Safelist;
import java.io.IOException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/form-handler")
public class FormHandlerServlet extends HttpServlet {

  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
    String name = Jsoup.clean(request.getParameter("name-input"), Safelist.none());
    String email = Jsoup.clean(request.getParameter("email"), Safelist.none());
    String phoneNumber = Jsoup.clean(request.getParameter("ph"), Safelist.none());
    String description = Jsoup.clean(request.getParameter("content"), Safelist.none());

    // // Print the input so you can see it in the server logs.
    System.out.println("name: " + name);
    System.out.println("email: " + email);
    System.out.println("number: " + phoneNumber);
    System.out.println("description: " + description);


    Datastore datastore = DatastoreOptions.getDefaultInstance().getService();
    KeyFactory keyFactory = datastore.newKeyFactory().setKind("User");

    FullEntity personEntity = 
    Entity.newBuilder(keyFactory.newKey())
        .set("Name", name)
        .set("Email", email)
        .set("Phone Number", phoneNumber)
        .build();

        datastore.put(personEntity);
    // Print the value so you can see it in the server logs.
    System.out.println("Name submitted: " + name+"  Email Submitted: " + email+" Phone Number Submitted: " + phoneNumber);

    // Write the value to the response so the user can see it.
    //response.getWriter().println("Name submitted: " + textValue[0]+"\nEmail Submitted: " + textValue[1]+"\nPhone Number Submitted: " + textValue[2]);
    //response.sendRedirect("/contacts-list");
    response.sendRedirect("/index.html");
  }
}
