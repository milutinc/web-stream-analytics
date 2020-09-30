package com.shapira.examples.streams.clickstreamenrich.model;
import java.time.Instant;


public class UserActivity {
    int userId;
    String userName;
    String zipcode;
    String[] interests;
    String searchTerm;
    String page;
    String gender;
    String timestamp;

    public UserActivity(int userId, String userName, String zipcode, String[] interests, String searchTerm, String page, String gender) {
        this.userId = userId;
        this.userName = userName;
        this.zipcode = zipcode;
        this.interests = interests;
        this.searchTerm = searchTerm;
        this.page = page;
        this.gender = gender;
        this.timestamp = Instant.now().toString();
    }

    public UserActivity updateSearch(String searchTerm) {
        this.searchTerm = searchTerm;
        return this;
    }
}
