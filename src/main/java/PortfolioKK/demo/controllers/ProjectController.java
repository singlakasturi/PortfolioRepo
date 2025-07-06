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
                List.of("Spring Boot", "React.js", "Python", "Java", "Flask", "Rest API's"),
                List.of("Developed a full-stack tool for detecting plagiarism in coding contests with semantic and structural analysis.",
                        "Implemented a dual-pane UI to compare code with % similarity and user highlighting.",
                        "Integrated custom Python model to detect logical similarity despite variable changes or language switches.",
                        "Used API scraping for contest & submission data; added email support through the ’Contact Us’ feature."),
                "https://github.com/singlakasturi/Pro",
                "Resemblance.project",
                "Project File",
                "C:\\Users\\SinglaKasturi\\Projects\\",
                "343MB"),

                new ProjectDTO("TuneTrace – Real-Time Music Recognition App",
                        List.of("Spring Boot", "React.js", "PostgreSQL", "Java", "Rest API's", "TarsosDSP"),
                        List.of("Built a full-stack music identification system that recognizes songs through microphone input or MP3 uploads using audio fingerprinting.",
                                "We used TarsosDSP in the backend to process and match sound patterns in real time.",
                                "Designed a modern, responsive UI for song discovery with details such as artist, album, and match confidence.",
                                "Engineered a scalable PostgreSQL schema for storing song fingerprints and metadata.",
                                "Designed features to analyze similar submissions, laying the groundwork for a recommendation system."),
                        "https://github.com/singlakasturi/Shazam-But-Better",
                        "TuneTrace.project",
                        "Project File",
                        "C:\\Users\\SinglaKasturi\\Projects\\",
                        "34MB"),

                new ProjectDTO("Football Stats Explorer for UCL Players",
                        List.of("Spring Boot", "PostgreSQL", "Java", "REST APIs", "OAuth 2.0"),
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