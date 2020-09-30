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
    Instant timestamp;

    public UserActivity(int userId, String userName, String zipcode, String[] interests, String searchTerm, String page, String gender) {
        this.userId = userId;
        this.userName = userName;
        this.zipcode = zipcode;
        this.interests = interests;
        this.searchTerm = searchTerm;
        this.page = page;
        this.timestamp = Instant.now();
    }

    public UserActivity updateSearch(String searchTerm) {
        this.searchTerm = searchTerm;
        return this;
    }
}
