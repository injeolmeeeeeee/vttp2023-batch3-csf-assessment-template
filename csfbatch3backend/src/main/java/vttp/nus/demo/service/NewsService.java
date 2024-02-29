package vttp.nus.demo.service;

import java.io.IOException;
import java.util.UUID;

import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import vttp.nus.demo.model.News;
import vttp.nus.demo.repository.ImageRepository;
import vttp.nus.demo.repository.NewsRepository;

@Service
public class NewsService {

    @Autowired
    private ImageRepository imageRepo;

    @Autowired
    private NewsRepository newsRepo;

    public String postNews(News news, MultipartFile picture) throws IOException {
		String imageName = UUID.randomUUID().toString();
		imageRepo.putObject(picture, imageName);
		news.setImage(imageName);
		Document doc = newsRepo.createNews(news);
		return doc.getObjectId("_id").toString();
	}
}