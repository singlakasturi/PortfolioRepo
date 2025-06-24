package PortfolioKK.demo.controllers;

import PortfolioKK.demo.DTO.SearchDTO;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.json.*;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/search")
@CrossOrigin()
public class SearchController {

    @Value("${google.api.key}")
    private String apiKey;

    @Value("${google.cse.cx}")
    private String searchEngineId;

    @Value("${google.youtube.cx}")
    private String youtubeSearchId;

    @GetMapping
    public ResponseEntity<List<SearchDTO>> search(
            @RequestParam("q") String query,
            @RequestParam(value = "type", defaultValue = "web") String type
    ) {
        String encodedQuery = URLEncoder.encode(query, StandardCharsets.UTF_8);
        String apiUrl = "";

        switch (type.toLowerCase()) {
            case "image":
                apiUrl = "https://www.googleapis.com/customsearch/v1"
                        + "?key=" + apiKey
                        + "&cx=" + searchEngineId
                        + "&searchType=image"
                        + "&q=" + encodedQuery;
                break;

            case "video":
                apiUrl = "https://www.googleapis.com/youtube/v3/search"
                        + "?key=" + apiKey
                        + "&part=snippet"
                        + "&type=video"
                        + "&maxResults=10"
                        + "&q=" + encodedQuery;
                break;

            default: // web
                apiUrl = "https://www.googleapis.com/customsearch/v1"
                        + "?key=" + apiKey
                        + "&cx=" + searchEngineId
                        + "&q=" + encodedQuery;
                break;
        }

        RestTemplate restTemplate = new RestTemplate();
        String jsonResponse = restTemplate.getForObject(apiUrl, String.class);
        List<SearchDTO> results = new ArrayList<>();

        try {
            JSONObject json = new JSONObject(jsonResponse);

            if (type.equalsIgnoreCase("video")) {
                JSONArray items = json.optJSONArray("items");
                if (items != null) {
                    for (int i = 0; i < items.length(); i++) {
                        JSONObject item = items.getJSONObject(i);
                        JSONObject snippet = item.getJSONObject("snippet");
                        String title = snippet.optString("title");
                        String link = "https://www.youtube.com/watch?v=" + item.getJSONObject("id").optString("videoId");
                        String description = snippet.optString("description");
                        String thumbnail = snippet.getJSONObject("thumbnails").getJSONObject("default").optString("url");

                        results.add(new SearchDTO(title, link, description, thumbnail));
                    }
                }
            } else {
                JSONArray items = json.optJSONArray("items");
                if (items != null) {
                    for (int i = 0; i < items.length(); i++) {
                        JSONObject item = items.getJSONObject(i);
                        String title = item.optString("title");
                        String link = item.optString("link");
                        String snippet = item.optString("snippet");
                        String image = null;

                        if (type.equalsIgnoreCase("image")) {
                            image = link; // image link is same as main link
                        } else {
                            JSONObject pagemap = item.optJSONObject("pagemap");
                            if (pagemap != null && pagemap.has("cse_image")) {
                                JSONArray cseImages = pagemap.optJSONArray("cse_image");
                                if (cseImages != null && cseImages.length() > 0) {
                                    image = cseImages.getJSONObject(0).optString("src");
                                }
                            }
                        }

                        results.add(new SearchDTO(title, link, snippet, image));
                    }
                }
            }
        } catch (JSONException e) {
            e.printStackTrace();
        }

        return ResponseEntity.ok(results);
    }
}
