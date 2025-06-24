package PortfolioKK.demo.controllers;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.view.RedirectView;

@RestController
@RequestMapping("/api/github")
@CrossOrigin()
public class GithubController {

    @Value("${github.profile.url}")
    private String githubProfile;

    @GetMapping
    public RedirectView redirectToResume() {
        return new RedirectView(githubProfile);
    }

}
