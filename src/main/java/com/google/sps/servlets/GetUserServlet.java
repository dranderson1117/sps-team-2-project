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
import com.google.cloud.datastore.ListValue;
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
import java.util.List;
import java.util.Map;
import java.util.Set;

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
    Datastore datastore = DatastoreOptions.getDefaultInstance().getService();
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
      
      /*
      System.out.println("ENTITY-HOOP: " + entity);
      System.out.println("PROPERTIES-HOOP: " + entity.getProperties());
      
      Map<String, Value<?>> entityProperties = entity.getProperties();
      entityProperties.get("Username");
      
      String username = entityProperties.get("Username").toString();
      String email = entityProperties.get("Email").toString();
      String school = entityProperties.get("School").toString();
      String major = entityProperties.get("Major").toString();
      String minor = entityProperties.get("Minor").toString();
      String major2 = entityProperties.get("Major2").toString();

      String tag;
      Value<String> tempTag = (Value<String>)entityProperties.get("tag");
      if(tempTag != null)
        tag = tempTag.toString();
      else
        tag = "";
      
      ListValue tempCourses = ((ListValue) entityProperties.get("courses"));
      if(tempCourses != null)
      {
        courses = (List<StringValue>) (entityProperties.get("courses").toBuilder().get());
        coursesCopy = new ArrayList<StringValue>(courses);
      }
      else
        courses = new ArrayList<StringValue>();

      ListValue tempFriends = ((ListValue) entityProperties.get("friends"));
      friendsCopy = new ArrayList<StringValue>();
      if(tempFriends != null)
      {
        friends = (List<StringValue>) (entityProperties.get("friends").toBuilder().get());
        StringValue[] friendsString = (StringValue[]) friends.toArray();
        for(StringValue friend : friendsString){
          friendsCopy.add(friend.);
        }
      }
      else
      */
      

      //long id = entity.getKey().getId();

      
      String username = entity.getString("Username");
      String email = entity.getString("Email");
      String school = entity.getString("School");
      String major = entity.getString("Major");
      String minor = entity.getString("Minor");
      String major2 = entity.getString("Major2");
      String tag = entity.getString("tag");
      courses = entity.getList("courses");
      coursesCopy = new ArrayList<StringValue>(courses);
      friends = entity.getList("friends");
      friendsCopy = new ArrayList<StringValue>(friends);
      
      System.out.println("username: " + username + ", tag: " + tag + ", courses: " + courses + ", friends: " + friends);

      User user = new User(email, username, major, major2, minor, school, tag, coursesCopy, friendsCopy);
      userList.add(user);
      if(email == inputEmail){
        String userJson = gson.toJson(user);
        response.getWriter().println("<script>sessionStorage.setItem(\"user\",JSON.parse("+userJson+"));</script>");
      }
    }

    userList.forEach(user -> System.out.println("User Email: " + user.getEmail()));


    String jsonList = gson.toJson(userList);
    response.getWriter().println("<script>sessionStorage.setItem(\"userList\",JSON.stringify("+jsonList+"));</script>");
    response.getWriter().println("<script>location.href = 'https://summer22-sps-2.uc.r.appspot.com/main.html';</script>");

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
