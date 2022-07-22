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
import com.google.cloud.datastore.StructuredQuery.OrderBy;
import com.google.gson.Gson;
import com.UserCred;
import com.User;

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
@WebServlet("/user-login")
public class UserServlet extends HttpServlet {

  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
    String inputEmail = Jsoup.clean(request.getParameter("email"), Safelist.none());
    String inputPassword = Jsoup.clean(request.getParameter("password"), Safelist.none());
    Boolean login = false;
    Datastore datastore = DatastoreOptions.getDefaultInstance().getService();
    Query<Entity> query =
        Query.newEntityQueryBuilder().setKind("UserCred").build();
    QueryResults<Entity> results = datastore.run(query);
    Gson gson = new Gson();


    List<UserCred> userCredList = new ArrayList<>();
    while (results.hasNext()) {
      Entity entity = results.next();

      //long id = entity.getKey().getId();
      String email = entity.getString("Email");
      String password = entity.getString("Password");

      UserCred userCred = new UserCred(email, password);
      userCredList.add(userCred);
    }
    for(int i =0; i <userCredList.size();i++){
        if(inputEmail.equals(userCredList.get(i).getEmail()) & inputPassword.equals(userCredList.get(i).getPassword())){
            login = true;
            String userJson = gson.toJson(userCredList.get(i));
            response.getWriter().println("<script>sessionStorage.setItem(\"userCred\",JSON.parse("+userJson+"));</script>");
        }
    }

    if(login){
        String jsonList=gson.toJson(userCredList);

        response.getWriter().println("<script>sessionStorage.setItem(\"userCredList\",JSON.stringify("+jsonList+"));</script>");
        response.getWriter().println("<script>location.href = 'https://summer22-sps-2.uc.r.appspot.com/main.html';</script>");
        //response.setContentType("application/json;");
        //response.getWriter().println(jsonList);
    }
    else{
        response.getWriter().println("<script>location.href = 'https://summer22-sps-2.uc.r.appspot.com/login.html';</script>");

    }


  }
}
