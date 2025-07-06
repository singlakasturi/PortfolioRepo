package PortfolioKK.demo.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

public class ProjectDTO {
    private String title;
    private List<String> techStack;
    private List<String> bullets;
    private String githubLink;
    private String fileName;
    private String fileType;
    private String location;
    private String size;

    public ProjectDTO() {
    }

    public ProjectDTO(String title, List<String> techStack, List<String> bullets, String githubLink, String fileName, String fileType, String location, String size) {
        this.title = title;
        this.techStack = techStack;
        this.bullets = bullets;
        this.githubLink = githubLink;
        this.fileName = fileName;
        this.fileType = fileType;
        this.location = location;
        this.size = size;
    }

    public String getTitle() {
        return title;
    }

    public List<String> getTechStack() {
        return techStack;
    }

    public List<String> getBullets() {
        return bullets;
    }

    public String getGithubLink() {
        return githubLink;
    }

    public String getFileName() {
        return fileName;
    }

    public String getFileType() {
        return fileType;
    }

    public String getLocation() {
        return location;
    }

    public String getSize() {
        return size;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setTechStack(List<String> techStack) {
        this.techStack = techStack;
    }

    public void setBullets(List<String> bullets) {
        this.bullets = bullets;
    }

    public void setGithubLink(String githubLink) {
        this.githubLink = githubLink;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public void setFileType(String fileType) {
        this.fileType = fileType;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public void setSize(String size) {
        this.size = size;
    }
}