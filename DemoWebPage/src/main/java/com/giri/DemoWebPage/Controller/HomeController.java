package com.giri.DemoWebPage.Controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {
    @RequestMapping("/")
    //@ResponseBody (we can use this also to get response from server instead of @RestController)
    public String greet(){
        return "Welcome to the page...";
    }
    @RequestMapping("/about")
    public String about(){
        return "Welcome to about section";
    }
}
