package com.shapira.examples.streams.clickstreamenrich;

import com.google.gson.Gson;
import com.shapira.examples.streams.clickstreamenrich.model.PageView;
import com.shapira.examples.streams.clickstreamenrich.model.Search;
import com.shapira.examples.streams.clickstreamenrich.model.UserProfile;
import org.apache.kafka.clients.producer.KafkaProducer;
import org.apache.kafka.clients.producer.ProducerRecord;
import org.apache.kafka.clients.producer.RecordMetadata;

import java.util.ArrayList;
import java.util.List;
import java.util.Properties;
import java.util.Random;

/**
 * This class will generate fake clicks, fake searches and fake profile updates
 * For simplicity, we will actually generate events - profiles, update to one profile, searches, clicks
 */
public class GenerateData {

    public static KafkaProducer<Integer, String> producer = null;

    public static void main(String[] args) throws Exception {

        System.out.println("Press CTRL-C to stop generating data");

        List<ProducerRecord> records = new ArrayList<ProducerRecord>();
        Gson gson = new Gson();


        int number=100;

        // add shutdown hook
        Runtime.getRuntime().addShutdownHook(new Thread() {
            public void run() {
                System.out.println("Shutting Down");
                if (producer != null)
                    producer.close();
            }
        });

        

        String[] pagePageViews = {"PageView1", "PageView2","PageView3","PageView4","PageView5","PageView6","PageView7","PageView8","PageView9"};
        String[] searches = {"Search1", "Search2","Search3","Search4","Search5","Search6","Search7","Search8","Search9"};
        String[] interests = {"Interest1", "Interest2","Interest3","Interest4","Interest5"};
        String[] genders = {"Gender1", "Gender2","Gender3"};

        // Generate users
        for (int i = 1; i < number; i++) {
            String[] userInterests = new String[2];
            userInterests[0] = RandomHelper.getRandom(interests);
            userInterests[1] = RandomHelper.getRandom(interests);

            int userId = i;
            String username = "User".concat(Integer.toString(i));
            String zipcode = Integer.toString((new Random()).nextInt(10000));
            String gender = RandomHelper.getRandom(genders);

            UserProfile user = new UserProfile(userId, username, zipcode, gender, userInterests );

            records.add(new ProducerRecord(Constants.USER_PROFILE_TOPIC, user.getUserID(), gson.toJson(user)));
        }

        // Generate searches
        for (int i = 0; i < number; i++) {

            int userId = i;
            String searchName = RandomHelper.getRandom(searches);

            Search search = new Search(userId, searchName);

            records.add(new ProducerRecord(Constants.SEARCH_TOPIC, search.getUserID(), gson.toJson(search)));
        }

        // Generate clicks
        for (int i = 0; i < number; i++) {

            int userId = i;
            String pageViewName = RandomHelper.getRandom(pagePageViews);


            PageView view = new PageView(userId, pageViewName);

            records.add(new ProducerRecord(Constants.PAGE_VIEW_TOPIC, view.getUserID(), gson.toJson(view)));
        }


        // Configure a producer.
        // We'll use User ID as the key for all events - since joins require a common key
        // Since we are going to write objects of different types as values, we'll serialize all of them to JSON strings ourselves
        // So the producer type and serializer are just for strings

        Properties props = new Properties();

        props.put("bootstrap.servers", Constants.BROKER);
        props.put("key.serializer", "org.apache.kafka.common.serialization.IntegerSerializer");
        props.put("value.serializer", "org.apache.kafka.common.serialization.StringSerializer");

        // Starting producer
        producer = new KafkaProducer<Integer, String>(props);

        // Send existing events
        for (ProducerRecord record: records)
            producer.send(record, (RecordMetadata r, Exception e) -> {
                if (e != null) {
                    System.out.println("Error producing to topic " + r.topic());
                    e.printStackTrace();
                }
            });


        // Sleep 5 seconds, to make sure we recognize the new events as a separate session
        records.clear();
        // Thread.sleep(5000);

        // search
        // for (int i = 0; i < number; i++) {

        //     int userId = i;
        //     String searchName = RandomHelper.getRandom(searches);

        //     Search search = new Search(userId, searchName);

        //     records.add(new ProducerRecord(Constants.SEARCH_TOPIC, search.getUserID(), gson.toJson(search)));
        // }

        // Click for an unknown user without searches - we want to make sure we have results for those too.

        // PageView view6 = new PageView(-1, "product/osprey-atmos-65-ag-pack");
        // records.add(new ProducerRecord(Constants.PAGE_VIEW_TOPIC, view6.getUserID(), gson.toJson(view6)));

        // for (int i = 0; i < number; i++) {

        //     int userId = i;
        //     String pageViewName = RandomHelper.getRandom(pagePageViews);

        //     PageView view = new PageView(userId, pageViewName);

        //     records.add(new ProducerRecord(Constants.PAGE_VIEW_TOPIC, view.getUserID(), gson.toJson(view)));
        // }

        // Send additional events
        // for (ProducerRecord record: records)
        //     producer.send(record, (RecordMetadata r, Exception e) -> {
        //         if (e != null) {
        //             System.out.println("Error producing to topic " + r.topic());
        //             e.printStackTrace();
        //         }
        //     });


        // and done...
        producer.close();


    }


}
