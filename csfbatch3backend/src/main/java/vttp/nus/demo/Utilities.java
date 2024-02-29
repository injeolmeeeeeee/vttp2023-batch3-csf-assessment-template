package vttp.nus.demo;

import org.springframework.stereotype.Component;

import jakarta.json.Json;
import jakarta.json.JsonObject;

@Component
public final class Utilities {

    public static JsonObject returnNewsId(String newsId) {
        return Json.createObjectBuilder()
                .add("newsId", newsId)
                .build();
    }
}