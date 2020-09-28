package com.shapira.examples.streams.clickstreamenrich.model;


public class UserProfile {
    int userID;
    String userName;
    String zipcode;
    String gender;
    String[] interests;


    public UserProfile(int userID, String userName, String zipcode, String gender, String[] interests) {
        this.userID = userID;
        this.userName = userName;
        this.zipcode = zipcode;
        this.gender = gender;
        this.interests = interests;
    }

    public int getUserID() {
        return userID;
    }

    public UserProfile update(String zipcode, String[] interests) {
        this.zipcode = zipcode;
        this.interests = interests;
        return this;
    }

    public String getUserName() {
        return userName;
    }

    public String getZipcode() {
        return zipcode;
    }

    public String[] getInterests() {
        return interests;
    }
    public String getGender() {
        return gender;
    }
}
