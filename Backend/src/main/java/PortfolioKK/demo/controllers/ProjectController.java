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
                        List.of("Spring Boot", "React", "Python", "JPlag", "Playwright", "PostgreSQL", "Docker"),
                        List.of("Built an automated LeetCode contest scraper using Python + Playwright to collect rankings and submissions via REST/GraphQL APIs with Cloudflare bypass, proxy support, rotating user-agents, and retry logic.",
                                "Integrated JPlag into a Spring Boot backend for cross-language plagiarism detection by normalizing code and grouping similar submissions using Union-Find with configurable similarity thresholds.",
                                " Designed a multi-threaded pipeline using ThreadPoolExecutor for concurrent scraping, database persistence, and asynchronous plagiarism analysis across entire contest ranges.",
                                "Developed a React + Vite dashboard with code comparison, leaderboard, and admin controls.",
                                "Dockerized the full stack and secured APIs with Bucket4j rate limiting and token-based authentication."),
                        "https://github.com/singlakasturi/Pro",
                        "Resemblance.project",
                        "Project File",
                        "C:\\Users\\SinglaKasturi\\Projects\\",
                        "343MB"),


                new ProjectDTO("SeatWise – Exam Seating Plan Portal",
                        List.of("Spring Boot", "Java", "SQL", "Node.js", "React.js"),
                        List.of("Developed and deployed a full-stack exam seating automation platform currently used by my college for real examination workflows.",
                                "Architected the system using two independent backend services (core allocation service and export/utility service) to improve scalability, fault isolation, and future extensibility.",
                                "Implemented subject-wise and date-wise seat allocation algorithm to prevent clashes and ensure fair room utilization.",
                                "Delivered production-ready seating plan outputs adopted by college administration, replacing manual planning and reducing errors."),
                        "https://github.com/singlakasturi/SeatingPlanGenerator",
                        "SeatWise.project",
                        "Project File",
                        "C:\\Users\\SinglaKasturi\\Projects\\",
                        "4.8MB"),

                new ProjectDTO("TuneTrace – Real-Time Music Recognition App",
                        List.of("Spring Boot", "React.js", "PostgreSQL", "Java", "Rest API's", "TarsosDSP"),
                        List.of("Built a full-stack music identification system that recognizes songs through microphone input or MP3 uploads using audio fingerprinting.",
                                "We used TarsosDSP in the backend to process and match sound patterns in real time.",
                                "Designed a modern, responsive UI for song discovery with details such as artist, album, and match confidence.",
                                "Engineered a scalable PostgreSQL schema for storing song fingerprints and metadata.",
                                "Designed features to analyze similar submissions, laying the groundwork for a recommendation system."),
                        "https://github.com/singlakasturi/Shazam",
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