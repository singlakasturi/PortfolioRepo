package PortfolioKK.demo.controllers;

import PortfolioKK.demo.DTO.ProjectDTO;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
@RestController
@RequestMapping("/api/projects")
@CrossOrigin()
public class ProjectController {

    @GetMapping
    public List<ProjectDTO> getAllProjects() {
        return List.of(
                new ProjectDTO("Resemblance – Code Similarity Detection System",
                List.of("Java", "Spring Boot", "React.js", "Python"),
                List.of("Built a full-stack tool to detect code plagiarism in contests by comparing user submissions structurally and semantically.",
                        "Scraped contest, question, and ranking data via APIs; added email support through a “Contact Us” feature.",
                        "Designed a UI with dual-pane code comparison, showing similarity percentages and matching users.",
                        "Integrated a custom Python model to detect similarity even with variable renaming or language changes."),
                "https://github.com/singlakasturi/Pro",
                "Resemblance.project",
                "Project File",
                "C:\\Users\\SinglaKasturi\\Projects\\",
                "343MB"),

                new ProjectDTO("Football Stats Explorer for UCL Players",
                        List.of("Spring Boot", "Java", "PostgreSQL"),
                        List.of("Developed an intuitive platform for users to explore football player statistics, categorized by teams and nations.",
                                "Utilized PostgreSQL and best practices for scalability, ensuring seamless integration.",
                                "Planned integration of Google Sign-In, LinkedIn, and GitHub authentication to enhance security and user experience."),
                        "https://github.com/singlakasturi/PLLeague",
                        "FootballStats.project",
                        "Project File",
                        "C:\\Users\\SinglaKasturi\\Projects\\",
                        "310KB"),

                new ProjectDTO("Secure Auth System with Email Verification",
                        List.of("Spring Boot", "Java", "PostgreSQL", "SupaBase"),
                        List.of("Constructed a secure Login and Sign-Up system with Email Verification flow and JWT Token generation.",
                                "Implemented authenticated user data retrieval, error handling, and exception logging."),
                        "https://github.com/singlakasturi/LSF",
                        "SecureAuthSystem.project",
                        "Project File",
                        "C:\\Users\\SinglaKasturi\\Projects\\",
                        "571KB")
                        );
    }
}