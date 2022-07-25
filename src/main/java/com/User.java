package com;

import java.util.ArrayList;
import java.util.List;

import com.google.cloud.datastore.StringValue;

public class User {
    private String username;
    private String email;
    private String major;
    private String major2;
    private String minor;
    private String school;
    private String tag;
    private List<String> courses;
    private List<String> friends;




    public User(String email, String name, String major, String major2, String minor,String school, String tag, List<String> coursesCopy, List<String> friendsCopy){
        this.email = email;
        this.username = name;
        this.major = major;
        this.major2 = major2;
        this.minor = minor;
        this.school = school;
        this.tag = tag;
        this.courses = coursesCopy;
        this.friends = friendsCopy;


    }
    public String getEmail() {
        return email;
    }


}
