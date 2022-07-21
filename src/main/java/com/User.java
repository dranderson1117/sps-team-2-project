package com;

import java.util.ArrayList;

public class User {
    private String username;
    private String email;
    private String major;
    private String major2;
    private String minor;
    private ArrayList<String> courses;
    private ArrayList<String> friends;




    public User(String email, String name, String major, String major2, String minor, ArrayList<String> courses, ArrayList friends){
        this.email = email;
        this.username = name;
        this.major = major;
        this.major2 = major2;
        this.minor = minor;
        this.courses = courses;


    }
    public String getEmail() {
        return email;
    }


}
