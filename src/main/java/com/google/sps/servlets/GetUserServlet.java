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
import com.google.gson.Gson;
import com.User;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/** 
 * Servlet responsible for getting the user information based on the email address entered at signup or login. 
 */
@WebServlet("/get-user")
public class GetUserServlet extends HttpServlet {

  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
    Datastore datastore = DatastoreOptions.getDefaultInstance().getService();
    Query<Entity> query =
        Query.newEntityQueryBuilder().setKind("User").build();
    QueryResults<Entity> results = datastore.run(query);
    Gson gson = new Gson();

    List<User> userList = new ArrayList<>();
    while (results.hasNext()) {
      Entity entity = results.next();

      List<StringValue> friends = new ArrayList<>();
      List<String> friendsCopy = new ArrayList<>();
  
      List<StringValue> courses = new ArrayList<>();
      List<String> coursesCopy = new ArrayList<>();
      
      String username = entity.getString("Username");
      String email = entity.getString("Email");
      String school = entity.getString("School");
      String major = entity.getString("Major");
      String minor = entity.getString("Minor");
      String major2 = entity.getString("Major2");
      String tag = entity.getString("Tag");

      courses = entity.getList("courses");
      for(StringValue course : courses)
        coursesCopy.add(course.toBuilder().get());

      friends = entity.getList("friends");
      for(StringValue friend : friends)
        friendsCopy.add(friend.toBuilder().get());
      
      System.out.println("username: " + username + ", tag: " + tag + ", courses: " + courses + ", friends: " + friends);

      User user = new User(email, username, major, major2, minor, school, tag, coursesCopy, friendsCopy);
      userList.add(user);
    }

    userList.forEach(user -> System.out.println("User Email: " + user.getEmail()));

    
    String jsonList = gson.toJson(userList);
    response.getWriter().println(jsonList);
  }
}
