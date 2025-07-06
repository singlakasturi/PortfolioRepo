package PortfolioKK.demo.DTO;

public class SearchDTO {
    private String title;
    private String link;
    private String snippet;
    private String image;

    public SearchDTO (String title, String link, String snippet, String image) {
        this.title = title;
        this.link = link;
        this.snippet = snippet;
        this.image = image;
    }

    public String getTitle() { return title; }
    public String getLink() { return link; }
    public String getSnippet() { return snippet; }
    public String getImage() { return image; }

}
