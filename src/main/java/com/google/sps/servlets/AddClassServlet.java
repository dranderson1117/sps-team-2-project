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

import com.google.cloud.datastore.Datastore;
import com.google.cloud.datastore.DatastoreOptions;
import com.google.cloud.datastore.Entity;
import com.google.cloud.datastore.KeyFactory;
import com.google.cloud.datastore.Query;
import com.google.cloud.datastore.QueryResults;
import com.google.cloud.datastore.StringValue;
import com.google.cloud.datastore.Value;
import com.google.cloud.datastore.StructuredQuery.OrderBy;
import com.google.gson.Gson;
import com.User;
import com.UserCred;

import org.jsoup.Jsoup;
import org.jsoup.safety.Safelist;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/** Servlet responsible for listing tasks. */
@WebServlet("/add-class")
public class AddClassServlet extends HttpServlet {

  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
    String inputEmail = Jsoup.clean(request.getParameter("email"), Safelist.none());
    String newClass = Jsoup.clean(request.getParameter("newClass"), Safelist.none());
    Boolean login = false;
    Datastore datastore = DatastoreOptions.getDefaultInstance().getService();
    Query<Entity> query =
        Query.newEntityQueryBuilder().setKind("User").build();
    QueryResults<Entity> results = datastore.run(query);
    Gson gson = new Gson();


    List<UserCred> userList = new ArrayList<>();
    List<StringValue> courses = new ArrayList<>();

    while (results.hasNext()) {
      Entity entity = results.next();

      long id = entity.getKey().getId();
      String email = entity.getString("Email");
      if(inputEmail.equals(email) ){
          courses = entity.getList("courses");
            //arr = courses.toArray();
            
        KeyFactory keyFactory = datastore.newKeyFactory().setKind("User");
            com.google.cloud.datastore.Key setKey = keyFactory.newKey(id); 
             Entity set = datastore.get(setKey); 
  
             //update the hasImage  
             set = Entity.newBuilder(set).set("hasImage", false).build(); 
             datastore.put(set);
        //List<Value<?>> password = entity.getList("classes");
      }

      //UserCred user = new UserCred(email, password);
      //userList.add(user);
    }


    if(login){
        String jsonList=gson.toJson(userList);

        response.getWriter().println("<script>sessionStorage.setItem(\"userList\",JSON.stringify("+jsonList+"));</script>");
        response.getWriter().println("<script>location.href = 'https://summer22-sps-2.uc.r.appspot.com/main.html';</script>");
        //response.setContentType("application/json;");
        //response.getWriter().println(jsonList);
    }
    else{
        response.getWriter().println("<script>location.href = 'https://summer22-sps-2.uc.r.appspot.com/login.html';</script>");

    }


  }
}
