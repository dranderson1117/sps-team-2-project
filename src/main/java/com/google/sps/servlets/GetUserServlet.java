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
import com.google.cloud.datastore.Query;
import com.google.cloud.datastore.QueryResults;
import com.google.cloud.datastore.StringValue;
import com.google.cloud.datastore.StructuredQuery.OrderBy;
import com.google.gson.Gson;
import com.User;
import com.UserCred;

import org.jsoup.Jsoup;
import org.jsoup.safety.Safelist;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/** Servlet responsible for listing tasks. */
@WebServlet("/get-user")
public class GetUserServlet extends HttpServlet {

  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
    String inputEmail = Jsoup.clean(request.getParameter("email"), Safelist.none());
]    Datastore datastore = DatastoreOptions.getDefaultInstance().getService();
    Query<Entity> query =
        Query.newEntityQueryBuilder().setKind("User").build();
    QueryResults<Entity> results = datastore.run(query);
    Gson gson = new Gson();




    List<User> userList = new ArrayList<>();
    while (results.hasNext()) {
      Entity entity = results.next();

      List<StringValue> friends = new ArrayList<>();
      List<StringValue> friendsCopy = new ArrayList<>();
  
      List<StringValue> courses = new ArrayList<>();
      List<StringValue> coursesCopy = new ArrayList<>();

      //long id = entity.getKey().getId();
      String email = entity.getString("Email");
      String major = entity.getString("Major");
      String major2 = entity.getString("Major2");
      String minor = entity.getString("Minor");
      String school = entity.getString("School");
      String tag = entity.getString("tag");
      String username = entity.getString("username");
      friends = entity.getList("friends");
      friendsCopy = new ArrayList<StringValue>(friends);

      courses = entity.getList("friends");
      coursesCopy = new ArrayList<StringValue>(friends);






      User user = new User(email, username, major, major2, minor, school, tag, coursesCopy, friendsCopy);
      userList.add(user);
    }
    for(int i =0; i <userList.size();i++){
            String userJson = gson.toJson(userList.get(i));
            response.getWriter().println("<script>sessionStorage.setItem(\"user\",JSON.parse("+userJson+"));</script>");
        
    }

    /*if(login){
        String jsonList=gson.toJson(userList);

        response.getWriter().println("<script>sessionStorage.setItem(\"userList\",JSON.stringify("+jsonList+"));</script>");
        response.getWriter().println("<script>location.href = 'https://summer22-sps-2.uc.r.appspot.com/main.html';</script>");
        //response.setContentType("application/json;");
        //response.getWriter().println(jsonList);
    }
    else{
        response.getWriter().println("<script>location.href = 'https://summer22-sps-2.uc.r.appspot.com/login.html';</script>");

    }*/


  }
}
