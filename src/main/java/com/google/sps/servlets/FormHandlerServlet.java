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
import com.google.cloud.datastore.Value;

import org.jsoup.Jsoup;
import org.jsoup.safety.Safelist;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/form-handler")
public class FormHandlerServlet extends HttpServlet {

  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
    //String body = Jsoup.clean(request.getParameter("body"), Safelist.none());
    String username = Jsoup.clean(request.getParameter("username"), Safelist.none());
    String inputEmail = Jsoup.clean(request.getParameter("email"), Safelist.none());
    String school = Jsoup.clean(request.getParameter("school"), Safelist.none());
    String major = Jsoup.clean(request.getParameter("major"), Safelist.none());
    String major2 = Jsoup.clean(request.getParameter("major2"), Safelist.none());
    String minor = Jsoup.clean(request.getParameter("minor"), Safelist.none());
    String tag = Jsoup.clean(request.getParameter("tag"), Safelist.none());

    // // Print the input so you can see it in the server logs.


    Datastore datastore = DatastoreOptions.getDefaultInstance().getService();
    Query<Entity> query =
        Query.newEntityQueryBuilder().setKind("User").build();
    QueryResults<Entity> results = datastore.run(query);

    while (results.hasNext()) {
        Entity entity = results.next();
  
        long id = entity.getKey().getId();
        String email = entity.getString("Email");
        if(inputEmail.equals(email) ){
  
  
    
            
            KeyFactory keyFactory = datastore.newKeyFactory().setKind("User");
            com.google.cloud.datastore.Key setKey = keyFactory.newKey(id); 
             Entity set = datastore.get(setKey); 
  
             //update the hasImage  
             set = Entity.newBuilder(set)
             .set("Username", username)
             .set("School", school)
             .set("Major", major)
             .set("Minor", minor)
             .set("Major2", major2)
             .set("Tag", tag)
             .build(); 
             datastore.put(set);

        }
    }
    response.getWriter().println("<script>location.href = 'https://summer22-sps-2.uc.r.appspot.com/main.html';</script>");

  }
}
