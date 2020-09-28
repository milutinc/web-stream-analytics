package com.shapira.examples.streams.clickstreamenrich;
import java.util.Random;
/**
 * RandomHelper
 */
public class RandomHelper {
        public static String getRandom(String[] array) {
            int rnd = new Random().nextInt(array.length);
            return array[rnd];
        }
    
}