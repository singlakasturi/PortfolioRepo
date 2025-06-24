package PortfolioKK.demo.controllers;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.view.RedirectView;

@RequestMapping("/api/linkedin")
@RestController
@CrossOrigin()
public class LinkedInController {

    @Value("${linkedin.profile.url}")
    private String linkedInProfile;

    @GetMapping
    public RedirectView redirectToResume() {
        return new RedirectView(linkedInProfile);
    }

}
