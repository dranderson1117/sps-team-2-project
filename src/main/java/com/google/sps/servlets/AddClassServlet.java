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

import org.jsoup.Jsoup;
import org.jsoup.safety.Safelist;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/** Servlet responsible for adding the course to the user's data*/
@WebServlet("/add-class")
public class AddClassServlet extends HttpServlet {

  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
    String inputEmail = Jsoup.clean(request.getParameter("email"), Safelist.none());
    String newClass = Jsoup.clean(request.getParameter("newClass"), Safelist.none());
    Datastore datastore = DatastoreOptions.getDefaultInstance().getService();
    Query<Entity> query =
        Query.newEntityQueryBuilder().setKind("User").build();
    QueryResults<Entity> results = datastore.run(query);

    List<StringValue> courses = new ArrayList<>();
    List<StringValue> coursesCopy = new ArrayList<>();

    while (results.hasNext()) {
      Entity entity = results.next();

      long id = entity.getKey().getId();
      String email = entity.getString("Email");
      if(inputEmail.equals(email) ){
        courses = entity.getList("courses");

        coursesCopy = new ArrayList<StringValue>(courses);

        coursesCopy.add(StringValue.of(newClass));
          
          KeyFactory keyFactory = datastore.newKeyFactory().setKind("User");
          com.google.cloud.datastore.Key setKey = keyFactory.newKey(id); 
          Entity set = datastore.get(setKey); 

          //update the hasImage  
          set = Entity.newBuilder(set).set("courses", coursesCopy).build(); 
          datastore.put(set);
      }
    }
  }
}
