package vttp.nus.demo.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import vttp.nus.demo.Utilities;
import vttp.nus.demo.model.News;
import vttp.nus.demo.service.NewsService;

@RestController
@RequestMapping(value = "/api", produces = MediaType.APPLICATION_JSON_VALUE)
public class NewsController {

    @Autowired
    private NewsService newsService;
    @Autowired
    private Utilities utils;

    @PostMapping("/news")
    public ResponseEntity<String> createNews(
            @RequestPart String title,
            @RequestPart String description,
            @RequestPart(required = false) String tags,
            @RequestPart MultipartFile image) throws IOException {
        News news = new News();
        news.setTitle(title);
        news.setDescription(description);
        if (tags != null) {
            news.setTags(List.of(tags.split(",")));
        }
        String result = newsService.postNews(news, image);
        if (result != null && !result.isEmpty()) {
            return ResponseEntity.ok(utils.returnNewsId(result).toString());
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .build();
    }

}
