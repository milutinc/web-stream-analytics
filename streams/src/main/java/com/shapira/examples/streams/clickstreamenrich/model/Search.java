package com.shapira.examples.streams.clickstreamenrich.model;


public class Search {
    int userID;
    String searchTerms;

    public Search(int userID, String searchTerms) {
        this.userID = userID;
        this.searchTerms = searchTerms;
    }

    public int getUserID() {
        return userID;
    }

    public String getSearchTerms() {
        return searchTerms;
    }
}
