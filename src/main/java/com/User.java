package com;

public class User {
    private String name;
    private String email;
    private String password;
    private String major;
    private String minor;


    public User(String email, String password){
        this.email = email;
        this.password = password;

    }
    public String getEmail() {
        return email;
    }
    public String getPassword() {
        return password;
    }

}
