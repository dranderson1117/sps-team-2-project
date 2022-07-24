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
import com.google.cloud.datastore.Query;
import com.google.cloud.datastore.QueryResults;

import org.jsoup.Jsoup;
import org.jsoup.safety.Safelist;
import java.io.IOException;
import java.util.Collections;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/login-handler")
public class LoginHandlerServlet extends HttpServlet {

  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
    //Cleaning and storing the user input into local variables
    String inputEmail = Jsoup.clean(request.getParameter("email"), Safelist.none());
    String password = Jsoup.clean(request.getParameter("password"), Safelist.none());
    boolean signup = true;
    //String userID = Jsoup.clean(request.getParameter("content"), Safelist.none());



    //creates a new instance of datastore
    Datastore datastore = DatastoreOptions.getDefaultInstance().getService();
    //allows us to set the "kind" of the datastore entities we are creating
    KeyFactory keyFactory = datastore.newKeyFactory().setKind("UserCred");


    Query<Entity> query =
    Query.newEntityQueryBuilder().setKind("UserCred").build();
    QueryResults<Entity> results = datastore.run(query);

    while (results.hasNext()) {
        Entity entity = results.next();
        String email = entity.getString("Email");
        if(inputEmail.equals(email) ){
            signup = false;
        }
    }

    //Creates a new entity and set its properties by key value pair
    if(signup){
        FullEntity personEntity = 
        Entity.newBuilder(keyFactory.newKey())
            .set("Email", inputEmail)
            .set("Password", password)
            //.set("userID", userID)
            .build();
    
            datastore.put(personEntity);
    
            KeyFactory keyFactory2 = datastore.newKeyFactory().setKind("User");
    
            //Creates a new entity and set its properties by key value pair
            FullEntity personEntity2 = 
            Entity.newBuilder(keyFactory2.newKey())
            .set("Username", "")
            .set("Email", inputEmail)
            .set("School", "")
            .set("Major", "")
            .set("Minor", "")
            .set("Major2", "")
            .set("Tag", "")
            .set("courses", Collections.emptyList())
            .set("friends", Collections.emptyList())
            .build();
        
                datastore.put(personEntity2);
        // Print the value so you can see it in the server logs.
        System.out.println("Email submitted: " + password+"  Password Submitted: " + inputEmail);
    
        // Write the value to the response so the user can see it.
        //response.getWriter().println("Name submitted: " + textValue[0]+"\nEmail Submitted: " + textValue[1]+"\nPhone Number Submitted: " + textValue[2]);
        //response.sendRedirect("/contacts-list");
        response.getWriter().println("<script>sessionStorage.setItem(\"email\","+inputEmail+");</script>");
        response.getWriter().println("<script>location.href = 'https://summer22-sps-2.uc.r.appspot.com/main.html';</script>");
    }
    else{
        response.getWriter().println("<script>location.href = 'https://summer22-sps-2.uc.r.appspot.com/login.html';</script>");
    }


    //response.sendRedirect("/login.html");
  }
}
